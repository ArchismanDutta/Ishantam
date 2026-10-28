import { isAdmin, sameOrigin } from "@/lib/server/admin-auth";
import { InputError, readFilters, registrationsCsv, validateUpdate } from "@/lib/registrations";
import { ConflictError, exportRegistrations, listRegistrations, updateRegistration } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try {
    const params = new URL(req.url).searchParams; const filters = readFilters(params);
    if (params.get("export") === "csv") {
      const rows = await exportRegistrations(filters);
      if (rows.length > 10000) return Response.json({ error: "Narrow your filters to export up to 10,000 records." }, { status: 400 });
      return new Response(registrationsCsv(rows), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="ishantam-registrations.csv"', "Cache-Control": "no-store" } });
    }
    return Response.json(await listRegistrations(filters), { headers: { "Cache-Control": "no-store" } });
  } catch (e) { if (e instanceof InputError) return Response.json({ error: e.message }, { status: 400 }); throw e; }
}
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try {
    const body = await req.text(); if (body.length > 24000) return Response.json({ error: "Update too large." }, { status: 413 });
    const value = JSON.parse(body); const update = validateUpdate(value);
    if (typeof value.id !== "string") throw new InputError({ id: "Missing ID." });
    const registration = await updateRegistration(value.id, update);
    return Response.json(registration ? { registration } : { error: "Registration not found." }, { status: registration ? 200 : 404 });
  } catch (e) {
    if (e instanceof ConflictError) return Response.json({ error: e.message }, { status: 409 });
    if (e instanceof InputError || e instanceof SyntaxError) return Response.json({ error: "Invalid update." }, { status: 400 }); throw e;
  }
}
