"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Locale } from "@/data/content";

interface LocaleState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Content;
}

const Ctx = createContext<LocaleState | null>(null);
// Start Hindi-first once for existing visitors, then remember explicit choices.
const STORAGE_KEY = "ishantam-locale-v2";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("hi");

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "hi") setLocaleState(stored);
    } catch { /* storage not available */ }
  }, []);

  // Reflect current locale on <html> for CSS targeting + accessibility
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-locale", locale);
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  return <Ctx.Provider value={{ locale, setLocale, t: content[locale] }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
