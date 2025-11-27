import type { Metadata } from "next";
import BackButton from "@/components/common/BackButton";
import ProjectsList from "@/components/features/projects/ProjectsList";
import { dataProjects } from "@/data/projects";
import type { ProjectItem } from "@/types";

export const metadata: Metadata = {
  title: "Projects | Personal Portfolio",
  description:
    "Explore every featured build, experiment, and shipped engagement in one archive.",
  alternates: {
    canonical: "/projects",
  },
};

const totalProjects = dataProjects.length;
const uniqueStacks = new Set(
  dataProjects.flatMap((project) => project.techStack ?? [])
).size;
const fallbackLatestProject = dataProjects.reduce<ProjectItem | null>(
  (latest, project) => {
    if (!latest) return project;
    return project.id > latest.id ? project : latest;
  },
  null
);

const latestProject = dataProjects.find((project) => project.isLatest) ?? fallbackLatestProject;

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen py-16 md:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.35) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-[96rem] mx-auto px-6 md:px-10 space-y-8">
        <header className="space-y-12">
          <div className="space-y-10 text-center md:text-left">
            <BackButton href="/" label="Back to home" className="justify-center md:justify-start" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-charcoal">
              Every shipped project, research sprint, and passion build
            </h1>
            <p className="text-base md:text-xl text-charcoal/70 max-w-4xl">
              Scroll through the complete set of case studies—from client
              engagements to solo experiments—with notes on rationale, stack,
              and measurable outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <span className="inline-block bg-charcoal text-white text-sm md:text-base uppercase tracking-[0.4em] px-2">
                Active case studies
              </span>
              <p className="text-4xl md:text-5xl font-display text-charcoal">
                {totalProjects}
              </p>
              <p className="text-sm text-charcoal/60">
                Deep dives covering discovery through launch.
              </p>
            </div>
            <div className="space-y-3">
              <span className="inline-block bg-charcoal text-white text-sm md:text-base uppercase tracking-[0.4em] px-2">
                Core toolkits
              </span>
              <p className="text-4xl md:text-5xl font-display text-charcoal">
                {uniqueStacks}+
              </p>
              <p className="text-sm text-charcoal/60">
                Mix of product, AI, and testing stacks.
              </p>
            </div>
            <div className="space-y-3">
              <span className="inline-block bg-charcoal text-white text-sm md:text-base uppercase tracking-[0.4em] px-2">
                Latest launch
              </span>
              <p className="text-2xl md:text-3xl font-display text-charcoal">
                {latestProject?.title ?? "New build"}
              </p>
              <p className="text-sm text-charcoal/60">
                {latestProject?.timeline ?? "Actively building"}
              </p>
            </div>
          </div>
        </header>

        <div className="pt-2">
          <ProjectsList
            showHeader={false}
            showCTA={false}
            sectionId="projects-archive"
            wrapperClassName=""
          />
        </div>
      </div>
    </main>
  );
}
