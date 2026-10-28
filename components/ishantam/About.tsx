"use client";

import Image from "next/image";
import { useLocale } from "./LocaleContext";
import styles from "./Home.module.css";

export function About() {
  const { t, locale } = useLocale();
  const a = t.about;
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={`shell ${styles.aboutLayout}`}>
        <figure className={styles.aboutFigure}><div><Image src="/images/mangalnath-temple-entrance.webp" alt={locale === "hi" ? "मंगलनाथ मंदिर, उज्जैन का लाल पत्थर का प्रवेश द्वार" : "Red sandstone entrance of Mangalnath Temple, Ujjain"} fill sizes="(max-width: 700px) 90vw, 38vw" /></div><figcaption>{a.imageCaption}</figcaption></figure>
        <div><span className="eyebrow">{a.eyebrow}</span><h2 id="about-heading" className="display-l">{a.titlePre} <em>{a.titleItalic}</em></h2><p className={`devanagari ${styles.aboutInvocation}`}>{a.invocation}</p><div className={styles.aboutBody}>{a.paragraphs.map((para) => <p key={para} className="body">{para}</p>)}</div><div className={styles.templeDetail}><h3>{a.templeTitle}</h3><p className="body">{a.templeBody}</p></div><p className={styles.note}>{a.disclaimer}</p></div>
      </div>
    </section>
  );
}
