"use client";
import { BrandLogo } from "./BrandLogo";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useLocale } from "./LocaleContext";
import styles from "./TempleEntry.module.css";

const REPLAY_EVENT = "ishantam:replay-temple-entry";
const SPLASH_MS = 1200;

export function ReplayTempleEntry() {
  const { locale } = useLocale();
  return <button className={styles.replay} type="button" onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}><RotateCcw size={14} />{locale === "hi" ? "शिव दर्शन फिर देखें" : "Replay the darshan"}</button>;
}

export function TempleEntry() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(true);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const hi = locale === "hi";

  useEffect(() => {
    const replay = () => { setRun((value) => value + 1); setVisible(true); };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const content = document.getElementById("site-content");
    const previousOverflow = document.documentElement.style.overflow;
    const wasInert = content?.hasAttribute("inert");
    document.documentElement.style.overflow = "hidden";
    content?.setAttribute("inert", "");

    let done = false;
    const complete = () => {
      if (done) return;
      done = true;
      document.documentElement.style.overflow = previousOverflow;
      if (!wasInert) content?.removeAttribute("inert");
      setVisible(false);
      if (run > 0) document.getElementById("hero-heading")?.focus({ preventScroll: true });
    };

    const timer = window.setTimeout(complete, SPLASH_MS);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" || event.key === "Enter" || event.key === " ") { event.preventDefault(); complete(); } };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      if (!done) {
        document.documentElement.style.overflow = previousOverflow;
        if (!wasInert) content?.removeAttribute("inert");
      }
    };
  }, [visible, run]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className={styles.entry} role="dialog" aria-modal="true" aria-label={hi ? "शिव दर्शन" : "Shiva darshan"} onClick={() => setVisible(false)}>
      <div className={styles.stage} aria-hidden="true">
        <Image src="/images/jyotirling/shiva-hero.webp" alt="" fill priority sizes="(max-width: 700px) 70vw, 50vh" className={styles.shivaImage} />
      </div>
      <div className={styles.top}><BrandLogo size="compact" /><span className={styles.location}>{hi ? "उज्जैन · भारत" : "UJJAIN · INDIA"}</span></div>
      <div className={styles.caption}><span>{hi ? "शिव की शरण में" : "IN THE PRESENCE OF SHIVA"}</span><h2>{hi ? "महादेव" : "Mahadev"}</h2><p lang="hi">ॐ नमः शिवाय</p></div>
    </div>
  );
}
