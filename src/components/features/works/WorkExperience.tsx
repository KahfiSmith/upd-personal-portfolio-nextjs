import { dataWorkExperience } from "@/data/work-experience";
import { Calendar } from "lucide-react";

export default function WorkExperience() {
  const works = dataWorkExperience;
  return (
    <section
      id="experience-section"
      className="relative my-12 md:my-20 lg:my-32 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        ></div>
      </div>

      <div className="max-w-[96rem] mx-auto px-6 md:px-8 lg:px-12">
        {/* Removed stray style tag */}
        <div className="mb-4 lg:mb-8" data-reveal="right">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-charcoal font-medium leading-tight">
            <span className="bg-gradient-to-r from-cyan-600 to-black bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
        </div>

        <div className="divide-y-2 divide-charcoal" id="work-grid">
          {works.map((w, index) => (
            <article key={w.id}
              className="group relative py-6 md:py-8"
              data-reveal="up"
              data-reveal-delay={String(Math.min(index * 0.08, 0.4))}
              data-work-id={w.id}
              data-index={index}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="space-y-3">
                    <h3 className="work-title text-2xl md:text-3xl font-display font-bold text-charcoal">
                      {w.title}
                    </h3>
                    <div className="space-y-1 text-base md:text-lg text-charcoal/60">
                      <p className="work-role font-semibold text-charcoal/80">
                        {w.role}
                      </p>
                      <p className="work-company">{w.company}</p>
                      <p className="work-period text-sm flex space-x-3 items-center">
                        <Calendar className="inline-block mr-2 h-4 w-4 text-charcoal/60" />
                        {w.period}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  {(() => {
                    const descriptions: string[] = Array.isArray(w.description)
                      ? w.description
                      : [w.description];
                    return (
                      <ul className="work-description list-disc pl-5 text-charcoal/70 text-base md:text-lg leading-relaxed space-y-1">
                        {descriptions.map((item, i) => (
                          <li key={`${w.id}-desc-${i}`}>{item}</li>
                        ))}
                      </ul>
                    );
                  })()}

                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const tags: string[] = Array.isArray(w.tags) ? w.tags : [w.tags];
                      return tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={`${w.id}-tag-${tagIndex}`}
                          className="work-tag inline-flex items-center px-3 py-1.5 bg-charcoal text-cream text-sm md:text-base font-medium rounded-lg border border-transparent"
                          data-tag-index={tagIndex}
                        >
                          {tag}
                        </span>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
