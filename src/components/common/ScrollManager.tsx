"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAnchorScrollOffset } from "@/lib/utils/utils";

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
    const ensureTop = () => {
      const atTop = Math.abs(window.scrollY || window.pageYOffset || 0) < 1;
      if (atTop) return;
      const doScrollTop = () => {
        const lenisInstance: any = (window as any).__lenis;
        if (lenisInstance?.scrollTo) {
          lenisInstance.scrollTo(0, { duration: 0, immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      };
      setTimeout(doScrollTop, 40);
    };

    const run = () => {
      if (hash) {
        const targetId = hash.replace(/^#/, "");
        const scrollToHash = (attempt = 0) => {
          const el = document.getElementById(targetId);
          if (!el) {
            if (attempt < 6) {
              setTimeout(() => scrollToHash(attempt + 1), 60);
              return;
            }
            ensureTop();
            try { (window as any).__dockNavigateTo = null; } catch {}
            return;
          }
          const lenisInstance: any = (window as any).__lenis;
          const fromDock = (window as any).__dockNavigateTo === targetId;
          const offset = getAnchorScrollOffset(targetId, el);
          if (lenisInstance?.scrollTo) {
            const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
            lenisInstance.scrollTo(el, {
              duration: fromDock ? 1.8 : 0.9,
              easing: easeInOutCubic,
              offset,
            });
          } else {
            const startY = window.scrollY || window.pageYOffset || 0;
            const targetRect = el.getBoundingClientRect();
            const targetY = startY + targetRect.top + offset;
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
          try { (window as any).__dockNavigateTo = null; } catch {}
        };

        scrollToHash();
        return;
      }

      const atTop = Math.abs(window.scrollY || window.pageYOffset || 0) < 1;
      if (!atTop) {
        const lenisInstance: any = (window as any).__lenis;
        const scrollTop = () => {
          if (lenisInstance?.scrollTo) {
            lenisInstance.scrollTo(0, { duration: 0, immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: "auto" });
          }
        };
        requestAnimationFrame(scrollTop);
      }
    };

    // Defer a tick to let layout paint and Lenis initialize
    requestAnimationFrame(() => setTimeout(run, 40));
  }, [pathname]);

  return null;
}
