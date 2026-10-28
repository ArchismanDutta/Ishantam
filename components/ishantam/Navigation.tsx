"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Arrow } from "./primitives";
import { BookingLink } from "./BookingLink";
import { useLocale } from "./LocaleContext";
import { LocaleToggle } from "./LocaleToggle";
import styles from "./Navigation.module.css";

export function Navigation() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const close = () => { dialogRef.current?.close(); setOpen(false); };
  return (
    <>
      <header className={styles.header}>
        <div className={`shell-wide ${styles.inner}`}>
          <a href="#home" className={styles.brand} aria-label="ISHANTAM — home"><BrandLogo preload /></a>
          <nav className={styles.nav} aria-label="Primary">{t.nav.items.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div className={styles.actions}><LocaleToggle compact /><BookingLink>{t.nav.cta}<Arrow /></BookingLink></div>
          <button type="button" className={styles.menuButton} aria-label="Open menu" aria-expanded={open} onClick={() => { dialogRef.current?.showModal(); setOpen(true); }}><Menu size={22} /></button>
        </div>
      </header>
      <dialog ref={dialogRef} className={styles.dialog} onClose={() => setOpen(false)} aria-label="Site menu">
        <div className={styles.dialogTop}><BrandLogo size="menu" /><button type="button" aria-label="Close menu" onClick={close}><X size={23} /></button></div>
        <LocaleToggle />
        <nav aria-label="Mobile navigation">{t.nav.items.map((item) => <a key={item.href} href={item.href} onClick={close}>{item.label}<Arrow /></a>)}</nav>
        <BookingLink onContinue={close}>{t.nav.cta}<Arrow /></BookingLink>
      </dialog>
    </>
  );
}
