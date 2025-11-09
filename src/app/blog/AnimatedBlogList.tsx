"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import type { BlogPost } from "@/types";

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(10,10,10,0.18)",
    boxShadow: "0 0 0 rgba(15,15,15,0)",
  },
  hover: {
    y: -10,
    borderColor: "rgba(10,10,10,0.35)",
    boxShadow: "0 30px 60px rgba(5,5,5,0.12)",
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

const cardGlowVariants: Variants = {
  rest: { opacity: 0, scale: 0.92 },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const imageWrapperVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const imageVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.08,
    rotate: 0.6,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageHighlightVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35 } },
};

const arrowVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 10, transition: { type: "spring", stiffness: 350, damping: 15 } },
};

const contentVariants: Variants = {
  rest: {
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 0,
  },
  hover: {
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 32,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const contentHighlightVariants: Variants = {
  rest: { opacity: 0, scale: 0.96 },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

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
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative pb-4 md:pb-6 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-charcoal/20 after:to-transparent last:after:hidden"
    >
      <motion.span
        aria-hidden="true"
        variants={cardGlowVariants}
        style={{ background: glowBackground }}
        className="pointer-events-none absolute inset-x-2 md:inset-x-6 inset-y-4 rounded-[2.5rem] -z-10 blur-3xl"
      />

      <Link href={`/blog/${post.slug}`} className="group block relative">
        <motion.div
          className="relative flex flex-col gap-6 py-10 md:py-12 overflow-hidden"
          variants={contentVariants}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 md:inset-x-6 top-3 bottom-3 rounded-[2rem] bg-gradient-to-r from-cyan-500/12 via-transparent to-purple-500/18"
            variants={contentHighlightVariants}
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
              <motion.div
                className="relative w-full lg:w-72 overflow-hidden rounded-2xl border border-charcoal/10"
                variants={imageWrapperVariants}
              >
                <motion.img
                  src={post.heroImage}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  variants={imageVariants}
                />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/25 via-transparent to-purple-500/20"
                  aria-hidden="true"
                  variants={imageHighlightVariants}
                />
              </motion.div>
            )}
          </div>

          <div className="inline-flex items-center gap-2 text-charcoal font-semibold">
            Continue reading
            <motion.span
              aria-hidden="true"
              className="inline-block"
              variants={arrowVariants}
            >
              →
            </motion.span>
          </div>
        </motion.div>
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
