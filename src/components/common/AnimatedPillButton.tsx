"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

type DivVariantProps = React.HTMLAttributes<HTMLDivElement> & { href?: undefined };
type AnchorVariantProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type AnimatedPillButtonProps = {
  label: string;
  className?: string;
} & (DivVariantProps | AnchorVariantProps);

export default function AnimatedPillButton({
  label,
  className = "",
  href,
  ...rest
}: AnimatedPillButtonProps) {
  const containerRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const bg = el.querySelector<HTMLElement>("[data-circle-bg]");
    const ripple = el.querySelector<HTMLElement>("[data-ripple]");
    const labelEl = el.querySelector<HTMLElement>("[data-label]");

    if (!bg || !labelEl) return;

    const CLIP_START = "inset(0% 100% 0% 0% round 999px)";
    const CLIP_END = "inset(0% 0% 0% 0% round 999px)";

    gsap.set(bg, {
      backgroundColor: "#0a0a0a",
      willChange: "clip-path",
      clipPath: CLIP_START,
      webkitClipPath: CLIP_START as any,
    });
    gsap.set(ripple, { opacity: 0, scale: 1 });

    const tl = gsap.timeline({ paused: true, smoothChildTiming: true });
    tl.to(bg, { clipPath: CLIP_END, webkitClipPath: CLIP_END as any, duration: 0.8, ease: "power3.out" }, 0)
      .to(labelEl, { color: "#F5F3EE", duration: 0.45, ease: "power2.out" }, 0.12);

    // Control tween to animate timeline progress for smooth, interruptible transitions
    let ctrl: gsap.core.Tween | null = null;
    const tweenProgress = (to: number, duration: number, ease: string) => {
      if (ctrl) ctrl.kill();
      ctrl = gsap.to(tl, { progress: to, duration, ease, overwrite: true });
    };
    const onEnter = () => {
      const p = tl.progress();
      // Durasi dinamis berdasar sisa progress supaya terasa menerus, bukan restart
      const base = 0.8; // semula total fill 0.8s
      const dur = Math.max(0.06, (1 - p) * base);
      tweenProgress(1, dur, "none");
    };
    const onLeave = () => {
      const p = tl.progress();
      // Perlambat keluar supaya transisi tidak terasa terlalu cepat
      const base = 0.5;
      const dur = Math.max(0.08, p * base);
      tweenProgress(0, dur, "none");
    };
    const onPointerDown = () => {
      if (!ripple) return;
      gsap.fromTo(
        ripple,
        { opacity: 0.2, scale: 0.95 },
        { opacity: 0, scale: 1.1, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );
    };

    el.addEventListener("pointerenter", onEnter as any);
    el.addEventListener("pointerleave", onLeave as any);
    el.addEventListener("pointerdown", onPointerDown as any);

    return () => {
      if (ctrl) ctrl.kill();
      el.removeEventListener("pointerenter", onEnter as any);
      el.removeEventListener("pointerleave", onLeave as any);
      el.removeEventListener("pointerdown", onPointerDown as any);
      tl.kill();
    };
  }, []);

  const MotionRoot: any = href ? motion.a : motion.div;
  const isLink = typeof href === "string";
  const elementProps = isLink
    ? { ...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>), href }
    : (rest as React.HTMLAttributes<HTMLDivElement>);

  return (
    <MotionRoot
      ref={containerRef as any}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden bg-transparent border-2 border-charcoal/50 hover:ring-3 hover:ring-charcoal/80 transition-shadow duration-500 ${className}`}
      {...elementProps}
    >
      <div data-circle-bg className="absolute -inset-px rounded-[999px] will-change-transform z-0" />
      <div className="relative z-10 flex items-center gap-2">
        <span data-label className="text-sm md:text-base font-medium text-charcoal/60 font-sans whitespace-nowrap">
          {label}
        </span>
      </div>
      <div data-ripple className="absolute inset-0 rounded-full border-2 border-charcoal/50 scale-100 opacity-0" />
    </MotionRoot>
  );
}

