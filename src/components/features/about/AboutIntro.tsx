"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedPillButton from "@/components/common/AnimatedPillButton";

export default function AboutIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      const nodes = sectionEl.querySelectorAll<HTMLElement>("[data-animate]");
      nodes.forEach((node) => {
        const type = node.getAttribute("data-animate");
        const delay = parseFloat(node.getAttribute("data-delay") || "0") || 0;

        const fromVars: gsap.TweenVars = { opacity: 0 };
        if (type === "fade-up") fromVars.y = 32;
        if (type === "fade-down") fromVars.y = -32;
        if (type === "fade-left") fromVars.x = 32;
        if (type === "fade-right") fromVars.x = -32;

        gsap.fromTo(
          node,
          { ...fromVars, willChange: "transform, opacity" },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.8,
            delay,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-anchor-offset="30"
      className="relative my-12 md:my-20 overflow-hidden min-h-screen flex items-center"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="absolute top-3/4 right-1/3 w-24 h-24 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rotate-45 blur-lg"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 opacity-8">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-md"></div>
        </div>
      </div>

      <div className="max-w-[96rem] mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5" data-animate="fade-right">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="font-display text-charcoal leading-[0.9] font-medium text-left">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  More than just
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium bg-gradient-to-r from-black via-cyan-600 to-black bg-clip-text text-transparent mt-1 lg:mt-2">
                  Code & Coffee
                </span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 text-left lg:pt-0">
            <div
              data-animate="fade-up"
              data-delay="0.1"
              className="mb-4 lg:mb-6"
            >
              <p className="text-charcoal/80 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
                Behind every line of code is a story of curiosity, creativity,
                and countless cups of coffee. Dive deeper into my journey,
                passions, and the philosophy that drives my work. I believe
                great software is born from the intersection of technical
                excellence and human-centered design. My approach combines
                meticulous attention to detail with a passion for creating
                delightful user experiences. From user research sessions to
                late-night prototyping, I obsess over understanding the nuance
                behind every interaction so that interfaces feel expressive,
                inclusive, and effortless. I treat every challenge as a chance
                to learn and leave the experience better than I found it.
              </p>
            </div>

            <div
              data-animate="fade-up"
              data-delay="0.2"
              className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-10 lg:mb-12"
            >
              <div className="space-y-3">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal font-display">
                  1+
                </div>
                <p className="text-sm md:text-base text-charcoal/60 font-medium">
                  Years Experience
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal font-display">
                  8+
                </div>
                <p className="text-sm md:text-base text-charcoal/60 font-medium">
                  Projects Completed
                </p>
              </div>
              <div className="space-y-3 col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal font-display">
                  ∞
                </div>
                <p className="text-sm md:text-base text-charcoal/60 font-medium">
                  Cups of Coffee
                </p>
              </div>
            </div>

            <div data-animate="fade-up" data-delay="0.4" className="mb-12">
              <AnimatedPillButton
                href="/about"
                data-discover-button
                data-magnetic
                label="Discover my story"
                className="inline-flex"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
