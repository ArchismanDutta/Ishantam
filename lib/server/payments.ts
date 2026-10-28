import { createHmac, timingSafeEqual } from "node:crypto";
import { getDatabase } from "./database.ts";
import { findRegistration } from "./registration-store.ts";
import type { Registration } from "../registrations.ts";

type PaymentRow = { registration_id: string; order_id?: string; payment_id?: string; amount: number; currency: string; state: "pending" | "failed" | "paid"; creating_until: number };
export type GatewayPayment = { id: string; order_id: string; amount: number; currency: string; status: string };
export class PaymentError extends Error { constructor(message: string, public status = 502) { super(message); } }
function credentials() {
  const key = process.env.RAZORPAY_KEY_ID; const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key || !secret) throw new PaymentError("Online payments are not available yet. Please try again later.", 503);
  if ((process.env.RAZORPAY_MODE || "live") === "live" && !key.startsWith("rzp_live_")) throw new PaymentError("Live payments are not configured correctly.", 503);
  return { key, secret };
}
export function paymentConfigured() { credentials(); }
export function validSignature(body: string, signature: string, secret: string) {
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(body).digest(); return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}
export function bookingToken(id: string) { return id + "." + createHmac("sha256", credentials().secret).update("booking:" + id).digest("hex"); }
export async function authorizedBooking(token: unknown): Promise<Registration> {
  if (typeof token !== "string" || token.length > 150) throw new PaymentError("Booking link is invalid.", 403);
  const [id, signature] = token.split(".");
  if (!signature || !validSignature("booking:" + id, signature, credentials().secret)) throw new PaymentError("Booking link is invalid.", 403);
  const registration = await findRegistration(id); if (!registration) throw new PaymentError("Booking not found.", 404); return registration;
}
export async function gateway<T>(path: string, body?: object): Promise<T> {
  const { key, secret } = credentials();
  let res: Response;
  try { res = await fetch("https://api.razorpay.com/v1/" + path, { method: body ? "POST" : "GET", headers: { Authorization: "Basic " + Buffer.from(key + ":" + secret).toString("base64"), "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined, cache: "no-store", signal: AbortSignal.timeout(15000) }); }
  catch { throw new PaymentError("Unable to reach the payment provider. Please check the booking status before retrying."); }
  if (!res.ok) throw new PaymentError("The payment provider could not complete this request. Please try again shortly."); return res.json() as Promise<T>;
}
export async function getPayment(id: string) { const { payments } = await getDatabase(); return await payments.findOne({ registration_id: id }) as PaymentRow | null; }
export async function createOrder(r: Registration) {
  const { payments } = await getDatabase();
  await payments.updateOne({ registration_id: r.id }, { $setOnInsert: { registration_id: r.id, amount: r.packagePrice * 100, currency: "INR", state: "pending", creating_until: 0, updated_at: new Date().toISOString() } }, { upsert: true });
  let payment = await getPayment(r.id);
  if (!payment!.order_id) {
    const now = Date.now();
    const lease = await payments.updateOne({ registration_id: r.id, order_id: { $exists: false }, creating_until: { $lt: now } }, { $set: { creating_until: now + 60000 } });
    if (!lease.modifiedCount) throw new PaymentError("Checkout is being prepared. Please retry in a moment.", 409);
    try {
      const order = await gateway<{ id: string; amount: number; currency: string }>("orders", { amount: payment!.amount, currency: "INR", receipt: r.reference, notes: { registration_id: r.id }, partial_payment: false });
      if (!/^order_[a-zA-Z0-9]+$/.test(order.id) || order.amount !== payment!.amount || order.currency !== "INR") throw new PaymentError("Payment order details did not match this booking.");
      await payments.updateOne({ registration_id: r.id }, { $set: { order_id: order.id } });
    } finally { await payments.updateOne({ registration_id: r.id }, { $set: { creating_until: 0, updated_at: new Date().toISOString() } }); }
    payment = await getPayment(r.id);
  }
  return publicBooking(r, payment!);
}
export async function applyPayment(payment: GatewayPayment) {
  const { payments, registrations } = await getDatabase(); const row = await payments.findOne({ order_id: payment.order_id }) as PaymentRow | null;
  if (!row) return;
  if (payment.amount !== row.amount || payment.currency !== row.currency) throw new PaymentError("Payment amount or currency did not match.", 400);
  if (payment.status === "captured") {
    const changed = await payments.updateOne({ registration_id: row.registration_id, state: { $ne: "paid" } }, { $set: { state: "paid", payment_id: payment.id, updated_at: new Date().toISOString() } });
    if (changed.modifiedCount) await registrations.updateOne({ id: row.registration_id }, { $set: { status: "confirmed", updated_at: new Date().toISOString() }, $inc: { version: 1 } });
  } else if (payment.status === "failed") {
    await payments.updateOne({ registration_id: row.registration_id, state: { $ne: "paid" } }, { $set: { state: "failed", updated_at: new Date().toISOString() } });
  }
}
export async function reconcile(r: Registration) {
  const row = await getPayment(r.id); if (!row?.order_id) throw new PaymentError("No payment order found. Please return to the form.", 404);
  if (row.state !== "paid") {
    const payments = await gateway<{ items: GatewayPayment[] }>("orders/" + encodeURIComponent(row.order_id) + "/payments");
    for (const p of payments.items) if (p.order_id === row.order_id) await applyPayment(p);
  }
  return publicBooking((await findRegistration(r.id))!, (await getPayment(r.id))!);
}
export async function verifyCheckout(r: Registration, value: Record<string, unknown>) {
  const row = await getPayment(r.id); const { razorpay_payment_id: id, razorpay_order_id: order, razorpay_signature: signature } = value;
  if (!row?.order_id || order !== row.order_id || typeof id !== "string" || !/^pay_[a-zA-Z0-9]+$/.test(id) || typeof signature !== "string" || !validSignature(row.order_id + "|" + id, signature, credentials().secret)) throw new PaymentError("Payment verification failed. Check booking status before making another payment.", 400);
}
function publicBooking(r: Registration, row: PaymentRow) {
  return { token: bookingToken(r.id), reference: r.reference, state: row.state, paymentId: row.payment_id, amount: row.amount, currency: row.currency, orderId: row.order_id, key: credentials().key, packageName: r.packageName, name: r.fullName, contact: r.mobile, locale: r.locale };
}
