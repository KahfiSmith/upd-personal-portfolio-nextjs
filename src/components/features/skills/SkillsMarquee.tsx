"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { dataSkills } from "@/data/skills";

export default function SkillsMarquee() {
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const followScroll = true; // couple direction to scroll; rows remain opposite
    const row1 = row1Ref.current as HTMLElement | null;
    const row2 = row2Ref.current as HTMLElement | null;
    if (!row1 || !row2) return;

    const DATA_KEY = "marqueeOriginal";

    function prepareRow(row: HTMLElement, viewport: number): number {
      if (!row) return 0;
      if (!(row as any).dataset[DATA_KEY]) {
        (row as any).dataset[DATA_KEY] = row.innerHTML;
      }
      const baseHtml = String((row as any).dataset[DATA_KEY] || "");
      if (!baseHtml.trim()) return 0;

      // Measure a single sequence
      const measurer = document.createElement(row.tagName.toLowerCase());
      measurer.className = row.className;
      measurer.style.position = "absolute";
      measurer.style.left = "-99999px";
      measurer.style.top = "-99999px";
      measurer.style.visibility = "hidden";
      measurer.style.whiteSpace = "nowrap";
      measurer.innerHTML = baseHtml;
      document.body.appendChild(measurer);
      const sequenceWidth = measurer.scrollWidth || 0;
      document.body.removeChild(measurer);

      if (!sequenceWidth) return 0;

      // Create one group wide enough to cover viewport, then duplicate it once (two groups)
      const repeats = Math.max(1, Math.ceil(viewport / sequenceWidth) + 1);
      const groupHtml = baseHtml.repeat(repeats);
      const desiredHtml = groupHtml + groupHtml; // two identical groups
      if (row.innerHTML !== desiredHtml) row.innerHTML = desiredHtml;
      return sequenceWidth * repeats; // width of one group
    }

    const waitForImages = async (el: HTMLElement) => {
      const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          // @ts-ignore
          if (img.decode) return img.decode().catch(() => {});
          return new Promise<void>((res) => {
            img.addEventListener('load', () => res(), { once: true });
            img.addEventListener('error', () => res(), { once: true });
          });
        })
      );
    };

    let w1 = prepareRow(row1, window.innerWidth);
    let w2 = prepareRow(row2, window.innerWidth);
    (async () => {
      await waitForImages(row1);
      await waitForImages(row2);
      w1 = prepareRow(row1, window.innerWidth);
      w2 = prepareRow(row2, window.innerWidth);
    })();

    row1.style.willChange = "transform";
    row2.style.willChange = "transform";
    try { gsap.ticker.fps(60); } catch {}

    // Direction state (used only when followScroll = true)
    let dirTarget = 1; // 1 = down, -1 = up
    let dirSmooth1 = 1; // top row smoothing
    let dirSmooth2 = 1; // bottom row smoothing (slower for a parallax feel)
    let phase1 = 0; // [0, w1)
    let phase2 = 0; // [0, w2)
    let lastTime = performance.now();
    let speed1 = 200; // px/s (top faster)
    let speed2 = 200; // px/s (bottom slower)
    let initialPhaseApplied = false;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(0.001, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;

      // Smooth direction change (only when following scroll)
      if (followScroll) {
        dirSmooth1 += (dirTarget - dirSmooth1) * 0.14; // a bit snappier on top
        dirSmooth2 += (dirTarget - dirSmooth2) * 0.08; // more inertia on bottom
      }

      // Ensure widths (half the total since two groups)
      if (!w1) w1 = (row1.scrollWidth || 0) / 2;
      if (!w2) w2 = (row2.scrollWidth || 0) / 2;
      if (!w1 || !w2) return;

      // Apply an initial phase offset between rows once widths are known
      if (!initialPhaseApplied) {
        phase1 = 0;
        phase2 = (w2 * 0.33) % w2; // offset bottom by ~1/3 loop
        initialPhaseApplied = true;
      }

      // Signed steps, modulo wrapped
      // Make BOTH rows move left (right->left) by default, and both reverse together with scroll
      // Top: x1 = -phase1, so positive step => left
      // Bottom: x2 = phase2 - w2, so NEGATIVE step => left
      const step1 = (followScroll ?  dirSmooth1 :  1) * speed1 * dt;  // left on positive
      const step2 = (followScroll ? -dirSmooth2 : -1) * speed2 * dt;  // left on positive overall
      phase1 = ((phase1 + step1) % w1 + w1) % w1;
      phase2 = ((phase2 + step2) % w2 + w2) % w2;

      const x1 = -phase1;
      const x2 = phase2 - w2;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const roundPx = (v: number) => Math.round(v * dpr) / dpr;

      gsap.set(row1, { x: roundPx(x1), force3D: true });
      gsap.set(row2, { x: roundPx(x2), force3D: true });
    };

    gsap.ticker.add(tick);

    // Direction by scroll/wheel/touch (optional)
    let lastY = window.pageYOffset;
    const onScroll = () => {
      const y = window.pageYOffset;
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) < 2) return;
      dirTarget = dy > 0 ? 1 : -1;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 2) return;
      dirTarget = e.deltaY > 0 ? 1 : -1;
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0]?.clientY ?? 0; };
    const onTouchMove = (e: TouchEvent) => {
      const cy = e.touches[0]?.clientY ?? 0;
      const dy = cy - touchStartY;
      if (Math.abs(dy) < 2) return;
      dirTarget = dy < 0 ? 1 : -1;
    };
    if (followScroll) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("wheel", onWheel as any, { passive: true });
      window.addEventListener("touchstart", onTouchStart as any, { passive: true });
      window.addEventListener("touchmove", onTouchMove as any, { passive: true });
    }

    // Resize handling + content-width observer to keep loop seamless
    let resizeRaf = 0 as unknown as number;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(async () => {
        const imgs = [...row1.querySelectorAll('img'), ...row2.querySelectorAll('img')] as HTMLImageElement[];
        await Promise.all(imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
        const prevW1 = w1 || 1;
        const prevW2 = w2 || 1;
        w1 = prepareRow(row1, window.innerWidth);
        w2 = prepareRow(row2, window.innerWidth);
        if (w1) {
          const frac = (phase1 / prevW1) || 0;
          phase1 = (frac * w1) % w1;
        }
        if (w2) {
          const frac = (phase2 / prevW2) || 0;
          phase2 = (frac * w2) % w2;
        }
        resizeRaf = 0 as unknown as number;
      }) as unknown as number;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Observe intrinsic width changes (e.g., late image/font load) and retune phase to avoid jumps
    const ro1 = new ResizeObserver(() => {
      const half = (row1.scrollWidth || 0) / 2;
      if (!half) return;
      if (!w1) { w1 = half; return; }
      if (Math.abs(half - w1) > 0.5) {
        const frac = (phase1 / w1) || 0;
        w1 = half;
        phase1 = (frac * w1) % w1;
      }
    });
    const ro2 = new ResizeObserver(() => {
      const half = (row2.scrollWidth || 0) / 2;
      if (!half) return;
      if (!w2) { w2 = half; return; }
      if (Math.abs(half - w2) > 0.5) {
        const frac = (phase2 / w2) || 0;
        w2 = half;
        phase2 = (frac * w2) % w2;
      }
    });
    try { ro1.observe(row1); ro2.observe(row2); } catch {}

    return () => {
      try { gsap.ticker.remove(tick); } catch {}
      if (followScroll) {
        window.removeEventListener("scroll", onScroll as any);
        window.removeEventListener("wheel", onWheel as any);
        window.removeEventListener("touchstart", onTouchStart as any);
        window.removeEventListener("touchmove", onTouchMove as any);
      }
      window.removeEventListener("resize", onResize as any);
      try { ro1.disconnect(); ro2.disconnect(); } catch {}
    };
  }, []);

  return (
    <section className="my-12 md:my-20 relative overflow-x-hidden overflow-y-visible" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="relative py-16">
        {/* Top row (moves left by default) */}
        <div className="w-full max-w-none bg-charcoal text-cream px-6 py-10 md:px-10 md:py-14 overflow-x-hidden overflow-y-visible shadow-lg ring-1 ring-white/10 -rotate-6 origin-center relative z-20 mb-8" style={{ width: 'calc(100% + 16rem)', marginLeft: '-8rem' }}>
          <div className="relative select-none overflow-x-hidden overflow-y-visible">
            <div ref={row1Ref} data-skills-row="1" className="flex gap-8 whitespace-nowrap will-change-transform py-4">
              {dataSkills.map((s, i) => (
                <img
                  key={`row1-${s.label}-${i}`}
                  src={s.imgSrc}
                  alt={s.label}
                  className="shrink-0 w-12 h-12 md:w-14 md:h-14 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row (moves right by default) */}
        <div className="w-full bg-charcoal text-cream px-6 py-8 md:px-10 md:py-12 overflow-x-hidden shadow-lg ring-1 ring-white/10 relative z-10 -mt-6">
          <div className="relative select-none overflow-x-hidden">
            <div ref={row2Ref} data-skills-row="2" className="flex gap-8 whitespace-nowrap will-change-transform py-4">
              {dataSkills.map((s, i) => (
                <img
                  key={`row2-${s.label}-${i}`}
                  src={s.imgSrc}
                  alt={s.label}
                  className="shrink-0 w-12 h-12 md:w-14 md:h-14 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
