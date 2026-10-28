"use client";

import { useRef, useState } from "react";
import { packages, type PackageId } from "@/data/ishantam";
import { useBooking } from "./BookingContext";
import { useLocale } from "./LocaleContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { openCheckout, preloadCheckout } from "@/lib/checkout";
import { Arrow } from "./primitives";
import { PackageFrame } from "./PackageFrame";

interface FormValues {
  fullName: string;
  mobile: string;
  whatsapp: string;
  sameAsMobile: boolean;
  gotra: string;
  pkg: PackageId;
  members: string;
  notes: string;
  agree: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  fullName: "", mobile: "", whatsapp: "",
  sameAsMobile: true, gotra: "", pkg: "couple",
  members: "", notes: "", agree: false,
};

export function RegistrationForm() {
  const router = useRouter();
  const { selected } = useBooking();
  const { t, locale } = useLocale();
  const submissionKey = useRef("");
  const submissionPayload = useRef("");
  const [paymentError, setPaymentError] = useState("");
  const f = t.form;

  const [values, setValues] = useState<FormValues>({ ...initial, pkg: selected });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const [previousSelection, setPreviousSelection] = useState(selected);
  if (previousSelection !== selected) {
    setPreviousSelection(selected);
    setValues(v => ({ ...v, pkg: selected }));
  }

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!values.fullName.trim())                                 e.fullName = f.errors.fullName;
    if (!/^[+\d\s-]{10,15}$/.test(values.mobile.trim()))          e.mobile = f.errors.mobile;
    const wa = values.sameAsMobile ? values.mobile : values.whatsapp;
    if (!/^[+\d\s-]{10,15}$/.test(wa.trim()))                     e.whatsapp = f.errors.whatsapp;
    if (values.pkg === "family" && !values.members.trim())        e.members = f.errors.members;
    if (!values.agree)                                            e.agree = f.errors.agree;
    return e;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("submitting");
    setPaymentError("");
    const payload = { ...values, locale };
    const encodedPayload = JSON.stringify(payload);
    if (!submissionKey.current || submissionPayload.current !== encodedPayload) {
      submissionKey.current = crypto.randomUUID();
      submissionPayload.current = encodedPayload;
    }
    try {
      const res = await fetch("/api/registrations", {
        method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": submissionKey.current },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        if (res.status === 400) submissionKey.current = "";
        throw new Error(data.error);
      }
      await openCheckout(data, path => router.push(path));
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : f.errors.submission);
      setStatus("error");
    }
  };


  return (
    <section id="register" aria-labelledby="register-heading" style={{ background: "var(--paper)" }}>
      <div className="shell reg-layout" style={{ maxWidth: 1180 }}>
        <div className="reg-head" data-reveal>
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 id="register-heading" className="display-l" style={{ marginTop: 18, color: "var(--ink)" }}>
            {f.titlePre} <em className="italic">{f.titleItalic}</em>
          </h2>
          <p className="body-l" style={{ marginTop: 20, maxWidth: 580 }}>{f.intro}</p>
        </div>

        <form noValidate onSubmit={handleSubmit} onFocusCapture={() => preloadCheckout()} className="reg-form" data-reveal aria-busy={status === "submitting"}>
          <PackageFrame selected={false} />
          <div className="reg-package">
            <div><span>{locale === "hi" ? "आपकी पूजा" : "YOUR OFFERING"}</span><strong>{t.packages.items.find(p => p.id === values.pkg)?.name}</strong></div>
            <strong className="reg-price">{packages.find(p => p.id === values.pkg)?.priceLabel}</strong>
          </div>
          <div className="reg-row">
            <label className="field">
              <span className="field-label field-label-req">{f.labels.fullName}</span>
              <input className="field-input" type="text" autoComplete="name"
                value={values.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </label>

            <label className="field">
              <span className="field-label field-label-req">{f.labels.mobile}</span>
              <input className="field-input" type="tel" inputMode="tel" autoComplete="tel"
                placeholder={f.placeholders.mobile}
                value={values.mobile}
                onChange={(e) => setField("mobile", e.target.value)}
                aria-invalid={!!errors.mobile}
              />
              {errors.mobile && <span className="field-error">{errors.mobile}</span>}
            </label>
          </div>

          <div className="reg-row">
            <div className="field">
              <span className="field-label field-label-req">{f.labels.whatsapp}</span>
              <input className="field-input" type="tel" inputMode="tel"
                disabled={values.sameAsMobile}
                value={values.sameAsMobile ? values.mobile : values.whatsapp}
                onChange={(e) => setField("whatsapp", e.target.value)}
                aria-invalid={!!errors.whatsapp}
              />
              <label className="field-check" style={{ marginTop: 14 }}>
                <input type="checkbox"
                  checked={values.sameAsMobile}
                  onChange={(e) => setField("sameAsMobile", e.target.checked)}
                />
                <span>{f.labels.sameAsMobile}</span>
              </label>
              {errors.whatsapp && <span className="field-error">{errors.whatsapp}</span>}
            </div>

            <label className="field">
              <span className="field-label">
                {f.labels.gotra} <span style={{ opacity: 0.5, letterSpacing: "0.05em" }}>{f.labels.gotraOptional}</span>
              </span>
              <input className="field-input" type="text"
                value={values.gotra}
                onChange={(e) => setField("gotra", e.target.value)}
              />
            </label>
          </div>

          <div className="reg-row">
            <label className="field">
              <span className="field-label field-label-req">{f.labels.pkg}</span>
              <select className="field-select"
                value={values.pkg}
                onChange={(e) => setField("pkg", e.target.value as PackageId)}
              >
                {t.packages.items.map((p) => {
                  const price = packages.find((pp) => pp.id === p.id)!.priceLabel;
                  return <option key={p.id} value={p.id}>{p.name} — {price}</option>;
                })}
              </select>
            </label>

            <label className="field">
              <span className={values.pkg === "family" ? "field-label field-label-req" : "field-label"}>
                {f.labels.members}
              </span>
              <input className="field-input" type="number" min={5} max={6}
                disabled={values.pkg !== "family"}
                value={values.members}
                onChange={(e) => setField("members", e.target.value)}
              />
              {errors.members && <span className="field-error">{errors.members}</span>}
            </label>
          </div>

          <label className="field">
            <span className="field-label">
              {f.labels.notes} <span style={{ opacity: 0.5, letterSpacing: "0.05em" }}>{f.labels.notesOptional}</span>
            </span>
            <textarea className="field-textarea" rows={3}
              value={values.notes}
              onChange={(e) => setField("notes", e.target.value)}
            />
          </label>

          <label className="field-check" style={{ marginTop: 8 }}>
            <input type="checkbox"
              checked={values.agree}
              onChange={(e) => setField("agree", e.target.checked)}
              aria-invalid={!!errors.agree}
            />
            <span>{f.labels.agree}</span>
          </label>
          {errors.agree && <span className="field-error" style={{ marginTop: 6, display: "block" }}>{errors.agree}</span>}

          {status === "error" && (
            <p className="field-error" style={{ marginTop: 20 }}>{paymentError || f.errors.submission}</p>
          )}

          <div className="reg-submit">
            <button type="submit" className="btn btn-primary"
              disabled={status === "submitting"}
              style={{ minWidth: 220 }}
            >
              {status === "submitting" ? f.labels.submitting : f.labels.submit}
              {status !== "submitting" && <Arrow />}
            </button>
            {status === "submitting" && <div className="payment-wait" role="status" aria-live="polite"><span className="payment-spinner" aria-hidden="true" />{locale === "hi" ? "सुरक्षित भुगतान विकल्प तैयार हो रहे हैं…" : "Preparing your secure payment options…"}</div>}
            <p className="body-xs" style={{ color: "var(--ink-mute)" }}>{f.labels.submitFootnote}</p>
            <Link href="/booking" className="body-xs">{locale === "hi" ? "मौजूदा बुकिंग की स्थिति जाँचें" : "Check an existing booking"}</Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        .reg-layout { display: grid; grid-template-columns: minmax(0,.75fr) minmax(0,1.4fr); gap: clamp(30px,5vw,72px); align-items: start; }
        .reg-head { position: sticky; top: 145px; padding-top: 16px; }
        .reg-head::before { content: "✦"; display: block; color: var(--brass); font-size: 24px; margin-bottom: 24px; }
        .reg-package { display: flex; justify-content: space-between; gap: 20px; align-items: center; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 1px solid #d9c29980; }
        .reg-package span { display: block; font-size: 9px; letter-spacing: .14em; color: var(--brass); margin-bottom: 6px; }
        .reg-package strong { display: block; font-family: var(--font-display); font-size: 25px; color: var(--maroon); font-weight: 500; }
        .reg-package .reg-price { font-size: 34px; white-space: nowrap; }

        .reg-form {
          position: relative;
          background: linear-gradient(135deg,#fffef9,#faf1e2);
          padding: clamp(30px, 3.5vw, 44px);
          border: 1px solid #d3b787;
          border-radius: 8px;
          box-shadow: 0 18px 45px #3b0d200a;
        }
        .reg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        .field-label { letter-spacing: .045em; color: #633042; }
        .field-input, .field-select, .field-textarea {
          min-height: 52px;
          padding: 14px 16px;
          border: 1px solid #c8aa73;
          border-radius: 8px;
          background-color: #fffdf7;
          color: #361d25;
          box-shadow: inset 0 1px 3px #72502509, 0 2px 5px #72502505;
          transition: border-color .2s, box-shadow .2s, background-color .2s;
        }
        .field-select { padding-right: 36px; cursor: pointer; }
        .field-textarea { min-height: 112px; line-height: 1.65; }
        .field-input::placeholder, .field-textarea::placeholder { color: #8b7865; opacity: 1; }
        .field-input:hover:not(:disabled), .field-select:hover, .field-textarea:hover { border-color: #a77a35; }
        .field-input:focus, .field-select:focus, .field-textarea:focus {
          border-color: #956b2b;
          background-color: #fffefb;
          box-shadow: 0 0 0 3px #bd945726, inset 0 1px 2px #72502508;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .field-input:disabled {
          background-color: #eee7d9;
          border-color: #d8cbb5;
          border-style: dashed;
          color: #776856;
          box-shadow: none;
        }
        .field-input[aria-invalid="true"], .field-select[aria-invalid="true"], .field-textarea[aria-invalid="true"] { border-color: #a73343; }
        .field-input[aria-invalid="true"]:focus, .field-select[aria-invalid="true"]:focus, .field-textarea[aria-invalid="true"]:focus { box-shadow: 0 0 0 3px #a733431c; }
        .field-check input { border-radius: 4px; border-color: #b69760; background-color: #fffdf7; }
        .field-check input:checked { background-color: var(--maroon); border-color: var(--maroon); }
        @media (prefers-reduced-motion: reduce) {
          .field-input, .field-select, .field-textarea { transition: none; }
        }
        .reg-submit {
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid var(--rule);
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
        }
        .payment-wait {
          display: flex;
          align-items: center;
          gap: 11px;
          width: min(100%, 400px);
          padding: 12px 15px;
          border: 1px solid #d3b787;
          border-radius: 6px;
          background: #fff9ec;
          color: #633042;
          font-size: 12px;
          line-height: 1.5;
        }
        .payment-spinner {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          border: 2px solid #bd945740;
          border-top-color: #761b2b;
          border-radius: 50%;
          animation: payment-spin .8s linear infinite;
        }
        @keyframes payment-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .payment-spinner { animation-duration: 2s; } }
        @media (max-width: 900px) {
          .reg-layout { grid-template-columns: 1fr; gap: 28px; }
          .reg-head { position: static; padding-top: 0; }
          .reg-head::before { margin-bottom: 12px; }
        }
        @media (max-width: 720px) {
          .reg-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </section>
  );
}
