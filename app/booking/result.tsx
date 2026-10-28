"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ishantam/BrandLogo";
import Link from "next/link";
import { BOOKING_STORAGE_KEY, openCheckout, type CheckoutBooking } from "@/lib/checkout";
import styles from "./result.module.css";
export default function BookingResult() {
  const router = useRouter();
  const [booking, setBooking] = useState<CheckoutBooking | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState("");
  const [hi, setHi] = useState(false);
  const check = useCallback(async () => {
    setBusy(true); setError("");
    try {
      const saved = JSON.parse(sessionStorage.getItem(BOOKING_STORAGE_KEY) || "null");
      if (!saved?.token) throw new Error("No booking found in this tab. Please return to the booking form.");
      setHi(saved.locale === "hi");
      const res = await fetch(saved.verification ? "/api/payments/verify" : "/api/payments/status", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: saved.token, ...saved.verification }),
      });
      const data = await res.json(); if (!res.ok) throw new Error(data.error);
      setBooking(data);
      if (data.state === "paid") sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify({ token: saved.token, locale: saved.locale }));
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to verify payment. Please check again."); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => { setOutcome(new URLSearchParams(window.location.search).get("outcome") || ""); void check(); }, 0);
    const onReturn = () => { if (document.visibilityState === "visible") void check(); };
    document.addEventListener("visibilitychange", onReturn);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", onReturn); };
  }, [check]);
  const bookingState = booking?.state;
  useEffect(() => {
    if (!bookingState || bookingState === "paid") return;
    let attempts = 0;
    const timer = setInterval(() => { if (++attempts > 6) clearInterval(timer); else void check(); }, 10000);
    return () => clearInterval(timer);
  }, [bookingState, check]);
  const paid = booking?.state === "paid";
  const failed = !paid && (booking?.state === "failed" || outcome === "failed");
  const cancelled = !paid && !failed && outcome === "cancelled";
  async function retry() {
    setBusy(true); setError("");
    try {
      if (!booking) return;
      // Reconcile immediately before retrying to avoid opening a checkout for a paid order.
      const res = await fetch("/api/payments/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: booking.token }) });
      const current = await res.json(); if (!res.ok) throw new Error(current.error);
      setBooking(current);
      if (current.state !== "paid") await openCheckout(current, path => {
        setOutcome(new URL(path, window.location.origin).searchParams.get("outcome") || "");
        router.push(path);
        void check();
      });
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to open checkout."); }
    finally { setBusy(false); }
  }
  return <main className={styles.page} lang={hi ? "hi" : "en"}>
    <Link href="/" className={styles.brand}><BrandLogo /></Link>
    <section className={styles.card} aria-live="polite">
      <span className={styles.eyebrow}>{hi ? "आपकी पूजा बुकिंग" : "YOUR PUJA BOOKING"}</span>
      <div className={styles.icon} data-paid={paid}>{paid ? "✓" : failed ? "!" : cancelled ? "×" : "◷"}</div>
      <h1>{paid ? (hi ? "बुकिंग की पुष्टि हो गई" : "Booking confirmed") : failed ? (hi ? "भुगतान सफल नहीं हुआ" : "Payment unsuccessful") : cancelled ? (hi ? "भुगतान रद्द किया गया" : "Payment cancelled") : (hi ? "भुगतान की पुष्टि" : "Checking your payment")}</h1>
      <p>{paid ? (hi ? "आपका भुगतान प्राप्त हो गया है और आपकी पूजा बुकिंग की पुष्टि हो गई है।" : "Your payment has been received and your puja booking is confirmed.") : (hi ? "बुकिंग की पुष्टि अभी नहीं हुई है। यदि राशि कट गई है, दोबारा भुगतान करने से पहले स्थिति जाँचें।" : "Your booking is not confirmed yet. If your account was debited, check the status again before paying another time.")}</p>
      {booking && <dl><div><dt>{hi ? "बुकिंग संदर्भ" : "Booking reference"}</dt><dd>{booking.reference}</dd></div><div><dt>{hi ? "पैकेज" : "Package"}</dt><dd>{booking.packageName}</dd></div><div><dt>{hi ? "राशि" : "Amount"}</dt><dd>₹{(booking.amount / 100).toLocaleString("en-IN")}</dd></div>{booking.paymentId && <div><dt>Payment ID</dt><dd>{booking.paymentId}</dd></div>}</dl>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!paid && <div className={styles.actions}><button disabled={busy} onClick={check}>{busy ? (hi ? "जाँच जारी है…" : "Checking…") : (hi ? "स्थिति फिर जाँचें" : "Check status again")}</button>{booking && (failed || cancelled) && <button disabled={busy || !!error} onClick={retry}>{hi ? "भुगतान फिर करें" : "Retry payment →"}</button>}</div>}
      <Link href="/">{hi ? "← वेबसाइट पर वापस जाएँ" : "← Back to the website"}</Link>
    </section>
    <p className={styles.note}>{hi ? "अपने रिकॉर्ड के लिए बुकिंग संदर्भ सुरक्षित रखें।" : "Keep your booking reference for your records."}</p>
  </main>;
}
