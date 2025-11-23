'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const ANIMATION_DURATION = 2200; // ms the progress bar should take to reach 100%
const CURTAIN_SLIDE_DURATION = 1100; // ms for the top/bottom panels to move away
const CURTAIN_REVEAL_DELAY = 250; // ms pause at 100% before the curtain opens
const HIDE_DELAY = 500; // ms to keep the overlay mounted once the fade out starts

export default function SimpleCurtainLoader() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const revealStartedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    timers.push(setTimeout(() => setStage(1), 100));
    timers.push(setTimeout(() => setStage(2), 650));
    timers.push(setTimeout(() => setStage(3), 1100));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!isVisible || stage < 3) return undefined;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const linearProgress = Math.min(1, elapsed / ANIMATION_DURATION);
      const nextProgress = Math.floor(linearProgress * 100);
      setProgress(nextProgress);

      if (linearProgress < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVisible, stage]);

  useEffect(() => {
    if (!isVisible || stage < 3 || progress < 100 || revealStartedRef.current) return undefined;

    revealStartedRef.current = true;

    revealTimeoutRef.current = setTimeout(() => {
      setIsCurtainOpen(true);

      hideTimeoutRef.current = setTimeout(
        () => setIsVisible(false),
        CURTAIN_SLIDE_DURATION + HIDE_DELAY,
      );
    }, CURTAIN_REVEAL_DELAY);

    return () => {
      if (revealTimeoutRef.current !== null) clearTimeout(revealTimeoutRef.current);
      if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
    };
  }, [progress, isVisible, stage]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (revealTimeoutRef.current !== null) clearTimeout(revealTimeoutRef.current);
      if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="simple-curtain-loader"
      className={clsx(
        'fixed inset-0 z-[9999] overflow-hidden transition-colors duration-700 ease-in-out opacity-100',
        isCurtainOpen ? 'bg-transparent pointer-events-none' : 'bg-[#0b0b0b]',
      )}
    >
      <div
      className={clsx(
        'curtain-top absolute top-0 left-0 z-10 h-1/2 w-full bg-neutral-950 transition-transform duration-[1100ms] ease-in-out will-change-transform',
        isCurtainOpen ? '-translate-y-full' : 'translate-y-0',
      )}
    />
      <div className="curtain-divider absolute left-0 top-1/2 z-10 h-px w-full bg-white/10" />
      <div
      className={clsx(
        'curtain-bottom absolute bottom-0 left-0 z-10 h-1/2 w-full bg-neutral-950 transition-transform duration-[1100ms] ease-in-out will-change-transform',
        isCurtainOpen ? 'translate-y-full' : 'translate-y-0',
      )}
    />

      <div
        className={clsx(
          'loader-center absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 ease-out',
          isCurtainOpen ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="text-center">
          <div className="brand-container">
            <h1
              className={clsx(
                'brand-name mb-6 text-5xl font-semibold tracking-wider text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-700 ease-out md:text-7xl lg:text-8xl',
                stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{
                fontFamily: 'var(--font-playfair)',
              }}
            >
              Kahfi Smith
            </h1>

            <p
              className={clsx(
                'brand-subtitle text-base font-light uppercase tracking-[0.3em] text-neutral-300 transition-all duration-700 ease-out md:text-xl',
                stage >= 2 ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4',
              )}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              Portfolio
            </p>

            <div
              className={clsx(
                'progress-container mt-10 transition-opacity duration-700 ease-out md:mt-12',
                stage >= 3 ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="progress-bar-container mx-auto mb-4 h-1 w-64 rounded-full bg-neutral-700/30">
                <div
                  className="progress-bar h-full rounded-full bg-white transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="progress-text font-mono text-lg tracking-wider text-white">
                <span className="progress-number tabular-nums">{progress}</span>%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decorative-bg absolute inset-0 z-0">
        <div
          className="grid-pattern absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="floating-orb absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl" />
      </div>
    </div>
  );
}
