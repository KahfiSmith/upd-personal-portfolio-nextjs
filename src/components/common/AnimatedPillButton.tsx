"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

type AnimatedPillButtonProps = {
  label: string;
  href?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function AnimatedPillButton({
  label,
  href,
  className = "",
  ...rest
}: AnimatedPillButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    const tl = gsap.timeline({ paused: true });
    tl.to(bg, { clipPath: CLIP_END, webkitClipPath: CLIP_END as any, duration: 0.8, ease: "power3.out" }, 0)
      .to(labelEl, { color: "#F5F3EE", duration: 0.45, ease: "power2.out" }, 0.12);

    const onEnter = () => {
      tl.timeScale(0.8).play(0);
    };
    const onLeave = () => {
      tl.timeScale(0.8).reverse();
    };
    const onMouseDown = () => {
      if (!ripple) return;
      gsap.fromTo(
        ripple,
        { opacity: 0.2, scale: 0.95 },
        { opacity: 0, scale: 1.1, duration: 0.4, ease: "power2.out" }
      );
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onMouseDown);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onMouseDown);
      tl.kill();
    };
  }, []);

  const MotionRoot: any = href ? motion.a : motion.div;

  return (
    <MotionRoot
      ref={containerRef as any}
      href={href as any}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden bg-white border-2 border-charcoal/50 hover:ring-3 hover:ring-charcoal/80 transition-shadow duration-500 ${className}`}
      {...rest}
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

