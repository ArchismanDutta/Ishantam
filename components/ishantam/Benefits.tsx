"use client";

import { useLocale } from "./LocaleContext";
import styles from "./Home.module.css";

export function Benefits() {
  const { t, locale } = useLocale();
  const b = t.benefits;
  const toNum = (n: number) => locale === "hi" ? n.toString().replace(/\d/g, (d) => "०१२३४५६७८९"[+d]) : String(n).padStart(2, "0");
  return (
    <section id="benefits" className={styles.benefits} aria-labelledby="benefits-heading">
      <div className={styles.shivaWatermark} aria-hidden="true" />
      <div className="shell"><header className={styles.sectionHead}><div><span className="eyebrow">{b.eyebrow}</span><h2 id="benefits-heading" className="display-l">{b.titlePre} <em>{b.titleItalic}</em></h2></div><p className="body">{b.intro}</p></header><ol className={styles.benefitsList}>{b.list.map((item, i) => <li key={item}><span>{toNum(i + 1)}</span><p>{item}</p></li>)}</ol></div>
    </section>
  );
}
