"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Icon = { src: string; alt: string };

type Props = {
  icons: Icon[];
  duration?: number; // seconds per full revolution
  reverse?: boolean; // true => rotate counter-clockwise
  keepUpright?: boolean; // keep icons upright during orbit
  orbitRatio?: number; // 0..1 of half-size used as radius
};

export default function TechOrbit({ icons, duration = 24, reverse = false, keepUpright = false, orbitRatio = 0.7 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(120);

  // Compute positions evenly spaced
  const angles = useMemo(() => {
    const n = Math.max(1, icons.length);
    return Array.from({ length: n }, (_, i) => (i * 360) / n);
  }, [icons.length]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const r = Math.max(32, (Math.min(rect.width, rect.height) / 2) * orbitRatio);
      setRadius(r);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    gsap.set(track, { xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
    const tween = gsap.to(track, {
      rotation: reverse ? -360 : 360,
      duration,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
      onUpdate: keepUpright
        ? () => {
            const rot = (gsap.getProperty(track, "rotation") as number) || 0;
            const items = track.querySelectorAll<HTMLElement>("[data-orbit-arm] [data-icon-inner]");
            items.forEach((node) => {
              const angAttr = (node as HTMLElement).dataset.angle;
              const ang = angAttr ? Number(angAttr) : 0;
              (node as HTMLElement).style.transform = `rotate(${-rot - ang}deg)`;
            });
          }
        : undefined,
    });

    return () => {
      tween.kill();
    };
  }, [duration, reverse, keepUpright]);

  return (
    <div ref={wrapRef} className="relative mx-auto w-80 h-80 md:w-96 md:h-96 overflow-visible">
      <div ref={trackRef} className="absolute" data-orbit-track>
        {icons.map((icon, idx) => {
          const angle = angles[idx] ?? 0;
          return (
            <div
              key={`${icon.alt}-${idx}`}
              data-orbit-arm
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px)` }}
            >
              <div data-icon-inner data-angle={angle}
                   style={{ transform: keepUpright ? undefined : undefined }}>
                <div className="w-16 h-16 rounded-full bg-charcoal border border-charcoal/10 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <img src={icon.src} alt={icon.alt} className="w-10 h-10" loading="eager" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
