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
    <main className="max-w-[96rem] mx-auto px-6 md:px-8 min-h-screen my-12 md:my-20 lg:my-24">
      <h1 className="text-3xl font-semibold mb-4">Blog: {slug}</h1>
      <p className="text-base text-foreground/80">
        This is a placeholder for the blog post detail page.
      </p>
    </main>
  );
}

