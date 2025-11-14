import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import AnimatedBlogList from "./AnimatedBlogList";
import BackButton from "@/components/common/BackButton";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, lessons, and reflections from the studio.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen py-16 md:py-24">
      <div className="max-w-[96rem] mx-auto px-6 md:px-10 space-y-16">
        <header className="space-y-4">
          <BackButton
            title="Journal"
            subtitle="Stories & lessons gathered along the way."
            href="/"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.05] bg-gradient-to-r from-cyan-600 via-black to-cyan-600 bg-clip-text text-transparent pb-2">
            Stories & lessons gathered along the way.
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 max-w-3xl">
            A collection of reflections on craft, creativity, and the tiny
            breakthroughs that keep projects moving.
          </p>
        </header>

        <section className="relative">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent"
            aria-hidden="true"
          />
          <AnimatedBlogList posts={blogPosts} />
        </section>
      </div>
    </main>
  );
}
