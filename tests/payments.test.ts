import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { MongoClient } from "mongodb";
import { createRegistration, findRegistration } from "../lib/server/registration-store.ts";
import { applyPayment, authorizedBooking, bookingToken, createOrder, getPayment, reconcile, validSignature, verifyCheckout } from "../lib/server/payments.ts";

test("Razorpay booking lifecycle verifies amounts, signatures, capture, retries and event ordering", async () => {
  if (!process.env.MONGODB_TEST_URI) { console.log("Skipping MongoDB payment integration test; set MONGODB_TEST_URI to a disposable MongoDB database."); return; }
  process.env.MONGODB_URI = process.env.MONGODB_TEST_URI;
  process.env.RAZORPAY_KEY_ID = "rzp_test_fixture";
  process.env.RAZORPAY_KEY_SECRET = "fixture-secret-not-a-real-key";
  process.env.RAZORPAY_MODE = "test";
  const originalFetch = globalThis.fetch;
  let registrationId: string | undefined;
  let creates = 0;
  let payments: object[] = [];
  globalThis.fetch = async (url, options) => {
    assert(String(url).startsWith("https://api.razorpay.com/v1/"));
    if (options?.method === "POST") {
      creates++;
      const body = JSON.parse(String(options.body));
      assert.equal(body.amount, 80100); assert.equal(body.currency, "INR");
      return Response.json({ id: "order_fixture", amount: 80100, currency: "INR" });
    }
    return Response.json({ items: payments });
  };
  try {
    const input = { fullName: "Payment Test", mobile: "9876543210", whatsapp: "9876543210", gotra: "", pkg: "individual" as const, members: null, notes: "", agree: true as const, locale: "en" as const };
    const r = (await createRegistration(input, "test-idempotency-key")).registration;
    registrationId = r.id;
    const booking = await createOrder(r);
    await createOrder(r); assert.equal(creates, 1);
    assert.equal((await createRegistration(input, "test-idempotency-key")).registration.id, r.id);
    assert.equal((await authorizedBooking(booking.token)).id, r.id);
    await assert.rejects(() => authorizedBooking(booking.token + "x"));
    assert.equal(validSignature("payload", "bad", "secret"), false);
    await assert.rejects(() => verifyCheckout(r, { razorpay_order_id: "order_other", razorpay_payment_id: "pay_fixture", razorpay_signature: "0".repeat(64) }));
    const signature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update("order_fixture|pay_fixture").digest("hex");
    await verifyCheckout(r, { razorpay_order_id: "order_fixture", razorpay_payment_id: "pay_fixture", razorpay_signature: signature });
    await assert.rejects(() => applyPayment({ id: "pay_wrong", order_id: "order_fixture", amount: 1, currency: "INR", status: "captured" }));
    payments = [{ id: "pay_fixture", order_id: "order_fixture", amount: 80100, currency: "INR", status: "authorized" }];
    assert.equal((await reconcile(r)).state, "pending");
    assert.equal((await findRegistration(r.id))?.status, "new");
    await applyPayment({ id: "pay_failed", order_id: "order_fixture", amount: 80100, currency: "INR", status: "failed" });
    assert.equal((await getPayment(r.id))?.state, "failed");
    const captured = { id: "pay_fixture", order_id: "order_fixture", amount: 80100, currency: "INR", status: "captured" };
    payments = [captured];
    assert.equal((await reconcile(r)).state, "paid");
    const version = (await findRegistration(r.id))!.version;
    await applyPayment(captured); await applyPayment({ ...captured, id: "pay_failed", status: "failed" });
    assert.equal((await getPayment(r.id))?.state, "paid");
    assert.equal((await findRegistration(r.id))?.version, version);
    assert.equal((await findRegistration(r.id))?.status, "confirmed");
    assert.equal((await findRegistration(r.id))?.paymentId, "pay_fixture");
    assert.equal(bookingToken(r.id), booking.token);
  } finally {
    globalThis.fetch = originalFetch;
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    if (registrationId) {
      await client.db().collection("booking_payments").deleteMany({ registration_id: registrationId });
      await client.db().collection("registrations").deleteMany({ id: registrationId });
    }
    await client.close();
  }
});
