"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { usePageTransition } from "@/hooks";
import { shouldSkipClientNavigation } from "@/lib/utils";

type DivVariantProps = React.HTMLAttributes<HTMLDivElement> & { href?: undefined };
type AnchorVariantProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type VariantProps = DivVariantProps | AnchorVariantProps;

type AnimatedPillButtonProps = {
  label: string;
  className?: string;
} & (DivVariantProps | AnchorVariantProps);

const hasHref = (props: VariantProps): props is AnchorVariantProps =>
  typeof props.href === "string";

export default function AnimatedPillButton(props: AnimatedPillButtonProps) {
  const { label, className = "", ...restProps } = props;
  const variantProps: VariantProps = restProps;
  const containerRef = useRef<HTMLElement | null>(null);
  const setContainerRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);
  const { navigate } = usePageTransition();

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
      webkitClipPath: CLIP_START,
    });
    if (ripple) {
      gsap.set(ripple, { opacity: 0, scale: 1 });
    }

    const tl = gsap.timeline({ paused: true, smoothChildTiming: true });
    tl.to(bg, { clipPath: CLIP_END, webkitClipPath: CLIP_END, duration: 0.8, ease: "power3.out" }, 0)
      .to(labelEl, { color: "#F5F3EE", duration: 0.45, ease: "power2.out" }, 0.12);

    let ctrl: gsap.core.Tween | null = null;
    const tweenProgress = (to: number, duration: number, ease: string) => {
      if (ctrl) ctrl.kill();
      ctrl = gsap.to(tl, { progress: to, duration, ease, overwrite: true });
    };
    const onEnter: EventListener = () => {
      const p = tl.progress();
      const base = 0.8; 
      const dur = Math.max(0.06, (1 - p) * base);
      tweenProgress(1, dur, "none");
    };
    const onLeave: EventListener = () => {
      const p = tl.progress();
      const base = 0.5;
      const dur = Math.max(0.08, p * base);
      tweenProgress(0, dur, "none");
    };
    const onPointerDown: EventListener = () => {
      if (!ripple) return;
      gsap.fromTo(
        ripple,
        { opacity: 0.2, scale: 0.95 },
        { opacity: 0, scale: 1.1, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);

    return () => {
      if (ctrl) ctrl.kill();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      tl.kill();
    };
  }, []);

  const sharedClassName = `relative px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden bg-transparent border-2 border-charcoal/50 hover:ring-3 hover:ring-charcoal/80 transition-shadow duration-500 ${className}`;
  const content = (
    <>
      <div data-circle-bg className="absolute -inset-px rounded-[999px] will-change-transform z-0" />
      <div className="relative z-10 flex items-center gap-2">
        <span data-label className="text-sm md:text-base font-medium text-charcoal/60 font-sans whitespace-nowrap">
          {label}
        </span>
      </div>
      <div data-ripple className="absolute inset-0 rounded-full border-2 border-charcoal/50 scale-100 opacity-0" />
    </>
  );

  if (hasHref(variantProps)) {
    const {
      href,
      onClick,
      target,
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDragCapture,
      onDrop,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onTransitionEnd,
      ...anchorRest
    } = variantProps;
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (shouldSkipClientNavigation(event, target)) return;
      event.preventDefault();
      navigate(href, { label });
    };

    return (
      <motion.a
        ref={setContainerRef}
        whileTap={{ scale: 0.98 }}
        className={sharedClassName}
        {...anchorRest}
        href={href}
        target={target}
        onClick={handleClick}
      >
        {content}
      </motion.a>
    );
  }

  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragCapture,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...divRest
  } = variantProps;

  return (
    <motion.div ref={setContainerRef} whileTap={{ scale: 0.98 }} className={sharedClassName} {...divRest}>
      {content}
    </motion.div>
  );
}
