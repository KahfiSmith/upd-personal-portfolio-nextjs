import { dataSkills } from "@/data/skills";

export default function Skillsmarque() {
  return (
    <section className="my-12 md:my-20 relative overflow-visible">
      <div className="relative py-8">
        <div className="w-[120%] -ml-[10%] bg-charcoal text-cream px-6 py-6 md:px-10 md:py-8 overflow-hidden shadow-lg ring-1 ring-white/10 transform -rotate-6 origin-center relative z-20 mb-4">
          <div className="relative select-none">
            <div
              data-skills-row="1"
              className="flex gap-8 whitespace-nowrap will-change-transform py-2"
            >
              {dataSkills.map((item) => (
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  className="shrink-0 w-12 h-12 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-charcoal text-cream px-6 py-6 md:px-10 md:py-8 overflow-hidden shadow-lg ring-1 ring-white/10 relative z-10 -mt-8">
          <div className="relative select-none">
            <div
              data-skills-row="2"
              className="flex gap-8 whitespace-nowrap will-change-transform py-2"
            >
              {dataSkills.map((item) => (
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  className="shrink-0 w-12 h-12 opacity-90 hover:opacity-100 transition-opacity"
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
