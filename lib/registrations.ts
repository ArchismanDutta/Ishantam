import { packages, type PackageId } from "../data/ishantam.ts";

export const submissionStatuses = ["new", "contacted", "confirmed", "completed", "cancelled"] as const;
export type SubmissionStatus = (typeof submissionStatuses)[number];
export const statusLabels: Record<SubmissionStatus, string> = { new: "New", contacted: "Contacted", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled" };

export interface RegistrationInput {
  fullName: string;
  mobile: string;
  whatsapp: string;
  gotra: string;
  pkg: PackageId;
  members: number | null;
  notes: string;
  agree: true;
  locale: "hi" | "en";
}

export interface Registration extends RegistrationInput {
  id: string;
  reference: string;
  packageName: string;
  packagePrice: number;
  status: SubmissionStatus;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  paymentState: "pending" | "failed" | "paid" | "not_started";
  paymentId: string | null;
  orderId: string | null;
}

export interface RegistrationFilters {
  search: string;
  status: SubmissionStatus | "all";
  pkg: PackageId | "all";
  page: number;
}
export interface RegistrationList {
  registrations: Registration[];
  total: number;
  page: number;
  pageSize: number;
  summary: { total: number; new: number; confirmed: number; completed: number };
  payments: { paidCount: number; totalCollected: number };
}

export class InputError extends Error {
  constructor(public fields: Record<string, string>, message = "Please check the submitted details.") { super(message); }
}

const cleanPhone = (value: unknown) => typeof value === "string" ? value.trim().replace(/[\s()-]/g, "") : "";
export const validPhone = (value: string) => /^\+?\d{10,15}$/.test(value);
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

export function validateRegistration(value: unknown): RegistrationInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new InputError({ form: "Expected a registration." });
  const v = value as Record<string, unknown>;
  const fullName = text(v.fullName);
  const mobile = cleanPhone(v.mobile);
  const whatsapp = v.sameAsMobile === true ? mobile : cleanPhone(v.whatsapp);
  const gotra = text(v.gotra);
  const notes = text(v.notes);
  const pkg = packages.find((item) => item.id === v.pkg);
  const members = pkg?.id === "family" ? Number(v.members) : null;
  const fields: Record<string, string> = {};
  if (!fullName || fullName.length > 160) fields.fullName = "Enter a name up to 160 characters.";
  if (!validPhone(mobile)) fields.mobile = "Enter a valid mobile number.";
  if (!validPhone(whatsapp)) fields.whatsapp = "Enter a valid WhatsApp number.";
  if (gotra.length > 120) fields.gotra = "Gotra must be under 120 characters.";
  if (notes.length > 2000) fields.notes = "Notes must be under 2000 characters.";
  if (!pkg) fields.pkg = "Choose a valid package.";
  if (pkg?.id === "family" && (!Number.isInteger(members) || members! < 5 || members! > 6)) fields.members = "The family package covers 5 or 6 members.";
  if (v.agree !== true) fields.agree = "Consent is required.";
  if (v.locale !== "hi" && v.locale !== "en") fields.locale = "Choose a supported language.";
  if (Object.keys(fields).length) throw new InputError(fields);
  return { fullName, mobile, whatsapp, gotra, pkg: pkg!.id, members, notes, agree: true, locale: v.locale as "hi" | "en" };
}

export function readFilters(params: URLSearchParams): RegistrationFilters {
  const status = params.get("status") || "all";
  const pkg = params.get("package") || "all";
  const page = Number(params.get("page") || 1);
  if (status !== "all" && !submissionStatuses.includes(status as SubmissionStatus)) throw new InputError({ status: "Invalid status." });
  if (pkg !== "all" && !packages.some((p) => p.id === pkg)) throw new InputError({ package: "Invalid package." });
  if (!Number.isSafeInteger(page) || page < 1 || page > 1000000) throw new InputError({ page: "Invalid page." });
  const search = (params.get("search") || "").trim();
  if (search.length > 160) throw new InputError({ search: "Search is too long." });
  return { search, status: status as RegistrationFilters["status"], pkg: pkg as RegistrationFilters["pkg"], page };
}

export function validateUpdate(value: unknown): { status: SubmissionStatus; internalNotes: string; version: number } {
  if (!value || typeof value !== "object") throw new InputError({ form: "Invalid update." });
  const v = value as Record<string, unknown>;
  const internalNotes = text(v.internalNotes);
  if (!submissionStatuses.includes(v.status as SubmissionStatus) || internalNotes.length > 5000 || !Number.isSafeInteger(v.version) || Number(v.version) < 1) throw new InputError({ form: "Check status, notes and version." });
  return { status: v.status as SubmissionStatus, internalNotes, version: Number(v.version) };
}

export function csvCell(value: unknown): string {
  let cell = value == null ? "" : String(value);
  // Prevent a spreadsheet from treating untrusted names/notes/phone numbers as formulas.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(cell) || /^[\t\r\n]/.test(cell)) cell = "'" + cell;
  return '"' + cell.replaceAll('"', '""') + '"';
}

export function registrationsCsv(rows: Registration[]): string {
  const headers = ["Reference", "Name", "Mobile", "WhatsApp", "Gotra", "Package", "Price (INR)", "Family members", "Devotee notes", "Status", "Internal notes", "Language", "Consent recorded at (UTC)", "Updated at (UTC)", "Payment status", "Razorpay payment ID", "Razorpay order ID"];
  const values = rows.map((r) => [r.reference, r.fullName, r.mobile, r.whatsapp, r.gotra, r.packageName, r.packagePrice, r.members, r.notes, statusLabels[r.status], r.internalNotes, r.locale, r.createdAt, r.updatedAt, r.paymentState, r.paymentId, r.orderId]);
  return "\uFEFF" + [headers, ...values].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}
