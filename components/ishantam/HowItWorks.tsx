"use client";

import { useLocale } from "./LocaleContext";
import styles from "./Home.module.css";

export function HowItWorks() {
  const { t } = useLocale();
  const s = t.steps;
  return <section id="how" className={styles.how} aria-labelledby="how-heading"><div className="shell"><header className={styles.centerHead}><span className="eyebrow">{s.eyebrow}</span><h2 id="how-heading" className="display-l">{s.titlePre} <em>{s.titleItalic}</em></h2></header><ol className={styles.steps}>{s.items.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p className="body-s">{step.body}</p></li>)}</ol></div></section>;
}
