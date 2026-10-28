"use client";
import { BrandLogo } from "./BrandLogo";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useLocale } from "./LocaleContext";
import styles from "./TempleEntry.module.css";

const REPLAY_EVENT = "ishantam:replay-temple-entry";

export function ReplayTempleEntry() {
  const { locale } = useLocale();
  return <button className={styles.replay} type="button" onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}><RotateCcw size={14} />{locale === "hi" ? "द्वार प्रवेश फिर देखें" : "Replay the temple entry"}</button>;
}

export function TempleEntry() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(true);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const hi = locale === "hi";

  useEffect(() => {
    const replay = () => { setRun((value) => value + 1); setVisible(true); };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!visible || !root) return;
    const content = document.getElementById("site-content");
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    const wasInert = content?.hasAttribute("inert");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let done = false;
    let finishing = false;
    let timeline: gsap.core.Timeline;
    const restore = () => {
      document.documentElement.style.overflow = previousOverflow;
      if (!wasInert) content?.removeAttribute("inert");
    };
    const complete = () => {
      if (done) return;
      done = true;
      finishing = false;
      restore();
      setVisible(false);
      const target = run > 0 && previousFocus?.isConnected ? previousFocus : document.getElementById("hero-heading");
      target?.focus({ preventScroll: true });
    };
    const finish = (immediate = false) => {
      if (done || finishing) return;
      finishing = true;
      if (immediate) { complete(); return; }
      timeline?.kill();
      gsap.to(root, { autoAlpha: 0, duration: 0.65, ease: "power2.inOut", overwrite: true, onComplete: complete });
    };
    finishRef.current = () => finish(motion.matches);
    document.documentElement.style.overflow = "hidden";
    content?.setAttribute("inert", "");
    skipRef.current?.focus({ preventScroll: true });

    const syncPlayback = () => {
      const stop = motion.matches || document.hidden;
      root.dataset.paused = String(stop);
      if (stop) timeline?.pause(); else timeline?.resume();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); finish(motion.matches); }
      if (event.key !== "Tab") return;
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button")).filter((button) => button.getClientRects().length > 0);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onMotionChange = () => { if (motion.matches) finish(true); };
    root.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", onMotionChange);

    const context = gsap.context(() => {
      timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: complete });
      if (motion.matches) {
        // Keep the doorway visible, but let the visitor enter without motion.
        timeline.pause();
        return;
      }
      timeline
        .to("[data-entry-invitation]", { autoAlpha: 0, y: -12, duration: 0.55 }, 1)
        .fromTo("[data-entry-seam]", { opacity: 0.25 }, { opacity: 1, scaleX: 3, duration: 1.5 }, 0)
        .to("[data-entry-left]", { rotationY: -106, duration: 2.8 }, 0.85)
        .to("[data-entry-right]", { rotationY: 106, duration: 2.8 }, 0.85)
        .fromTo("[data-entry-sanctuary]", { scale: 0.92, filter: "brightness(0.48)" }, { scale: 1, filter: "brightness(1)", duration: 4, ease: "power2.out" }, 0.85)
        .fromTo("[data-entry-backlight]", { opacity: 0.25, scale: 0.84 }, { opacity: 1, scale: 1, duration: 3.8, ease: "sine.out" }, 0.85)
        .to("[data-entry-seam]", { autoAlpha: 0, duration: 1.2 }, 1.6)
        .to("[data-entry-gateway]", { scale: 1.12, autoAlpha: 0, duration: 1 }, 3.15)
        .fromTo("[data-entry-caption]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 3.05)
        .to(root, { autoAlpha: 0, duration: 1.1, ease: "sine.inOut" }, 8.5);
    }, root);
    syncPlayback();
    return () => {
      done = true;
      context.revert();
      root.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", onMotionChange);
      restore();
    };
  }, [visible, run]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className={styles.entry} role="dialog" aria-modal="true" aria-label={hi ? "पवित्र मंदिर में प्रवेश" : "Enter the sacred temple"}>
      <div className={styles.scene} aria-hidden="true">
        {/* Original Jyotirling HeroSection artwork and 40s / 6s / 3s motion. */}
        <div className={styles.sanctuary} data-entry-sanctuary>
          <div className={styles.stage}>
            <div className={styles.backlight} data-entry-backlight>
              <div className={styles.halo} />
              <div className={styles.rays} />
              <div className={styles.coreLight} />
            </div>
            <div className={styles.mandala}>
              <Image src="/images/jyotirling/Mandala.webp" alt="" fill priority sizes="(max-width: 700px) 94vw, 80vh" className={styles.mandalaImage} />
            </div>
            <div className={styles.shiva}>
              <Image src="/images/jyotirling/shiva-hero.webp" alt="" fill priority sizes="(max-width: 700px) 90vw, 74vh" className={styles.shivaImage} />
            </div>
            <div className={styles.groundLight} />
          </div>
        </div>
        <div className={styles.gateway} data-entry-gateway>
          <div className={`${styles.jamb} ${styles.jambLeft}`} />
          <div className={`${styles.door} ${styles.doorLeft}`} data-entry-left />
          <div className={`${styles.door} ${styles.doorRight}`} data-entry-right />
          <div className={`${styles.jamb} ${styles.jambRight}`} />
          <div className={styles.seam} data-entry-seam />
        </div>
        <div className={styles.mist} /><div className={styles.vignette} />
        <div className={styles.embers}>{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ left: `${(i * 31 + 7) % 100}%`, top: `${(i * 17 + 13) % 100}%`, animationDelay: `${-i * .9}s` }} />)}</div>
      </div>
      <div className={styles.top}><BrandLogo size="compact" /><span className={styles.location}>{hi ? "उज्जैन · भारत" : "UJJAIN · INDIA"}</span></div>
      <div className={styles.invitation} data-entry-invitation><span>{hi ? "एक पवित्र शुरुआत" : "A SACRED BEGINNING"}</span><h2>{hi ? "भक्ति के द्वार खुलते हैं।" : "The doors to devotion open."}</h2></div>
      <div className={styles.caption} data-entry-caption><span>{hi ? "शिव की शरण में" : "IN THE PRESENCE OF SHIVA"}</span><h2>{hi ? "महादेव" : "Mahadev"}</h2><p lang="hi">ॐ नमः शिवाय</p></div>
      <div className={styles.bottom}><span lang="hi">ॐ</span></div>
      <button type="button" ref={skipRef} className={styles.enterAnywhere} onDoubleClick={() => finishRef.current()} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); finishRef.current(); } }} aria-label={hi ? "वेबसाइट में प्रवेश करने के लिए कहीं भी डबल क्लिक करें" : "Double-click anywhere to enter the website"}><span className={styles.enterLabel}>{hi ? "कहीं भी डबल क्लिक करके प्रवेश करें" : "Double-click anywhere to enter"}<ArrowRight size={16} /></span></button>
    </div>
  );
}
