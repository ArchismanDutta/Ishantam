"use client";

import { packages as pricing, whatsAppLink } from "@/data/ishantam";
import { useLocale } from "./LocaleContext";
import { Arrow } from "./primitives";
import { BookingLink } from "./BookingLink";
import styles from "./Home.module.css";

export function FinalCTA() {
  const { t } = useLocale();
  const f = t.final;
  return (
    <section id="begin" className={styles.final} aria-labelledby="final-heading">
      <div className={styles.finalArt} aria-hidden="true" />
      <div className={`shell ${styles.finalInner}`}>
        <div><span className="eyebrow">{f.eyebrow}</span><h2 id="final-heading" className="display-l">{f.titleTop} <em>{f.titleItalic}</em></h2><p className={styles.finalBody}>{f.body}</p><p className={`devanagari ${styles.finalMantra}`}>{f.devanagari}</p></div>
        <div><div className={styles.finalPrices}>{pricing.map((pkg) => <div key={pkg.id}><strong>{pkg.priceLabel}</strong><span>{f.priceLabels[pkg.id]}</span></div>)}</div><div className={styles.finalActions}><BookingLink>{f.ctaPrimary}<Arrow /></BookingLink><a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-ghost">{f.ctaSecondary}<Arrow /></a></div></div>
      </div>
    </section>
  );
}
