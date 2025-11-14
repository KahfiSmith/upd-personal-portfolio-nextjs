"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAnchorScrollOffset } from "@/lib/utils/utils";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const hash = window.location.hash;

    const scrollToTopInstant = () => {
      const current = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(current) < 1) return;
      const lenisInstance: any = (window as any).__lenis;
      if (lenisInstance?.scrollTo) {
        lenisInstance.scrollTo(0, { duration: 0, immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    const attemptRestoreScroll = () => {
      try {
        const key = `__scrollRestore:${pathname}`;
        const stored = sessionStorage.getItem(key);
        if (!stored) return false;
        sessionStorage.removeItem(key);
        const parsed = JSON.parse(stored);
        const targetY = typeof parsed?.y === "number" ? parsed.y : null;
        if (targetY === null) return false;
        const lenisInstance: any = (window as any).__lenis;
        if (lenisInstance?.scrollTo) {
          const smoothEase = (t: number) => 1 - Math.pow(1 - t, 3);
          lenisInstance.scrollTo(targetY, { duration: 0.5, easing: smoothEase });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
        return true;
      } catch {
        return false;
      }
    };

    const attemptHashScroll = () => {
      if (!hash) return false;
      const targetId = hash.replace(/^#/, "");
      let attempts = 0;
      const maxAttempts = 30;

      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(targetId);
        if (el) {
          const lenisInstance: any = (window as any).__lenis;
          const instantHash = Boolean((window as any).__instantHashScroll);
          const fromDock = (window as any).__dockNavigateTo === targetId;
          const offset = getAnchorScrollOffset(targetId, el);
          if (lenisInstance?.scrollTo) {
            const easeInOutCubic = (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            lenisInstance.scrollTo(el, {
              duration: instantHash ? 0 : fromDock ? 1.8 : 0.9,
              easing: instantHash ? undefined : easeInOutCubic,
              immediate: instantHash,
              offset,
            });
          } else {
            const startY = window.scrollY || window.pageYOffset || 0;
            const targetRect = el.getBoundingClientRect();
            const targetY = startY + targetRect.top + offset;
            window.scrollTo({ top: targetY, behavior: instantHash ? "auto" : "smooth" });
          }
          try {
            (window as any).__dockNavigateTo = null;
            (window as any).__instantHashScroll = false;
          } catch {}
          return;
        }
        attempts += 1;
        if (attempts < maxAttempts) {
          requestAnimationFrame(tryScroll);
        } else {
          try {
            (window as any).__dockNavigateTo = null;
            (window as any).__instantHashScroll = false;
          } catch {}
        }
      };

      requestAnimationFrame(() => {
        if (!cancelled) tryScroll();
      });
      return true;
    };

    if (attemptRestoreScroll()) {
      return () => {
        cancelled = true;
      };
    }

    const handledHash = attemptHashScroll();
    if (!handledHash) {
      requestAnimationFrame(() => {
        if (!cancelled) scrollToTopInstant();
      });
    }

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
