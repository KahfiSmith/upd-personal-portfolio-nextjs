"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Icon = { src: string; alt: string };

type Props = {
  icons: Icon[];
  duration?: number;
  reverse?: boolean;
  keepUpright?: boolean;
  orbitRatio?: number;
};

export default function TechOrbit({
  icons,
  duration = 24,
  reverse = false,
  keepUpright = false,
  orbitRatio = 0.7,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const angles = useMemo(() => {
    const n = Math.max(1, icons.length);
    return Array.from({ length: n }, (_, i) => (i * 360) / n);
  }, [icons.length]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const r = Math.max(
        32,
        (Math.min(rect.width, rect.height) / 2) * orbitRatio
      );
      setRadius(r);
      setReady(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [orbitRatio]);

  useEffect(() => {
    if (!ready) return;
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
            const items = track.querySelectorAll<HTMLElement>(
              "[data-orbit-arm] [data-icon-inner]"
            );
            items.forEach((node) => {
              const angAttr = (node as HTMLElement).dataset.angle;
              const ang = angAttr ? Number(angAttr) : 0;
              (node as HTMLElement).style.transform = `rotate(${
                -rot - ang
              }deg)`;
            });
          }
        : undefined,
    });

    return () => {
      tween.kill();
    };
  }, [duration, reverse, keepUpright, ready]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-80 h-80 md:w-96 md:h-96 overflow-visible"
    >
      <div
        ref={trackRef}
        className="absolute"
        data-orbit-track
        style={{
          opacity: ready ? 1 : 0,
          willChange: ready ? "transform" : undefined,
        }}
      >
        {icons.map((icon, idx) => {
          const angle = angles[idx] ?? 0;
          return (
            <div
              key={`${icon.alt}-${idx}`}
              data-orbit-arm
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${
                  radius ?? 0
                }px)`,
              }}
            >
              <div data-icon-inner data-angle={angle}>
                <div className="w-16 h-16 rounded-full bg-charcoal border border-charcoal/10 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <Image src={icon.src} alt={icon.alt} width={40} height={40} className="w-10 h-10" priority />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
