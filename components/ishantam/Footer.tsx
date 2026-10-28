"use client";

import { brand, packages as pricing, whatsAppLink } from "@/data/ishantam";
import { useLocale } from "./LocaleContext";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const { t } = useLocale();
  const f = t.footer;

  return (
    <footer className="site-footer">
      <div className="shell" style={{ paddingBlock: "clamp(28px, 3vw, 44px)" }}>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" aria-label="Ishantam — home"><BrandLogo size="footer" /></a>
            <p className="body" style={{ marginTop: 12, maxWidth: 360 }}>{f.brandBody}</p>
          </div>

          <div className="footer-cols">
            <section>
              <h3 className="eyebrow" style={{ color: "var(--maroon)" }}>{f.explore}</h3>
              <ul className="footer-links">
                {t.nav.items.map((n) => (
                  <li key={n.href}><a href={n.href}>{n.label}</a></li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="eyebrow" style={{ color: "var(--maroon)" }}>{f.packagesH}</h3>
              <ul className="footer-links">
                {t.packages.items.map((p) => {
                  const price = pricing.find((pp) => pp.id === p.id)!.priceLabel;
                  return <li key={p.id}><a href="#packages">{p.name} · {price}</a></li>;
                })}
              </ul>
            </section>

            <section>
              <h3 className="eyebrow" style={{ color: "var(--maroon)" }}>{f.contact}</h3>
              <ul className="footer-links">
                <li><a href={whatsAppLink()} target="_blank" rel="noopener">{f.whatsAppLabel}</a></li>
                <li style={{ color: "var(--ink-mute)" }}>{f.emailLabel}</li>
                <li><a href={`tel:+91${brand.phone}`}>{f.phoneLabel} · {brand.phone}</a></li>
              </ul>
            </section>
          </div>
        </div>

        <hr className="rule" style={{ margin: "24px 0 16px" }} />

        <div className="body-xs footer-disclaimer">{f.disclaimer}</div>

        <div className="footer-base">
          <span className="body-xs" style={{ color: "var(--ink-mute)" }}>{f.copyright(new Date().getFullYear())}</span>
          <span className="footer-base-links body-xs">
            <a href="#privacy" style={{ color: "var(--ink-mute)" }}>{f.privacy}</a>
            <a href="#terms"   style={{ color: "var(--ink-mute)" }}>{f.terms}</a>
            <a href="#refund"  style={{ color: "var(--ink-mute)" }}>{f.refund}</a>
          </span>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: radial-gradient(ellipse at 10% 0, #6d213b33, transparent 65%), #280a14;
          color: #f6e4c7;
          border-top: 1px solid #c5a36b70;
          --ink: #fae9cd; --ink-soft: #d7bfb1; --ink-mute: #bfa69a;
          --maroon: #e9c680; --rust: #efcc8e; --rule: #d2ae6c30;
        }
        .footer-brand :global(img) { filter: drop-shadow(0 2px 6px #e7b95314); }

        .footer-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
          gap: clamp(24px, 4vw, 64px);
        }
        .footer-cols {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .footer-links {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          color: var(--ink-soft);
        }
        .footer-links a {
          transition: color .18s;
        }
        .footer-links a:hover { color: var(--rust); }
        .footer-disclaimer {
          color: var(--ink-mute);
          max-width: 920px;
        }
        .footer-base {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--rule);
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-base-links {
          display: inline-flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-cols { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .footer-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
          .footer-cols section:last-child { grid-column: 1 / -1; }
          .footer-base { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
