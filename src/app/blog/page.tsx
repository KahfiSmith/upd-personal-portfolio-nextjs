import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, lessons, and reflections from the studio.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen py-16 md:py-24">
      <div className="max-w-[96rem] mx-auto px-6 md:px-10 space-y-16">
        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.05] text-charcoal">
            Stories & lessons gathered along the way.
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 max-w-3xl">
            A collection of reflections on craft, creativity, and the tiny breakthroughs that keep projects moving.
          </p>
        </header>

        <section className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" aria-hidden="true" />
          <div id="journal-list">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="relative border-b border-charcoal/25 last:border-b-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-col gap-6 py-10 md:py-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="space-y-3 max-w-3xl">
                        <p className="flex items-center gap-3 text-sm text-charcoal/60">
                          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                          <span className="w-1 h-1 rounded-full bg-charcoal/25" aria-hidden="true" />
                          <span>{post.minuteRead} min read</span>
                        </p>
                        <h2 className="text-3xl md:text-4xl font-display text-charcoal leading-tight">
                          {post.title}
                        </h2>
                      </div>

                      {post.heroImage && (
                        <div className="w-full lg:w-72 overflow-hidden rounded-2xl border border-charcoal/10">
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-2 text-charcoal font-semibold">
                      Continue reading
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-2"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
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
