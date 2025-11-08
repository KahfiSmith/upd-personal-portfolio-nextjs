"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPageEnhancer() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.getElementById("about-page") || document;
    const hoverCleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // Reveal animations for elements with data-animate
      const nodes = root.querySelectorAll<HTMLElement>("[data-animate]");
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

      // Title underline removed per request; no animation attached

      // Hover animations for What Drives Me items
      const items = root.querySelectorAll<HTMLElement>(".drives-item");
      items.forEach((item) => {
        const numberGradient = item.querySelector<HTMLElement>(".drives-number-gradient");
        const underline = item.querySelector<HTMLElement>(".drives-underline");
        const divider = item.querySelector<HTMLElement>(".drives-divider");
        const title = item.querySelector<HTMLElement>(".drives-title");
        const desc = item.querySelector<HTMLElement>(".drives-description");

        // Initial states
        if (underline) {
          const origin = underline.classList.contains("ml-auto") ? "right" : "left";
          gsap.set(underline, { scaleX: 0, transformOrigin: `${origin} center` });
        }
        if (numberGradient) gsap.set(numberGradient, { opacity: 0 });
        if (divider) gsap.set(divider, { scaleY: 1, transformOrigin: "center" });

        const tl = gsap.timeline({ paused: true });
        if (underline) tl.to(underline, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0);
        if (numberGradient) tl.to(numberGradient, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
        if (divider) tl.to(divider, { scaleY: 1.15, duration: 0.35, ease: "power2.out" }, 0);
        if (title) tl.to(title, { color: "#0a0a0a", duration: 0.35, ease: "power2.out" }, 0);
        if (desc) tl.to(desc, { color: "rgba(10,10,10,0.9)", y: -2, duration: 0.4, ease: "power2.out" }, 0);

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
          tl.kill();
        });
      });
    }, root);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return null;
}
