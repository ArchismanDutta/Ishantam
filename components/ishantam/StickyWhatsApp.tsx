"use client";

import { useEffect, useState } from "react";
import { whatsAppLink } from "@/data/ishantam";

/**
 * Mobile-only sticky WhatsApp action. Appears after the user has scrolled past
 * the hero so it doesn't fight the hero CTAs. Hidden on desktop (header handles it).
 */
export function StickyWhatsApp() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsAppLink()}
      target="_blank"
      rel="noopener"
      aria-label="Enquire on WhatsApp"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className="sticky-wa"
      style={{
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? "auto" : "none",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.14 1.6 5.95L0 24l6.22-1.63A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52Zm-8.52 18.3a9.8 9.8 0 0 1-5-1.36l-.36-.22-3.69.97.98-3.6-.23-.37A9.9 9.9 0 1 1 21.9 12c0 5.47-4.45 9.78-9.9 9.78Zm5.4-7.33c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.37.45-.56.15-.19.2-.32.3-.52.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.17 5.03 4.45.7.3 1.25.48 1.68.62.7.22 1.35.19 1.86.11.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.19-.57-.34Z" />
      </svg>

      <style jsx>{`
        .sticky-wa {
          position: fixed;
          right: 18px;
          bottom: calc(18px + env(safe-area-inset-bottom, 0px));
          z-index: 48;
          display: none;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #128C7E;
          color: #fff;
          box-shadow: 0 4px 16px rgba(18, 140, 126, 0.25);
          transition: opacity .3s var(--ease-standard), transform .3s var(--ease-standard);
        }
        @media (max-width: 920px) {
          .sticky-wa { display: inline-flex; }
        }
      `}</style>
    </a>
  );
}
