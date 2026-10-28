"use client";

import Image from "next/image";
import { useLocale } from "./LocaleContext";
import styles from "./Home.module.css";

export function Rituals() {
  const { t } = useLocale();
  const r = t.rituals;
  return (
    <section id="rituals" className={styles.rituals} aria-labelledby="rituals-heading">
      <div className="shell"><header className={styles.sectionHead}><div><span className="eyebrow">{r.eyebrow}</span><h2 id="rituals-heading" className="display-l">{r.titlePre} <em>{r.titleItalic}</em></h2></div><p className="body">{r.intro}</p></header><div className={styles.ritualsLayout}><figure className={styles.ritualFigure}><div><Image src="/images/rudrabhishek-900.webp" alt="" fill sizes="(max-width: 700px) 90vw, 34vw" /></div><figcaption>{r.imageCaption}</figcaption></figure><ol className={styles.ritualList}>{r.items.map((item) => <li key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p className="body">{item.body}</p></div></li>)}</ol></div></div>
    </section>
  );
}
