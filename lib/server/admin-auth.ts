import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getDatabase } from "./database";
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
export const configured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12);
export function checkPassword(value: string) { return configured() && timingSafeEqual(Buffer.from(hash(value)), Buffer.from(hash(process.env.ADMIN_PASSWORD!))); }
export async function isAdmin() {
  if (!configured()) return false;
  const token = (await cookies()).get("ishantam_admin")?.value;
  if (!token) return false;
  const { sessions } = await getDatabase();
  const row = await sessions.findOne({ token_hash: hash(token), expires_at: { $gt: new Date() }, credential_version: hash(process.env.ADMIN_PASSWORD!) });
  return Boolean(row);
}
export async function login() {
  const token = randomBytes(32).toString("hex");
  const now = Date.now();
  const { sessions } = await getDatabase();
  await sessions.deleteMany({ expires_at: { $lt: new Date(now) } });
  await sessions.insertOne({ token_hash: hash(token), username: "admin", credential_version: hash(process.env.ADMIN_PASSWORD!), created_at: new Date(now), expires_at: new Date(now + 28800000) });
  (await cookies()).set("ishantam_admin", token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
}
export async function logout() {
  const jar = await cookies(); const token = jar.get("ishantam_admin")?.value;
  if (token) { const { sessions } = await getDatabase(); await sessions.deleteOne({ token_hash: hash(token) }); }
  jar.delete("ishantam_admin");
}
export function sameOrigin(req: Request) { return req.headers.get("origin") === new URL(req.url).origin; }
