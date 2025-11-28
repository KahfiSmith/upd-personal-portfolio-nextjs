import { useEffect } from "react";
import Lenis from "lenis";

interface LenisWindow extends Window {
  __lenis?: Lenis;
}

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const lenisWindow = window as LenisWindow;
    lenisWindow.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      try {
        if (lenisWindow.__lenis === lenis) {
          delete lenisWindow.__lenis;
        }
      } catch {}
      lenis.destroy();
    };
  }, []);
};
