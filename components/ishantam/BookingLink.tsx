"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import styles from "./BookingLink.module.css";

export function BookingLink({ children, onContinue }: { children: ReactNode; onContinue?: () => void }) {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const begin = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (timer.current) return;
    setActive(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      setActive(false);
      onContinue?.();
      window.location.hash = "packages";
      document.getElementById("packages-heading")?.focus({ preventScroll: true });
    }, 2000);
  };

  return <a href="#packages" className={`btn btn-primary ${styles.link}`} onClick={begin} aria-busy={active}>
    <span className={`${styles.label} ${active ? styles.hidden : ""}`}>{children}</span>
    {active && <span className={styles.vision} aria-hidden="true">
      <svg viewBox="0 0 120 90" fill="none" className={styles.shiva}>
        <circle cx="60" cy="36" r="29" stroke="currentColor" strokeOpacity=".2" strokeWidth=".7" />
        <circle cx="60" cy="36" r="24" stroke="currentColor" strokeOpacity=".16" strokeWidth=".7" />
        <g fill="currentColor">
          <path d="M52 24C47 18 52 13 57 14C52 6 64 4 66 11C72 10 75 18 69 23L68 29H52Z" />
          <path d="M51 25C47 30 50 41 56 43L55 47C44 48 42 54 40 63L33 67L28 65C23 64 23 69 29 71L40 73C44 72 47 66 49 62L48 71H72L71 62C73 67 77 73 81 73L92 71C98 69 97 64 92 65L87 67L80 63C78 54 76 48 65 47L64 43C71 40 73 29 68 25Z" />
          <path d="M49 67C39 66 22 73 23 79C24 85 47 84 60 79C73 84 96 85 97 79C98 73 81 66 71 67L60 73Z" />
        </g>
        <path d="M72 12C65 14 65 20 72 21C68 24 62 20 63 16C63 12 68 10 72 12Z" fill="#ffedb0" />
        <path d="M55 31H65M56 34H64" stroke="#efcc83" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M60 30V35" stroke="#efcc83" strokeWidth="1.1" />
        <path d="M16 74V27M16 38C6 38 7 27 8 23M16 38C26 38 25 27 24 23M16 27V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>}
  </a>;
}
