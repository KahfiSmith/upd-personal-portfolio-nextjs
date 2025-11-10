import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { BlogContentRenderer } from "@/components/features/blog/BlogContentRenderer";

type BlogPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [{ url: post.heroImage, alt: post.title }] : undefined,
    },
  };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen py-16 md:py-24">
      <article className="max-w-4xl mx-auto px-6 md:px-0 space-y-10">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 hover:text-charcoal"
          >
            <span aria-hidden="true">←</span>
            Back to all posts
          </Link>
        </div>
        <header className="space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.05] text-charcoal">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-charcoal/70">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="w-1 h-1 rounded-full bg-charcoal/30" aria-hidden="true" />
            <span>{post.minuteRead} min read</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-charcoal/15 px-3 py-1 text-xs uppercase tracking-wide text-charcoal/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.heroImage && (
          <div className="mb-12 overflow-hidden rounded-xl border border-charcoal/10 shadow-md">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <BlogContentRenderer content={post.content} postSlug={post.slug} />
      </article>
    </main>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
