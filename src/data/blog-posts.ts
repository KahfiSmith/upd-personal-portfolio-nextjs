import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "designing-delightful-micro-interactions",
    title: "Designing Delightful Micro-Interactions",
    excerpt:
      "How subtle motion, haptics, and timing elevate usability across modern web experiences.",
    content: [
      "Micro-interactions bridge the gap between intent and outcome. They guide focus, confirm actions, and add a touch of personality to otherwise routine tasks.",
      "When I build them, I start with the narrative: what question is the user silently asking at this point? Animations answer those questions with rhythm and tone—slow curves for warmth, springy easing for playful confidence.",
      "I’ve grown fond of prototyping in Framer Motion and GSAP, then translating those ideas into platform-native primitives when performance demands it. The key is restraint: every flourish must protect clarity.",
    ],
    publishedAt: "2025-09-18",
    minuteRead: 6,
    tags: ["UX", "Animation", "GSAP"],
    heroImage: "/images/quowrld-page.png",
  },
  {
    id: 2,
    slug: "scaling-design-systems-with-nextjs",
    title: "Scaling Design Systems with Next.js",
    excerpt:
      "Lessons learned from turning a scrappy UI kit into a living system that powers multiple products.",
    content: [
      "The hardest part about design systems isn’t tokens or figma libraries—it’s governance. A system becomes real when teams trust it enough to stop reinventing buttons at 2 a.m.",
      "Within Next.js apps, I lean on colocated stories, visual regression tests, and lint rules that guard slot props or typography rules. These guardrails keep the system flexible but cohesive.",
      "As the component catalog grows, I document intent, not just usage. That narrative helps new contributors extend the system without diluting its voice.",
    ],
    publishedAt: "2025-07-02",
    minuteRead: 8,
    tags: ["Design System", "Next.js", "TypeScript"],
    heroImage: "/images/eduverse.png",
  },
  {
    id: 3,
    slug: "soft-physics-in-portfolio-websites",
    title: "Soft Physics in Portfolio Websites",
    excerpt:
      "Exploring organic scroll, inertia, and tactile feedback to make storytelling sites feel alive.",
    content: [
      "Portfolios are playgrounds for motion. I experiment with Lenis, spring-based easing, and shader-driven gradients to make scroll feel like you’re gliding through stories.",
      "Performance matters: buttery motion only delights if it stays above 60fps on everyday hardware. That’s why I prioritize GPU-friendly transforms, defer heavy shaders, and ship reduced-motion fallbacks.",
      "Ultimately these touches aren’t about flexing tech—they’re about hospitality. Visitors should feel guided, never lost, as they explore the work.",
    ],
    publishedAt: "2025-04-14",
    minuteRead: 5,
    tags: ["Motion", "Lenis", "Portfolio"],
    heroImage: "/images/coderoaster.png",
  },
];
