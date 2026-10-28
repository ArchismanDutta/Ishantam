import { sameOrigin } from "./admin-auth";
import { consumeRateLimit } from "./database";
import { PaymentError } from "./payments";
export async function paymentRequest(req: Request, handler: (value: Record<string, unknown>) => Promise<unknown>) {
  if (!sameOrigin(req)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!await consumeRateLimit("payments:global", 300, 60000)) return Response.json({ error: "Please try again shortly." }, { status: 429 });
  try {
    const body = await req.text();
    if (body.length > 16000) return Response.json({ error: "Request too large." }, { status: 413 });
    const value = JSON.parse(body);
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new SyntaxError();
    return Response.json(await handler(value), { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof PaymentError) return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof SyntaxError) return Response.json({ error: "Invalid payment request." }, { status: 400 });
    console.error("Payment request failed", e);
    return Response.json({ error: "Could not check the payment. Please check again before paying." }, { status: 500 });
  }
}
