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
          const targetId = hash.replace(/^#/, "");
          // If navigation was triggered from FloatingDock from another page, use longer, smoother scroll
          const fromDock = (window as any).__dockNavigateTo === targetId;
          if (lenis?.scrollTo) {
            const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
            lenis.scrollTo(el, {
              duration: fromDock ? 1.8 : 0.9,
              easing: easeInOutCubic,
            });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          try { (window as any).__dockNavigateTo = null; } catch {}
          return;
        }
      }
      // Avoid redundant scroll-to-top that can cause flicker.
      // Delay slightly to let PageTransition fade start, reducing perceived flicker.
      const atTop = Math.abs(window.scrollY || window.pageYOffset || 0) < 1;
      if (!atTop) {
        const doScrollTop = () => {
          if (lenis?.scrollTo) {
            lenis.scrollTo(0, { duration: 0.6 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        };
        setTimeout(doScrollTop, 120);
      }
    };

    // Defer a tick to let layout paint and Lenis initialize
    requestAnimationFrame(() => setTimeout(run, 40));
  }, [pathname]);

  return null;
}
