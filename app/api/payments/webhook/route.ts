import { applyPayment, PaymentError, validSignature, type GatewayPayment } from "@/lib/server/payments";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Webhook is not configured." }, { status: 503 });
  const body = await req.text();
  if (body.length > 1000000) return new Response(null, { status: 413 });
  if (!validSignature(body, req.headers.get("x-razorpay-signature") || "", secret)) return new Response(null, { status: 401 });
  try {
    const event = JSON.parse(body);
    if (["payment.captured", "payment.failed", "order.paid"].includes(event.event)) {
      const payment = event.payload?.payment?.entity as GatewayPayment | undefined;
      if (!payment || typeof payment.id !== "string" || typeof payment.order_id !== "string" || !Number.isSafeInteger(payment.amount) || typeof payment.currency !== "string") return new Response(null, { status: 400 });
      await applyPayment(payment);
    }
    return Response.json({ ok: true });
  } catch (e) {
    if (e instanceof SyntaxError || e instanceof PaymentError) return new Response(null, { status: 400 });
    console.error("Payment webhook failed", e); return new Response(null, { status: 500 });
  }
}
