"use client";

import type { MouseEvent, ReactNode } from "react";
import styles from "./BookingLink.module.css";

export function BookingLink({ children, onContinue }: { children: ReactNode; onContinue?: () => void }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    onContinue?.();
  };

  return <a href="#packages" className={`btn btn-primary ${styles.link}`} onClick={handleClick}>{children}</a>;
}
