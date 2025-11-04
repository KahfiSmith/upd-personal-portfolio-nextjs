import { dataProjects } from "@/data/projects";

export default function ProjectsList() {
  const projects = dataProjects;
  return (
    <section
      id="projects-section"
      className="relative my-12 md:my-20 lg:my-32 overflow-hidden bg-cream"
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
        <div className="mb-8 lg:mb-12" data-reveal="right">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-charcoal font-medium leading-tight">
            <span className="bg-gradient-to-r from-black via-cyan-600 to-black bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        <div id="projects-list">
          {projects.map((p, index) => (
            <article key={p.id}
              className="group relative"
              data-reveal="up"
              data-reveal-delay={String(Math.min(index * 0.08, 0.4))}
              data-magnetic-card
            >
              {index === 0 && (
                <div
                  className="pointer-events-none absolute top-0 left-0 w-full h-[2px] bg-charcoal/70 origin-left"
                  data-project-divider-top
                ></div>
              )}
              <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] bg-charcoal/70 origin-left"
                data-project-divider-bottom
              ></div>

              <a
                href={p.link || "#"}
                className="block w-full relative z-10 py-6 md:py-8"
                data-project-card
                data-preview-src={p.previewSrc || ""}
                aria-label={`Open ${p.title}`}
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
                  <div className="md:col-span-6 lg:col-span-6">
                    <h3
                      className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal transition-all duration-300"
                      data-project-title
                    >
                      {p.title}
                    </h3>
                  </div>

                  <div className="md:col-span-6 lg:col-span-6 flex md:justify-end">
                    <div
                      className="text-charcoal/80 text-sm md:text-base font-medium transition-all duration-300"
                      data-project-role
                    >
                      {p.role}
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      <div
        className="mt-16 text-center mb-12"
        data-reveal="up"
        data-reveal-delay="0.2"
      >
        <a
          href="/about"
          data-discover-button
          data-magnetic
          className="relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full bg-cream border-2 border-charcoal/50 hover:ring-3 hover:ring-charcoal/80 text-charcoal/60 overflow-hidden cursor-pointer group transition-all duration-300"
        >
          <div data-circle-bg className="absolute inset-0 rounded-full"></div>
          <div className="relative z-10 flex items-center gap-2">
            <span
              data-button-text
              className="text-sm md:text-base font-medium text-charcoal/60 transition-colors duration-300 font-sans whitespace-nowrap"
            >
              View Full Projects
            </span>
          </div>
          <div
            data-ripple
            className="absolute inset-0 rounded-full border-2 border-charcoal/50 scale-100 opacity-0"
          ></div>
        </a>
      </div>
    </section>
  );
}
