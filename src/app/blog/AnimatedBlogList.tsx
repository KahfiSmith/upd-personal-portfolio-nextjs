"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { BlogPost } from "@/types";

interface AnimatedBlogListProps {
  posts: BlogPost[];
}

export default function AnimatedBlogList({ posts }: AnimatedBlogListProps) {
  return (
    <div id="journal-list">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 20,
  });

  const glowX = useTransform(pointerX, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(pointerY, [-0.5, 0.5], ["30%", "70%"]);
  const glowBackground = useMotionTemplate`radial-gradient(200px 200px at ${glowX} ${glowY}, rgba(34,211,238,0.28), rgba(59,130,246,0.22) 60%, transparent 80%)`;

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(x);
      pointerY.set(y);
    },
    [pointerX, pointerY]
  );

  const handleMouseLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative pb-4 md:pb-6 transition-all duration-500 ease-out rounded-none hover:-translate-y-2 hover:bg-white/5 hover:rounded-[40px] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-charcoal/20 after:to-transparent last:after:hidden"
    >
      <motion.span
        aria-hidden="true"
        style={{ background: glowBackground }}
        className="pointer-events-none absolute inset-x-2 md:inset-x-6 inset-y-4 -z-10 blur-3xl opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
      />

      <Link href={`/blog/${post.slug}`} className="block relative">
        <div className="relative flex flex-col gap-6 py-10 md:py-12 px-0 rounded-none transition-all duration-500 group-hover:px-6 group-hover:rounded-[32px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 md:inset-x-6 top-3 bottom-3 opacity-0 scale-[0.97] transition-all duration-500 group-hover:bg-white/10 group-hover:opacity-100 group-hover:scale-100 group-hover:rounded-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-2 bottom-2 -z-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/20 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:rounded-[32px]"
          />
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
              <p className="text-base text-charcoal/70 max-w-2xl">
                {post.excerpt}
              </p>
            </div>

            {post.heroImage && (
              <div className="relative w-full lg:w-72 overflow-hidden rounded-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lg">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[0.8deg]"
                  loading="lazy"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/25 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          <div className="inline-flex items-center gap-2 text-charcoal/70 font-semibold">
            Continue reading
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 group-hover:translate-x-2"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
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
