"use client";

import { useState } from "react";
import { useLocale } from "./LocaleContext";

export function FAQ() {
  const { t } = useLocale();
  const q = t.faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" aria-labelledby="faq-heading">
      <div className="shell">
        <div className="faq-grid">
          <header data-reveal>
            <span className="eyebrow">{q.eyebrow}</span>
            <h2 id="faq-heading" className="display-l" style={{ marginTop: 18, color: "var(--ink)" }}>
              {q.titlePre} <em className="italic">{q.titleItalic}</em>
            </h2>
            <p className="body-l" style={{ marginTop: 20, maxWidth: 420 }}>{q.intro}</p>
          </header>

          <ol className="faq-list" data-reveal>
            {q.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="faq-item" data-open={isOpen}>
                  <button type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="faq-trigger"
                  >
                    <span className="faq-q display-s">{f.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" style={{ transition: "opacity .25s", opacity: isOpen ? 0 : 1 }} />
                        <path d="M2 7h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    hidden={!isOpen}
                    className="faq-panel"
                  >
                    <p className="body">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style jsx>{`
        .faq-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
          gap: clamp(32px, 6vw, 96px);
          align-items: start;
        }
        .faq-list { display: grid; gap: 12px; }
        .faq-item { border: 1px solid #dfcfb7; border-radius: 6px; padding: 0 22px; background: #fffdf8; }
        .faq-item[data-open="true"] { border-color: #c4a067; background: linear-gradient(130deg,#fffdf7,#f8efde); }
        .faq-q { font-family: var(--font-body); font-size: 14px; font-weight: 600; }
        .faq-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 21px 0;
          text-align: left;
          color: var(--ink);
          transition: color .22s;
        }
        .faq-trigger:hover { color: var(--rust); }
        .faq-q { line-height: 1.3; }
        .faq-icon {
          flex: 0 0 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--brass);
          border: 1px solid var(--rule-strong);
          border-radius: 50%;
          transition: border-color .22s, color .22s;
        }
        .faq-trigger:hover .faq-icon { border-color: var(--rust); color: var(--rust); }
        .faq-panel {
          padding-bottom: 24px; border-top: 1px solid #d6bd933d; padding-top: 16px;
          max-width: 720px;
        }
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
