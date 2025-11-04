import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const title = params.slug.replace(/-/g, " ");
  return { title: `Project: ${title}` };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = params;
  if (!slug) notFound();

  return (
    <main className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-semibold mb-4">Project: {slug}</h1>
      <p className="text-base text-foreground/80">
        This is a placeholder for the project detail page.
      </p>
    </main>
  );
}

