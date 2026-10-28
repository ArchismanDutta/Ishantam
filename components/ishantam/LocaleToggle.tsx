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
      >
        English
      </button>
      <button
        type="button"
        lang="hi"
        onClick={() => setLocale("hi")}
        className={`${styles.button} ${styles.hindi}`}
        aria-pressed={locale === "hi"}
      >
        हिंदी
      </button>
    </div>
  );
}
