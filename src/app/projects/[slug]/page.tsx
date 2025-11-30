import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { dataProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const techIconMap: Record<string, string> = {
  astro: "/icons/astro.svg",
  typescript: "/icons/typescript.svg",
  tailwindcss: "/icons/tailwind.svg",
  reactjs: "/icons/react.svg",
  redux: "/icons/redux.svg",
  nextjs: "/icons/nextjs.svg",
  postgresql: "/icons/postgresql.svg",
  laravel: "/icons/laravel.svg",
  mysql: "/icons/mysql.svg",
  nodejs: "/icons/node.svg",
  javascript: "/icons/javascript.svg",
  docker: "/icons/docker.svg",
  figma: "/icons/figma.svg",
  firebase: "/icons/firebase.svg",
  vuejs: "/icons/vue.svg",
  supabase: "/icons/supabase.svg",
  vitest: "/icons/vitest.svg",
  zustand: "/icons/zustand.svg",
  cypress: "/icons/cypress.svg",
  expressjs: "/icons/expressjs.svg",
  git: "/icons/git.svg",
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  php: "/icons/php.svg",
  bootstrap: "/icons/bootstrap.svg",
  framermotion: "/icons/framermotion.svg",
  zod: "/icons/zod.svg",
  openaiapi: "/icons/openaiapi.svg",
  alpinejs: "/icons/alpine.svg",
  shadcnui: "/icons/shadcn.svg",
  tanstackquery: "/icons/tanstackquery.svg",
  prisma: "/icons/prisma.svg",
  reactrouterv7: "/icons/reactrouterv7.svg",
};

const normalize = (name: string) => name.trim().toLowerCase().replace(/[\s.-]/g, "");

const getTechIcon = (name: string) => {
  const key = normalize(name);
  return techIconMap[key];
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return dataProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = dataProjects.find((item) => item.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Case Study`,
    description: project.summary ?? (Array.isArray(project.description) ? project.description[0] : project.description),
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = dataProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const description = Array.isArray(project.description) ? project.description : [project.description];
  const overviewIntro = description[0];
  const overviewDetails = description.slice(1);

  return (
    <main className="relative min-h-screen py-12 md:py-20">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 md:px-10 space-y-8 md:space-y-10">
        <BackButton href="/#projects" label="Back to projects" />

        <header className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-[clamp(2.4rem,6vw,3.6rem)] sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-charcoal">
              {project.title}
            </h1>
            {project.summary && (
              <p className="text-base md:text-xl text-charcoal/75 max-w-3xl md:max-w-4xl leading-relaxed">
                {project.summary}
              </p>
            )}
          </div>
        </header>

        {project.metrics && (
          <section className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-charcoal/50">
                  {metric.label}
                </p>
                <p className="text-2xl sm:text-3xl font-display text-charcoal">{metric.value}</p>
              </div>
            ))}
          </section>
        )}

        {project.heroImage && (
          <div className="relative overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" aria-hidden="true" />
            <div className="relative z-0 h-[300px] sm:h-[400px] w-full md:h-[520px]">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </div>
        )}

        <section className="space-y-16">
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-charcoal/50">Primary Stack</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {project.techStack.map((tech) => {
                  const icon = getTechIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-2 sm:gap-3 rounded-full border border-charcoal bg-white/80 px-4 sm:px-5 py-2"
                    >
                      <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center">
                        {icon ? (
                          <Image
                            src={icon}
                            alt={tech}
                            width={36}
                            height={36}
                            className="h-7 w-7 sm:h-9 sm:w-9"
                            sizes="36px"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-charcoal">{tech.charAt(0)}</span>
                        )}
                        <span className="sr-only">{tech}</span>
                      </div>
                      <span className="text-base sm:text-lg font-semibold text-charcoal/80">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="relative overflow-hidden rounded-2xl bg-charcoal text-white shadow-md">
            {project.heroImage && (
              <Image
                src={project.heroImage}
                alt={`${project.title} overview`}
                fill
                className="object-cover opacity-20"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/70 to-cyan-600/30" aria-hidden="true" />
            <div className="relative z-10 space-y-8 md:space-y-10 p-8 sm:p-10 md:p-16">
              <div className="flex flex-wrap gap-2 sm:gap-3 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-white/60">
                <span>{project.role}</span>
                {project.timeline && <span>{project.timeline}</span>}
              </div>
              <div className="space-y-4">
                <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.5em] text-white/60">Case overview</p>
                <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] md:text-[clamp(3.2rem,4.5vw,5rem)] leading-[1.02]">
                  What this project is about
                </h2>
              </div>
              <div className="max-w-4xl space-y-4 sm:space-y-5 text-base sm:text-lg md:text-2xl leading-relaxed text-white/85">
                <p>{overviewIntro}</p>
              </div>
              {overviewDetails.length > 0 && (
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  {overviewDetails.map((paragraph, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base md:text-lg text-white/85 backdrop-blur-sm">
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
              const sectionImage = project.detailImages?.[index] ?? project.heroImage;
              const showVisual = Boolean(sectionImage);
              const visualFirst = index % 2 === 0;
              const content = (
                <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-12">
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
                        "text-[clamp(2.1rem,5vw,3.3rem)] sm:text-[clamp(2.4rem,4.8vw,3.8rem)] lg:text-[clamp(2.75rem,4.4vw,4.5rem)]",
                        isDark ? "text-white" : "text-charcoal"
                      )}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-2xl leading-relaxed">
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {section.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide",
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
                    "relative overflow-hidden rounded-2xl",
                    isDark ? "bg-charcoal text-white" : "bg-white text-charcoal"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-80 z-0",
                      isDark
                        ? "bg-gradient-to-br from-charcoal via-charcoal/90 to-cyan-900/30"
                        : "bg-gradient-to-br from-white via-cream/70 to-cyan-50"
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
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
                            "relative min-h-[220px] sm:min-h-[260px] lg:min-h-[360px]",
                            "lg:col-span-6",
                            visualFirst ? "order-1 lg:order-2" : "order-1"
                          )}
                        >
                          <div
                            className="absolute inset-0 z-10 bg-gradient-to-br from-cyan-500/25 via-transparent to-purple-500/25 pointer-events-none"
                            aria-hidden="true"
                          />
                          {sectionImage && (
                            <Image
                              src={sectionImage}
                              alt={`${project.title} detail ${index + 1}`}
                              fill
                              className="object-cover z-0"
                              sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>{content}</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
