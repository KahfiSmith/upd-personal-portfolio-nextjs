"use client";

import { type CSSProperties } from "react";
import { dataSkills } from "@/data/skills";

const duplicatedSkills = [...dataSkills, ...dataSkills];

type RowConfig = {
  reverse?: boolean;
  duration: number;
  wrapperClassName?: string;
};

const MarqueeRow = ({ reverse, duration, wrapperClassName }: RowConfig) => {
  const trackStyles = {
    "--skills-marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div className={`relative select-none overflow-hidden ${wrapperClassName ?? ""}`}>
      <div
        className={`skills-marquee-track ${reverse ? "skills-marquee-track--reverse" : ""}`}
        style={trackStyles}
      >
        {[0, 1].map((clone) => (
          <div key={clone} className="skills-marquee-group" aria-hidden={clone > 0}>
            {duplicatedSkills.map((skill, index) => (
              <img
                key={`${skill.label}-${clone}-${index}`}
                src={skill.imgSrc}
                alt={skill.label}
                loading="lazy"
                className="skills-marquee-item"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SkillsMarque() {
  return (
    <section className="my-12 md:my-20 relative overflow-x-hidden overflow-y-visible pt-16 md:pt-24">
      <div className="relative py-16 md:py-20 overflow-visible">
        <div
          className="w-full max-w-none bg-charcoal text-cream px-6 py-8 md:px-10 md:py-12 overflow-x-hidden overflow-y-visible shadow-lg ring-1 ring-white/10 -rotate-6 origin-center relative z-20 mb-8 translate-y-2 md:translate-y-3"
          style={{ width: "calc(100% + 16rem)", marginLeft: "-8rem" }}
        >
          <MarqueeRow duration={28} wrapperClassName="overflow-visible py-4" />
        </div>

        <div className="w-full bg-charcoal text-cream px-6 py-8 md:px-10 md:py-12 overflow-x-hidden shadow-lg ring-1 ring-white/10 relative z-10 -mt-6">
          <MarqueeRow duration={34} reverse wrapperClassName="py-4" />
        </div>
      </div>
    </section>
  );
}
