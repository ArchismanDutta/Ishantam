"use client";

import Image from "next/image";
import { useLocale } from "./LocaleContext";
import styles from "./Home.module.css";

export function Inclusions() {
  const { t } = useLocale();
  const i = t.inclusions;
  return (
    <section className={styles.inclusions} aria-labelledby="inclusions-heading">
      <div className={styles.ganeshaWatermark} aria-hidden="true" />
      <div className="shell">
        <header className={styles.sectionHead}><div><span className="eyebrow">{i.eyebrow}</span><h2 id="inclusions-heading" className="display-l">{i.titlePre} <em>{i.titleItalic}</em></h2></div><p className="body">{i.intro}</p></header>
        <div className={styles.inclusionsLayout}>
          <div><div className={styles.inclusionsGrid}>{i.items.map((item) => <article key={item.number} className={styles.inclusion}><span>{item.number}</span><h3>{item.title}</h3><p className="body">{item.body}</p></article>)}</div>{i.footnote && <p className={styles.inclusionFootnote}>{i.footnote}</p>}</div>
          <figure className={styles.offeringFigure}><div><Image src="/images/prasad-thali.webp" alt="" fill sizes="(max-width: 700px) 90vw, 28vw" /></div><figcaption>{i.imageCaption}</figcaption></figure>
        </div>
      </div>
    </section>
  );
}
