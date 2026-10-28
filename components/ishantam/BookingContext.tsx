"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { PackageId } from "@/data/ishantam";

interface BookingState {
  selected: PackageId;
  setSelected: (id: PackageId) => void;
  /** Scrolls to the booking form after setting selection. */
  pickAndScroll: (id: PackageId) => void;
}

const Ctx = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<PackageId>("couple");

  const pickAndScroll = useCallback((id: PackageId) => {
    setSelected(id);
    requestAnimationFrame(() => {
      const el = document.getElementById("register");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // Scroll-reveal observer attached once at app root
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <Ctx.Provider value={{ selected, setSelected, pickAndScroll }}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
