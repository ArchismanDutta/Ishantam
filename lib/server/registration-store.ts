import { createHash, randomBytes, randomUUID } from "node:crypto";
import type { Collection } from "mongodb";
import { packages } from "../../data/ishantam.ts";
import type { Registration, RegistrationFilters, RegistrationInput, RegistrationList, SubmissionStatus } from "../registrations.ts";
import { getDatabase } from "./database.ts";

type Row = { id: string; reference: string; full_name: string; mobile: string; whatsapp: string; gotra: string; package_id: Registration["pkg"]; package_name: string; package_price: number; members?: number | null; notes: string; locale: Registration["locale"]; status: SubmissionStatus; internal_notes: string; created_at: string; updated_at: string; version: number; [key: string]: unknown };
type RegistrationCollection = Collection<Row>;
async function fromRow(row: Row): Promise<Registration> {
  const { payments } = await getDatabase();
  const payment = await payments.findOne({ registration_id: row.id });
  return {
    paymentState: payment?.state || "not_started", paymentId: payment?.payment_id || null, orderId: payment?.order_id || null,
    id: row.id, reference: row.reference, fullName: row.full_name, mobile: row.mobile, whatsapp: row.whatsapp, gotra: row.gotra,
    pkg: row.package_id, packageName: row.package_name, packagePrice: row.package_price, members: row.members ?? null,
    notes: row.notes, agree: true, locale: row.locale, status: row.status, internalNotes: row.internal_notes,
    createdAt: row.created_at, updatedAt: row.updated_at, version: row.version,
  };
}
export class ConflictError extends Error {}

export async function createRegistration(input: RegistrationInput, key: string): Promise<{ registration: Registration; replayed: boolean }> {
  const registrations = (await getDatabase()).registrations as unknown as RegistrationCollection;
  const hash = createHash("sha256").update(JSON.stringify(input)).digest("hex");
  const now = new Date().toISOString();
  const pkg = packages.find((p) => p.id === input.pkg)!;
  const id = randomUUID();
  const reference = "ISH-" + now.slice(0, 10).replaceAll("-", "") + "-" + randomBytes(4).toString("hex").toUpperCase();
  let replayed = false;
  try {
    await registrations.insertOne({ id, reference, idempotency_key: key, payload_hash: hash, full_name: input.fullName, mobile: input.mobile, whatsapp: input.whatsapp, gotra: input.gotra, package_id: pkg.id, package_name: pkg.name, package_price: pkg.price, members: input.members, notes: input.notes, consent: true, locale: input.locale, status: "new", internal_notes: "", created_at: now, updated_at: now, version: 1 });
  } catch (error: unknown) {
    if (!(error instanceof Error && "code" in error && error.code === 11000)) throw error;
    const existing = await registrations.findOne({ idempotency_key: key });
    if (!existing) throw new ConflictError("This registration reference already exists; please submit again.");
    if (existing.payload_hash !== hash) throw new ConflictError("This submission key was already used for different details.");
    replayed = true;
  }
  const row = await registrations.findOne({ idempotency_key: key });
  if (!row) throw new ConflictError("Registration could not be loaded after saving.");
  return { registration: await fromRow(row), replayed };
}

function matches(filters: RegistrationFilters) {
  const query: Record<string, unknown> = {};
  if (filters.status !== "all") query.status = filters.status;
  if (filters.pkg !== "all") query.package_id = filters.pkg;
  if (filters.search) {
    const escaped = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = ["full_name", "mobile", "whatsapp", "reference", "gotra"].map((field) => ({ [field]: { $regex: escaped, $options: "i" } }));
  }
  return query;
}
export async function listRegistrations(filters: RegistrationFilters): Promise<RegistrationList> {
  const { registrations: registrationCollection, payments } = await getDatabase();
  const registrations = registrationCollection as unknown as RegistrationCollection;
  const query = matches(filters); const total = await registrations.countDocuments(query); const pageSize = 20;
  const page = Math.max(1, Math.min(filters.page, Math.ceil(total / pageSize) || 1));
  const rows = await registrations.find(query).sort({ created_at: -1, id: -1 }).skip((page - 1) * pageSize).limit(pageSize).toArray();
  const summaryRows = await registrations.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray();
  const paymentSummary = await payments.aggregate([
    { $match: { state: "paid" } },
    { $group: { _id: null, paidCount: { $sum: 1 }, totalCollected: { $sum: "$amount" } } },
  ]).next() as { paidCount: number; totalCollected: number } | null;
  const counts = Object.fromEntries(summaryRows.map((x) => { const item = x as { _id: string; count: number }; return [item._id, item.count]; }));
  return { registrations: await Promise.all(rows.map(fromRow)), total, page, pageSize, summary: { total: Object.values(counts).reduce((a, b) => a + b, 0), new: counts.new || 0, confirmed: counts.confirmed || 0, completed: counts.completed || 0 }, payments: { paidCount: paymentSummary?.paidCount ?? 0, totalCollected: paymentSummary?.totalCollected ?? 0 } };
}
export async function exportRegistrations(filters: RegistrationFilters): Promise<Registration[]> {
  const registrations = (await getDatabase()).registrations as unknown as RegistrationCollection;
  const rows = await registrations.find(matches(filters)).sort({ created_at: -1, id: -1 }).limit(10001).toArray();
  return Promise.all(rows.map(fromRow));
}
export async function findRegistration(id: string): Promise<Registration | null> {
  const registrations = (await getDatabase()).registrations as unknown as RegistrationCollection; const row = await registrations.findOne({ id });
  return row ? fromRow(row) : null;
}
export async function updateRegistration(id: string, update: { status: SubmissionStatus; internalNotes: string; version: number }): Promise<Registration | null> {
  const registrations = (await getDatabase()).registrations as unknown as RegistrationCollection;
  const now = new Date().toISOString();
  const changed = await registrations.updateOne({ id, version: update.version }, { $set: { status: update.status, internal_notes: update.internalNotes, updated_at: now }, $inc: { version: 1 } } as never);
  const current = await findRegistration(id);
  if (current && changed.modifiedCount === 0) throw new ConflictError("This registration changed in another window. Reopen it before saving.");
  return current;
}
