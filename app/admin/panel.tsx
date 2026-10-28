"use client";
import { useCallback, useEffect, useState } from "react";
import { packages } from "@/data/ishantam";
import { statusLabels, submissionStatuses, type Registration, type RegistrationList, type SubmissionStatus } from "@/lib/registrations";
import { BrandLogo } from "@/components/ishantam/BrandLogo";
import Link from "next/link";
import styles from "./panel.module.css";
const date = (value: string) => new Date(value).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
export default function AdminPanel() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<RegistrationList | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ search: "", status: "all", package: "all", page: 1 });
  const [selected, setSelected] = useState<Registration | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("new");
  const [notes, setNotes] = useState("");
  const [notice, setNotice] = useState("");
  const query = new URLSearchParams({ ...filters, page: String(filters.page) }).toString();
  useEffect(() => {
    fetch("/api/admin/session").then(r => r.json()).then(d => { setAuth(d.authenticated); setConfigured(d.configured); }).catch(() => { setAuth(false); setError("Unable to connect. Please reload."); });
  }, []);
  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/admin/registrations?" + query);
      const d = await res.json();
      if (res.status === 401) { setAuth(false); setData(null); setSelected(null); return; }
      if (!res.ok) throw new Error(d.error);
      setData(d);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load submissions."); }
    finally { setBusy(false); }
  }, [query]);
  useEffect(() => { if (!auth) return; const timer = setTimeout(() => { void load(); }, 0); return () => clearTimeout(timer); }, [auth, load]);
  async function signIn(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const d = await res.json(); if (!res.ok) throw new Error(d.error);
      setPassword(""); setAuth(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in."); } finally { setBusy(false); }
  }
  async function signOut() {
    try {
      const res = await fetch("/api/admin/session", { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAuth(false); setData(null); setSelected(null);
    } catch { setError("Unable to sign out. Please try again."); }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!selected) return; setBusy(true); setError(""); setNotice("");
    try {
      const res = await fetch("/api/admin/registrations", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id, version: selected.version, status, internalNotes: notes }) });
      const d = await res.json(); if (!res.ok) throw new Error(d.error);
      setSelected(d.registration); setNotice("Changes saved."); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save."); } finally { setBusy(false); }
  }
  return <main className={styles.admin} lang="en">
    <header className={styles.header}><Link href="/" className={styles.brand}><BrandLogo size="compact" /><span>ADMINISTRATION</span></Link>{auth && <button onClick={signOut}>Sign out ↗</button>}</header>
    {auth === null ? <p role="status">Connecting…</p> : !auth ? <div className={styles.login}>
      <span className={styles.eyebrow}>A little care. Every registration.</span><h1>Welcome back.</h1><p>Sign in to manage puja registrations and help devotees take their next step.</p>
      {!configured && <p role="status">Admin access needs setup. Set ADMIN_PASSWORD to at least 12 characters in the server environment, then restart.</p>}
      <form onSubmit={signIn}><label>Admin password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label><button className={styles.primary} disabled={busy || !configured}>{busy ? "Signing in…" : "Sign in →"}</button></form><Link href="/">← Back to the website</Link>
    </div> : <>
      <div className={styles.intro}><div><span className={styles.eyebrow}>DEVOTEE RELATIONS</span><h1>Registrations</h1><p>Every submission, thoughtfully followed through.</p></div><button onClick={() => { setSelected(null); void load(); }} disabled={busy}>↻ Refresh</button></div>
      <div className={styles.stats}>{([['All registrations', data?.summary.total], ['Awaiting contact', data?.summary.new], ['Confirmed', data?.summary.confirmed], ['Completed', data?.summary.completed]] as const).map(([label, count]) => <div key={label}><span>{label}</span><strong>{count ?? '—'}</strong></div>)}</div>
      <div className={styles.paymentStats} aria-label="Verified payments"><div><span>Successful payments</span><strong>{data?.payments.paidCount ?? '—'}</strong></div><div><span>Total collected · INR</span><strong>₹{(data?.payments.totalCollected ?? 0).toLocaleString('en-IN')}</strong></div></div>
      <section className={styles.workspace} aria-label="Registration list">
        <form className={styles.filters} onSubmit={e => { e.preventDefault(); setFilters(v => ({ ...v, search, page: 1 })); setSelected(null); }}>
          <label className={styles.search}>Search registrations<input placeholder="Name, phone, gotra or reference" value={search} onChange={e => setSearch(e.target.value)} maxLength={160} /></label>
          <button type="submit" disabled={busy}>Search</button>
          <label>Status<select value={filters.status} onChange={e => { setSelected(null); setFilters(v => ({ ...v, status: e.target.value, page: 1 })); }}><option value="all">All statuses</option>{submissionStatuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label>
          <label>Package<select value={filters.package} onChange={e => { setSelected(null); setFilters(v => ({ ...v, package: e.target.value, page: 1 })); }}><option value="all">All packages</option>{packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <a className={styles.export} href={"/api/admin/registrations?" + query + "&export=csv"}>↓ Export CSV</a>
        </form>
        <div className={styles.tableWrap} aria-busy={busy}><table><thead><tr><th>Devotee</th><th>Package</th><th>Received · IST</th><th>Status / payment</th><th>Details</th></tr></thead><tbody>{data?.registrations.map(r => <tr key={r.id}><td><strong>{r.fullName}</strong><span>{r.mobile}</span></td><td>{r.packageName}<span>₹{r.packagePrice.toLocaleString("en-IN")}</span></td><td>{date(r.createdAt)}<span>{r.reference}</span></td><td><span className={styles.badge} data-status={r.status}>{statusLabels[r.status]}</span><span>Payment: {r.paymentState.replace("_", " ")}</span></td><td><button onClick={() => { setSelected(r); setStatus(r.status); setNotes(r.internalNotes); setNotice(""); setError(""); }}>View →</button></td></tr>)}</tbody></table></div>
        {!data?.registrations.length && <div className={styles.empty}><h2>{busy ? "Loading registrations…" : "No registrations found"}</h2><p>{filters.search || filters.status !== "all" || filters.package !== "all" ? "Try another search or filter." : "New form submissions will appear here automatically when you refresh."}</p></div>}
        {data && <footer className={styles.pagination}><span>{data.total} matching registrations · Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))}</span><div><button disabled={busy || data.page <= 1} onClick={() => setFilters(v => ({ ...v, page: data.page - 1 }))}>← Previous</button><button disabled={busy || data.page * data.pageSize >= data.total} onClick={() => setFilters(v => ({ ...v, page: data.page + 1 }))}>Next →</button></div></footer>}
      </section>
      {selected && <section className={styles.detail} aria-labelledby="details-title"><div className={styles.intro}><div><span className={styles.eyebrow}>{selected.reference}</span><h2 id="details-title">{selected.fullName}</h2></div><button onClick={() => setSelected(null)}>Close details ×</button></div>
        <dl>{[["Payment status", selected.paymentState.replace("_", " ")], ["Razorpay payment ID", selected.paymentId || "—"], ["Razorpay order ID", selected.orderId || "—"], ["Mobile", selected.mobile], ["WhatsApp", selected.whatsapp], ["Gotra", selected.gotra || "Not provided"], ["Package", `${selected.packageName} · ₹${selected.packagePrice}`], ["Family members", selected.members ?? "Not applicable"], ["Language", selected.locale === "hi" ? "Hindi" : "English"], ["Consent recorded", date(selected.createdAt)], ["Last updated", date(selected.updatedAt)], ["Devotee notes", selected.notes || "No notes"]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className={styles.contact}><a href={"tel:" + selected.mobile}>Call devotee ↗</a><a href={"https://wa.me/" + (selected.whatsapp.replace(/\D/g, "").length === 10 ? "91" : "") + selected.whatsapp.replace(/\D/g, "")} target="_blank" rel="noreferrer">Open WhatsApp ↗</a></div>
        <form onSubmit={save}><label>Follow-up status<select value={status} onChange={e => setStatus(e.target.value as SubmissionStatus)}>{submissionStatuses.map(s => <option value={s} key={s}>{statusLabels[s]}</option>)}</select></label><label>Internal notes<textarea value={notes} onChange={e => setNotes(e.target.value)} maxLength={5000} rows={4} placeholder="Record follow-up details for your team…" /></label><button className={styles.primary} disabled={busy}>{busy ? "Saving…" : "Save changes"}</button><p role="status">{notice}</p></form>
      </section>}
    </>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    <div className={styles.footnote}>ISHANTAM · MANGALNATH TEMPLE, UJJAIN</div>
  </main>;
}
