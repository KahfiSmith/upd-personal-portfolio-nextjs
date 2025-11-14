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

const WAVE_START = "ellipse(130% 0% at 50% 0%)";
const WAVE_PEAK = "ellipse(145% 60% at 50% 20%)";
const WAVE_FULL = "ellipse(165% 130% at 50% 75%)";
const WAVE_OVERFLOW = "ellipse(210% 240% at 50% 115%)";

const formatLabel = (href: string) => {
  const withoutQuery = href.replace(/[?#].*$/, "");
  if (!withoutQuery || withoutQuery === "/") return "Home";
  const segments = withoutQuery.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "Page";
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Faster wipe timings to keep the intro/outro responsive.
const WIPE_IN_KEYFRAMES = [
  { clipPath: WAVE_PEAK, webkitClipPath: WAVE_PEAK, duration: 0.55 },
  { clipPath: WAVE_FULL, webkitClipPath: WAVE_FULL, duration: 0.65 },
  { clipPath: WAVE_OVERFLOW, webkitClipPath: WAVE_OVERFLOW, duration: 0.35 },
];

const WIPE_OUT_KEYFRAMES = [
  { clipPath: WAVE_FULL, webkitClipPath: WAVE_FULL, duration: 0.5 },
  { clipPath: WAVE_PEAK, webkitClipPath: WAVE_PEAK, duration: 0.45 },
  { clipPath: WAVE_START, webkitClipPath: WAVE_START, duration: 0.4 },
];

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
    gsap.set(wipe, {
      clipPath: WAVE_OVERFLOW,
      webkitClipPath: WAVE_OVERFLOW,
      opacity: 1,
    });
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
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
    tl.to(wipe, { keyframes: WIPE_OUT_KEYFRAMES });
  }, []);

  const closeWipe = useCallback(
    (targetPath: string) => {
      const wipe = wipeRef.current;
      if (!wipe) {
        router.push(targetPath);
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          setPendingPath(targetPath);
          router.push(targetPath);
        },
      });
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { pointerEvents: "auto" });
      }
      gsap.set(wipe, {
        clipPath: WAVE_START,
        webkitClipPath: WAVE_START,
      });
      gsap.set(wipe, { opacity: 1 });
      tl.call(() => setShowTitle(false), undefined, 0);
      tl.to(wipe, { keyframes: WIPE_IN_KEYFRAMES });
      tl.add(() => setShowTitle(true), 0.45);
      tl.to(wipe, { opacity: 1, duration: 0.12, overwrite: "auto" }, 0);
      tl.to({}, { duration: 0.12 });
    },
    [router]
  );

  const navigate = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (!href || animatingRef.current) return;
      const target = href.toString();
      if (target === pathname) return;
      if (options?.disableCurtain) {
        router.push(target);
        return;
      }
      animatingRef.current = true;
      setIsTransitioning(true);
      setTitle((options?.label ?? formatLabel(target)).toUpperCase());
      setOverlayVisible(true);
      setShowTitle(false);
      closeWipe(target);
    },
    [closeWipe, pathname, router]
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
