import { checkPassword, configured, isAdmin, login, logout, sameOrigin } from "@/lib/server/admin-auth";
import { consumeRateLimit } from "@/lib/server/database";
export async function GET() { return Response.json({ authenticated: await isAdmin(), configured: configured() }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!configured()) return Response.json({ error: "Set ADMIN_PASSWORD (at least 12 characters) on the server first." }, { status: 503 });
  if (!await consumeRateLimit("admin:login", 20, 60000)) return Response.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  try {
    const body = await req.text(); if (body.length > 1000) throw new Error();
    const { password } = JSON.parse(body);
    if (typeof password !== "string" || !checkPassword(password)) return Response.json({ error: "Incorrect password." }, { status: 401 });
    await login(); return Response.json({ ok: true });
  } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  await logout(); return Response.json({ ok: true });
}
