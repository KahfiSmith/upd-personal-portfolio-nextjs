import { useEffect } from "react";
import Lenis from "lenis";

interface LenisWindow extends Window {
  __lenis?: Lenis;
}

export const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const lenisWindow = window as LenisWindow;
    lenisWindow.__lenis = lenis;

    let rafId: number | null = null;
    let rafActive = false;

    const raf = (time: number) => {
      lenis.raf(time);
      if (rafActive) {
        rafId = window.requestAnimationFrame(raf);
      }
    };

    const startRaf = () => {
      if (rafActive) return;
      rafActive = true;
      rafId = window.requestAnimationFrame(raf);
    };

    const stopRaf = () => {
      rafActive = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRaf();
      } else {
        startRaf();
      }
    };

    startRaf();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopRaf();
      try {
        if (lenisWindow.__lenis === lenis) {
          delete lenisWindow.__lenis;
        }
      } catch {}
      lenis.destroy();
    };
  }, []);
};
