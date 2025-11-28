"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dataSkills } from "@/data/skills";

const duplicatedSkills = [...dataSkills, ...dataSkills];

type ScrollDirection = "up" | "down";

type RowConfig = {
  reverse?: boolean;
  duration: number;
  wrapperClassName?: string;
  scrollDirection: ScrollDirection;
};

const MarqueeRow = ({
  reverse = false,
  duration,
  wrapperClassName,
  scrollDirection,
}: RowConfig) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(1);

  const baseRate = reverse ? -1 : 1;
  const directionMultiplier = scrollDirection === "down" ? 1 : -1;

  useEffect(() => {
    directionRef.current = baseRate * directionMultiplier;
  }, [baseRate, directionMultiplier]);

  useEffect(() => {
    const distance = 50; 
    const durationMs = duration * 1000;
    const shiftPerMs = distance / durationMs;
    let frameId: number;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (!trackRef.current) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      if (lastTime === null) {
        lastTime = time;
        frameId = requestAnimationFrame(animate);
        return;
      }

      const delta = time - lastTime;
      lastTime = time;

      offsetRef.current -= directionRef.current * shiftPerMs * delta;
      while (offsetRef.current <= -distance) {
        offsetRef.current += distance;
      }
      while (offsetRef.current >= 0) {
        offsetRef.current -= distance;
      }

      trackRef.current.style.transform = `translateX(${offsetRef.current}%)`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration]);

  return (
    <div
      className={`relative select-none overflow-hidden ${
        wrapperClassName ?? ""
      }`}
    >
      <div ref={trackRef} className="skills-marquee-track">
        {[0, 1].map((clone) => (
          <div
            key={clone}
            className="skills-marquee-group"
            aria-hidden={clone > 0}
          >
            {duplicatedSkills.map((skill, index) => (
              <Image
                key={`${skill.label}-${clone}-${index}`}
                src={skill.imgSrc}
                alt={skill.label}
                className="skills-marquee-item"
                width={64}
                height={64}
                sizes="64px"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SkillsMarque() {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY === lastScrollY.current) {
        return;
      }

      const nextDirection: ScrollDirection =
        currentY > lastScrollY.current ? "down" : "up";
      setScrollDirection((prev) =>
        prev === nextDirection ? prev : nextDirection
      );
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="my-12 md:my-20 relative overflow-x-hidden overflow-y-visible pt-16 md:pt-24">
      <div className="relative py-12 md:py-16 overflow-visible">
        <div
          className="w-[calc(100%+8rem)] sm:w-[calc(100%+12rem)] md:w-[calc(100%+16rem)] ml-[-4rem] sm:ml-[-6rem] md:ml-[-8rem] max-w-none bg-charcoal text-cream px-5 sm:px-6 md:px-10 py-6 sm:py-7 md:py-10 overflow-x-hidden overflow-y-visible shadow-lg ring-1 ring-white/10 -rotate-2 sm:-rotate-4 md:-rotate-6 origin-center relative z-20 mb-8 translate-y-2 md:translate-y-3"
        >
          <MarqueeRow
            duration={18}
            wrapperClassName="overflow-visible py-4"
            scrollDirection={scrollDirection}
          />
        </div>

        <div className="w-full bg-charcoal text-cream px-5 sm:px-6 md:px-10 py-6 sm:py-7 md:py-10 overflow-x-hidden shadow-lg ring-1 ring-white/10 relative z-10 -mt-6">
          <MarqueeRow
            duration={24}
            reverse
            wrapperClassName="py-4"
            scrollDirection={scrollDirection}
          />
        </div>
      </div>
    </section>
  );
}
