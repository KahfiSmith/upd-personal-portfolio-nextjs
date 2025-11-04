import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const title = params.slug.replace(/-/g, " ");
  return { title: `Blog: ${title}` };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = params;
  if (!slug) notFound();

  return (
    <main className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-semibold mb-4">Blog: {slug}</h1>
      <p className="text-base text-foreground/80">
        This is a placeholder for the blog post detail page.
      </p>
    </main>
  );
}

