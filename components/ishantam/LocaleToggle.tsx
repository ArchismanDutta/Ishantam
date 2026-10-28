"use client";

import { useLocale } from "./LocaleContext";

/** Compact English / Hindi toggle styled as a hairline segmented control. */
export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--rule-strong)",
        fontSize: 11,
        letterSpacing: "0.08em",
        fontWeight: 600,
        textTransform: "uppercase",
        padding: 1,
      }}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        style={{
          padding: compact ? "6px 10px" : "7px 13px",
          background: locale === "en" ? "var(--ink)" : "transparent",
          color: locale === "en" ? "var(--ivory)" : "var(--ink-soft)",
          transition: "background .18s, color .18s",
          minWidth: 36,
        }}
      >
        English
      </button>
      <button
        type="button"
        lang="hi"
        aria-pressed={locale === "hi"}
        onClick={() => setLocale("hi")}
        style={{
          padding: compact ? "6px 10px" : "7px 13px",
          background: locale === "hi" ? "var(--ink)" : "transparent",
          color: locale === "hi" ? "var(--ivory)" : "var(--ink-soft)",
          transition: "background .18s, color .18s",
          minWidth: 36,
          fontFamily: "var(--font-sanskrit)",
          letterSpacing: 0,
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        हिंदी
      </button>
    </div>
  );
}
