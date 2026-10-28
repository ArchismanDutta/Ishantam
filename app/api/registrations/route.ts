import { validateRegistration, InputError } from "@/lib/registrations";
import { createRegistration, ConflictError } from "@/lib/server/registration-store";
import { consumeRateLimit } from "@/lib/server/database";
import { sameOrigin } from "@/lib/server/admin-auth";
import { createOrder, paymentConfigured, PaymentError } from "@/lib/server/payments";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  try {
    if (!await consumeRateLimit("registration:global", 300, 60000)) return Response.json({ error: "Please try again shortly." }, { status: 429 });
    paymentConfigured();
    const body = await req.text();
    if (body.length > 16000) return Response.json({ error: "Submission too large." }, { status: 413 });
    const input = validateRegistration(JSON.parse(body));
    const key = req.headers.get("idempotency-key");
    if (!key || !/^[a-zA-Z0-9-]{16,80}$/.test(key)) return Response.json({ error: "Invalid submission key." }, { status: 400 });
    const result = await createRegistration(input, key);
    return Response.json(await createOrder(result.registration), { status: result.replayed ? 200 : 201, headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof PaymentError) return Response.json({ error: e.message }, { status: e.status });
    if (e instanceof InputError) return Response.json({ error: e.message, fields: e.fields }, { status: 400 });
    if (e instanceof ConflictError) return Response.json({ error: e.message }, { status: 409 });
    if (e instanceof SyntaxError) return Response.json({ error: "Invalid submission." }, { status: 400 });
    console.error("Registration failed", e); return Response.json({ error: "Unable to save. Please try again." }, { status: 500 });
  }
}
