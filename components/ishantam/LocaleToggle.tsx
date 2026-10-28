"use client";

import { useLocale } from "./LocaleContext";
import styles from "./LocaleToggle.module.css";

/** Compact English / Hindi toggle styled as a hairline segmented control. */
export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`${styles.group} ${compact ? styles.compact : ""}`}
    >
      <button
        type="button"
        lang="en"
        onClick={() => setLocale("en")}
        className={styles.button}
        aria-pressed={locale === "en"}
        aria-label="English"
      >
        <span className={styles.fullLabel}>English</span><span className={styles.shortLabel}>EN</span>
      </button>
      <button
        type="button"
        lang="hi"
        onClick={() => setLocale("hi")}
        className={`${styles.button} ${styles.hindi}`}
        aria-pressed={locale === "hi"}
        aria-label="हिंदी"
      >
        <span className={styles.fullLabel}>हिंदी</span><span className={styles.shortLabel}>हि</span>
      </button>
    </div>
  );
}
