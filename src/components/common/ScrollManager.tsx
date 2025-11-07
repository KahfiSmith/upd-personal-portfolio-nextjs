"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  // Disable browser's automatic restoration to control it ourselves
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}
  }, []);

  // On route change, scroll to target (hash) or to top smoothly
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const run = () => {
      const lenis: any = (window as any).__lenis;
      if (hash) {
        const el = document.getElementById(hash.replace(/^#/, ""));
        if (el) {
          if (lenis?.scrollTo) {
            lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          return;
        }
      }
      // Avoid redundant scroll-to-top that can cause flicker
      const atTop = Math.abs(window.scrollY || window.pageYOffset || 0) < 1;
      if (!atTop) {
        if (lenis?.scrollTo) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    // Defer a tick to let layout paint and Lenis initialize
    requestAnimationFrame(() => setTimeout(run, 0));
  }, [pathname]);

  return null;
}
