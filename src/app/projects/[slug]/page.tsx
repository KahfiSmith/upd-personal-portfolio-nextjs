import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { dataProjects } from "@/data/projects";
import { cn } from "@/lib/utils/utils";

const techIconMap: Record<string, string> = {
  astro: "/Icons/astro.svg",
  typescript: "/Icons/typescript.svg",
  tailwindcss: "/Icons/tailwind.svg",
  reactjs: "/Icons/react.svg",
  redux: "/Icons/redux.svg",
  nextjs: "/Icons/nextjs.svg",
  postgresql: "/Icons/postgresql.svg",
  laravel: "/Icons/laravel.svg",
  mysql: "/Icons/mysql.svg",
  nodejs: "/Icons/node.svg",
  javascript: "/Icons/javascript.svg",
  docker: "/Icons/docker.svg",
  figma: "/Icons/figma.svg",
  firebase: "/Icons/firebase.svg",
  vuejs: "/Icons/vue.svg",
  supabase: "/Icons/supabase.svg",
  vitest: "/Icons/vitest.svg",
  zustand: "/Icons/zustand.svg",
  expressjs: "/Icons/express.svg",
  git: "/Icons/git.svg",
  html: "/Icons/html.svg",
  css: "/Icons/css.svg",
  php: "/Icons/php.svg",
  bootstrap: "/Icons/bootstrap.svg",
  framermotion: "/Icons/framermotion.svg",
};

const normalize = (name: string) => name.trim().toLowerCase().replace(/[\s.-]/g, "");

const getTechIcon = (name: string) => {
  const key = normalize(name);
  return techIconMap[key];
};

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return dataProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = dataProjects.find((item) => item.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Case Study`,
    description: project.summary ?? (Array.isArray(project.description) ? project.description[0] : project.description),
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = dataProjects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  const description = Array.isArray(project.description) ? project.description : [project.description];
  const overviewIntro = description[0];
  const overviewDetails = description.slice(1);

  return (
    <main className="relative min-h-screen py-16 md:py-24">
      <div className="max-w-[96rem] mx-auto px-6 md:px-10 space-y-10">
        <BackButton href="/#projects" label="Back to projects" />

        <header className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-charcoal">
              {project.title}
            </h1>
            {project.summary && (
              <p className="text-lg md:text-xl text-charcoal/75 max-w-4xl">{project.summary}</p>
            )}
          </div>
        </header>

        {project.metrics && (
          <section className="grid gap-8 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">{metric.label}</p>
                <p className="text-3xl font-display text-charcoal">{metric.value}</p>
              </div>
            ))}
          </section>
        )}

        {project.heroImage && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" aria-hidden="true" />
            <img
              src={project.heroImage}
              alt={project.title}
              className="relative h-[360px] w-full object-cover md:h-[420px]"
              loading="lazy"
            />
          </div>
        )}

        <section className="space-y-20">
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-charcoal/50">Primary Stack</p>
              <div className="flex flex-wrap gap-4">
                {project.techStack.map((tech) => {
                  const icon = getTechIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-3 rounded-full border border-charcoal bg-white/80 px-5 py-2"
                    >
                      <div className="flex h-10 w-10 items-center justify-center">
                        {icon ? (
                          <img src={icon} alt={tech} className="h-10 w-10" loading="lazy" />
                        ) : (
                          <span className="text-sm font-semibold text-charcoal">{tech.charAt(0)}</span>
                        )}
                        <span className="sr-only">{tech}</span>
                      </div>
                      <span className="text-xl font-semibold text-charcoal/80">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="relative overflow-hidden rounded-lg bg-charcoal text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {project.heroImage && (
              <img
                src={project.heroImage}
                alt={`${project.title} overview`}
                className="absolute inset-0 h-full w-full object-cover opacity-20"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/70 to-cyan-600/30" aria-hidden="true" />
            <div className="relative z-10 space-y-10 p-10 md:p-16">
              <div className="flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-white/60">
                <span>{project.role}</span>
                {project.timeline && <span>{project.timeline}</span>}
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-white/60">Case overview</p>
                <h2 className="font-display text-[clamp(3.2rem,4.5vw,5rem)] leading-[1.02]">
                  What this project is about
                </h2>
              </div>
              <div className="max-w-4xl space-y-5 text-lg md:text-2xl leading-relaxed text-white/85">
                <p>{overviewIntro}</p>
              </div>
              {overviewDetails.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {overviewDetails.map((paragraph, idx) => (
                    <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-base md:text-lg text-white/85 backdrop-blur-sm">
                      {paragraph}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-16">
            {project.sections?.map((section, index) => {
              const isDark = index % 2 === 1;
              const showVisual = Boolean(project.heroImage);
              const visualFirst = index % 2 === 0;
              const content = (
                <div className="space-y-8 p-10 lg:p-12">
                  <div className="space-y-4">
                    <p
                      className={cn(
                        "text-sm uppercase tracking-[0.45em]",
                        isDark ? "text-cream/70" : "text-charcoal/60"
                      )}
                    >
                      {section.title}
                    </p>
                    <h2
                      className={cn(
                        "font-display leading-[1.03]",
                        "text-[clamp(2.75rem,4.4vw,4.5rem)]",
                        isDark ? "text-white" : "text-charcoal"
                      )}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6 text-lg md:text-2xl leading-relaxed">
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {section.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className={cn(
                            "rounded-full px-5 py-2 text-sm font-semibold tracking-wide",
                            isDark ? "bg-white/15 text-white" : "bg-charcoal/5 text-charcoal/80"
                          )}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );

              return (
                <article
                  key={section.title}
                  className={cn(
                    "relative overflow-hidden rounded-lg",
                    isDark ? "bg-charcoal text-white" : "bg-white text-charcoal"
                  )}
                >
                  {showVisual ? (
                    <div
                      className={cn(
                        "flex flex-col lg:grid lg:grid-cols-12",
                        visualFirst ? "" : "lg:flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "lg:col-span-6",
                          visualFirst ? "order-2 lg:order-1" : "order-2"
                        )}
                      >
                        {content}
                      </div>
                      <div
                        className={cn(
                          "relative min-h-[260px] lg:min-h-[360px]",
                          "lg:col-span-6",
                          visualFirst ? "order-1 lg:order-2" : "order-1"
                        )}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-transparent to-purple-500/25"
                          aria-hidden="true"
                        />
                        <img
                          src={project.heroImage}
                          alt={`${project.title} detail`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>{content}</div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
