"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type NavigateOptions = {
  label?: string;
  disableCurtain?: boolean;
};

type TransitionContextValue = {
  navigate: (href: string, options?: NavigateOptions) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

/**
 * Wave dengan bagian atas & bawah melengkung (kayak pil).
 * - Atas: M → Q (top curve)
 * - Bawah: L → Q (bottom curve)
 */
const WAVE_START =
  "path('M -200 -400 Q 1000 -700 2200 -400 L 2200 40 Q 1000 220 -200 40 Z')";

const WAVE_PEAK =
  "path('M -200 -600 Q 1000 -900 2200 -600 L 2200 360 Q 1000 660 -200 360 Z')";

const WAVE_FULL =
  "path('M -200 -800 Q 1000 -1100 2200 -800 L 2200 1200 Q 1000 1500 -200 1200 Z')";

/**
 * Khusus OUTRO:
 * Wave dengan top-edge melengkung ke bawah (smile) di dalam viewport.
 * Ini yang dipakai saat wipe keluar (penutup).
 */
const WAVE_OUT_CURVE =
  "path('M -200 0 Q 1000 260 2200 0 L 2200 1400 Q 1000 1660 -200 1400 Z')";

const formatLabel = (href: string) => {
  const withoutQuery = href.replace(/[?#].*$/, "");
  if (!withoutQuery || withoutQuery === "/") return "Home";
  const segments = withoutQuery.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "Page";
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

type LenisGlobal = {
  scroll?: number;
  scrollTo?: (target: HTMLElement | number, options?: { duration?: number; easing?: (t: number) => number; offset?: number }) => void;
};

// INTRO: akhiri di WAVE_FULL (belum terlalu cekung)
const WIPE_IN_KEYFRAMES = [
  { clipPath: WAVE_PEAK, webkitClipPath: WAVE_PEAK, duration: 0.55 },
  { clipPath: WAVE_FULL, webkitClipPath: WAVE_FULL, duration: 0.65 },
  // kalau mau, bisa tambahin WAVE_OVERFLOW lagi, tapi sekarang kita cukup sampai FULL
];

const TITLE_EXIT_DURATION = 0.6;
const TITLE_HOLD_DURATION = 0.8;
const WIPE_SLIDE_DURATION = 1.35;

export const usePageTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
};

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const animatingRef = useRef(false);

  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (!wipeRef.current) return;

    gsap.set(wipeRef.current, {
      clipPath: WAVE_START,
      webkitClipPath: WAVE_START,
      opacity: 1,
    });

    gsap.set(overlayRef.current, { pointerEvents: "none" });
  }, [isClient]);

  const normalizePath = useCallback((value: string) => {
    const pathOnly = value.replace(/[?#].*$/, "");
    return pathOnly || "/";
  }, []);

  const rememberScrollPosition = useCallback(() => {
    if (typeof window === "undefined") return;
    const lenis = (window as typeof window & { __lenis?: LenisGlobal }).__lenis;
    const currentScroll =
      typeof lenis?.scroll === "number"
        ? lenis.scroll
        : window.scrollY ?? window.pageYOffset ?? 0;
    try {
      sessionStorage.setItem(
        `__scrollRestore:${pathname}`,
        JSON.stringify({ y: currentScroll })
      );
    } catch {}
  }, [pathname]);

  const pushWithHashAwareScroll = useCallback(
    (target: string) => {
      const options = target.includes("#") ? { scroll: false } : undefined;
      if (options) {
        router.push(target, options);
      } else {
        router.push(target);
      }
    },
    [router]
  );

  // OUTRO: penutup wipe (saat wave keluar)
  const openWipe = useCallback(() => {
    const wipe = wipeRef.current;
    if (!wipe) {
      animatingRef.current = false;
      setOverlayVisible(false);
      setTitle("");
      setShowTitle(false);
      setIsTransitioning(false);
      return;
    }

    // Di akhir intro, clipPath = WAVE_FULL & yPercent = 0
    // Di outro: mulai dari shape itu (relatif "datar"), lalu cekungnya diperdalam (→ WAVE_OUT_CURVE)
    // sambil bergerak turun.
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        animatingRef.current = false;
        setOverlayVisible(false);
        setTitle("");
        setIsTransitioning(false);
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        }
      },
    });

    tl.call(() => setShowTitle(false), undefined, 0);
    tl.to({}, { duration: TITLE_EXIT_DURATION }, 0);

    // Pastikan start di posisi akhir intro
    tl.set(
      wipe,
      {
        yPercent: 0,
        opacity: 1,
      },
      ">",
    );

    // 1) Bentuk pelan2 jadi lebih cekung (FULL → OUT_CURVE)
    tl.to(
      wipe,
      {
        clipPath: WAVE_OUT_CURVE,
        webkitClipPath: WAVE_OUT_CURVE,
        duration: 0.55,
        ease: "power2.inOut",
      },
      "<"
    );

    // 2) Sambil geser turun keluar layar
    tl.to(
      wipe,
      {
        yPercent: 110,
        duration: WIPE_SLIDE_DURATION,
      },
      "<" // jalan bareng
    );
  }, []);

  // INTRO: pembuka wipe (saat wave nutup layar sebelum ganti route)
  const closeWipe = useCallback(
    (targetPath: string) => {
      const wipe = wipeRef.current;
      const normalizedTarget = normalizePath(targetPath);

      if (!wipe) {
        setPendingPath(normalizedTarget);
        pushWithHashAwareScroll(targetPath);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          setPendingPath(normalizedTarget);
          pushWithHashAwareScroll(targetPath);
        },
      });

      if (overlayRef.current) {
        gsap.set(overlayRef.current, { pointerEvents: "auto" });
      }

      gsap.set(wipe, {
        clipPath: WAVE_START,
        webkitClipPath: WAVE_START,
        yPercent: -110,
      });

      gsap.set(wipe, { opacity: 1 });

      tl.call(() => setShowTitle(false), undefined, 0);

      // Intro: START -> PEAK -> FULL (akhirnya belum terlalu cekung)
      tl.to(wipe, { keyframes: WIPE_IN_KEYFRAMES });

      // Sambil turun dari atas sampai full nutup
      tl.to(
        wipe,
        { yPercent: 0, duration: WIPE_SLIDE_DURATION, ease: "power3.inOut" },
        0
      );

      tl.add(() => setShowTitle(true));
      tl.to({}, { duration: TITLE_HOLD_DURATION });
      tl.to(wipe, { opacity: 1, duration: 0.12, overwrite: "auto" }, 0);
      tl.to({}, { duration: 0.12 });
    },
    [normalizePath, pushWithHashAwareScroll]
  );

  const navigate = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (!href || animatingRef.current) return;

      const target = href.toString();
      const normalizedTarget = normalizePath(target);

      if (normalizedTarget === pathname) return;

      rememberScrollPosition();

      if (options?.disableCurtain) {
        pushWithHashAwareScroll(target);
        return;
      }

      animatingRef.current = true;
      setIsTransitioning(true);
      setTitle((options?.label ?? formatLabel(target)).toUpperCase());
      setOverlayVisible(true);
      setShowTitle(false);
      closeWipe(target);
    },
    [closeWipe, normalizePath, pathname, pushWithHashAwareScroll, rememberScrollPosition]
  );

  useEffect(() => {
    if (!pendingPath) return;
    if (pathname === pendingPath) {
      setPendingPath(null);
      openWipe();
    }
  }, [openWipe, pathname, pendingPath]);

  const value = useMemo<TransitionContextValue>(
    () => ({
      navigate,
      isTransitioning,
    }),
    [navigate, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {isClient && (
        <div
          ref={overlayRef}
          className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
          aria-hidden="true"
          style={{ visibility: isOverlayVisible ? "visible" : "hidden" }}
        >
          <div
            ref={wipeRef}
            className="absolute inset-0 bg-charcoal pointer-events-none"
            style={{
              willChange: "clip-path, -webkit-clip-path, transform",
            }}
          />
          <AnimatePresence>
            {isOverlayVisible && showTitle && (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 px-6 text-center font-display text-3xl sm:text-4xl md:text-6xl tracking-[0.4em] text-cream"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

export default PageTransitionProvider;
