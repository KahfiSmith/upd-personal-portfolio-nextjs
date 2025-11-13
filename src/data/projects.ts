import { ProjectItem } from "@/types";

export const dataProjects: ProjectItem[] = [
  {
    id: 1,
    slug: "quowrld",
    title: "Quowrld",
    role: "Fullstack Development",
    summary:
      "A quote-first web app where writers and readers can discover, create, and share meaningful quotes in a focused, distraction-free space.",
    description: [
      "Designed and built a fullstack quote platform that lets users publish, tag, and browse quotes with a clean, reading-first layout.",
      "Implemented auth, profile pages, trending feeds, and search so the community can explore quotes by tags, authors, and popularity.",
    ],
    marqueeTexts: [
      "Quote-First Experience",
      "Community for Writers",
      "Trending & Hashtags",
      "Clean Reading UI",
    ],
    marqueeImages: [
      "/images/halloween.jpg",
      "/images/duck.jpg",
      "/images/gojocat.jpg",
    ],
    previewSrc: "/images/pre_quowrld.png",
    heroImage: "/images/pre_quowrld.png",
    timeline: "Apr 15, 2025 – Jun 10, 2025",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Framer Motion",
      "Supabase",
    ],
    metrics: [
      { label: "Timeline", value: "Apr 15, 2025 – Jun 10, 2025" },
      { label: "Role", value: "Solo designer & developer" },
      { label: "Focus", value: "Quote platform & writing community" },
    ],
    sections: [
      {
        title: "Project Context",
        paragraphs: [
          "I wanted a dedicated home for short-form writing—somewhere between social media noise and long-form blogging. Quowrld is a clean space for quotes: simple enough to post a single sentence, but structured enough to browse by topics, authors, and moods.",
          "The app is built as a focused reading experience first, then layered with social features like likes, saves, and trending so writers can see their words travel through the community.",
        ],
        highlights: [
          "Dedicated quote cards with readable typography.",
          "Tag- and topic-based browsing for discovery.",
        ],
      },
      {
        title: "Experience Goals",
        paragraphs: [
          "The main goal was to make posting a quote feel almost as fast as thinking it. That meant a minimal composer, instant feedback, and no bloated UI around the core action of writing and sharing.",
          "On the discovery side, I designed a timeline that surfaces trending quotes, editor picks, and tag-based feeds, so readers can quickly fall into a flow of meaningful content instead of endless, noisy scrolling.",
        ],
        highlights: [
          "Single-step quote composer with live preview.",
          "Trending, latest, and tag-based feeds for exploration.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "Early testers reported that it feels like a calm space to write in—more intentional than social media but lighter than a full blog. That validated the idea of building a product around short-form, meaningful text.",
          "Because the architecture is component-driven, new features like collections, quote-of-the-day, or collaborative prompts can be shipped without reworking the core reading experience.",
        ],
        highlights: [
          "Built to scale into a larger writing community.",
          "Ready foundation for features like collections and quote-of-the-day.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "kpop-pulls",
    title: "KPop Pulls",
    role: "Fullstack Development",
    summary:
      "A K-pop idol gacha web app where fans can pull, collect, and manage their favorite idols with a persistent local collection and playful UI.",
    description: [
      "Designed a K-pop idol gacha experience that lets users ‘pull’ random idols and build a personal collection.",
      "Implemented a local-storage based collection system so pulls, favorites, and progress stay saved without requiring an account.",
    ],
    marqueeTexts: [
      "K-Pop Idol Gacha",
      "Local Collection Saves",
      "Pull History & Rarity Feel",
      "Import / Export Collections",
    ],
    marqueeImages: [
      "/images/leafcat.jpg",
      "/images/blackcat.jpg",
      "/images/orange.jpg",
    ],
    previewSrc: "/images/pre_kpopulls.png",
    heroImage: "/images/pre_kpopulls.png",
    timeline: "Jun 16, 2025 – Jul 21, 2025",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Cypress",
    ],
    metrics: [
      { label: "Timeline", value: "Jun 16, 2025 – Jul 21, 2025" },
      { label: "Role", value: "Fullstack dev" },
      { label: "Focus", value: "K-pop idol gacha & collection" },
    ],
    sections: [
      {
        title: "Why it matters",
        paragraphs: [
          "K-pop fans often track their ‘bias’ and pulls via screenshots or notes. KPop Pulls turns that habit into a simple, focused web app where they can roll for idols and see their collection grow over time.",
          "Instead of a full-blown marketplace, the product is intentionally light: it recreates the fun of gacha without payments, while still giving structure through collections and a dedicated ‘My Collection’ view.",
        ],
      },
      {
        title: "System Design",
        paragraphs: [
          "The core flow is built around a single action: pulling an idol. Each pull updates the collection in localStorage, so users can close the tab and come back later without losing progress.",
          "UI components are built with reusable card layouts and a neobrutalist-inspired style, keeping the interface bold and playful while still readable on both desktop and mobile.",
        ],
        highlights: [
          "LocalStorage-backed collection system for offline persistence.",
          "Reusable gacha + collection components for future features like pity or rarity tiers.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "Early testers said it ‘feels like a mini gacha game in the browser’ and liked how fast they could see their collection fill up without any login friction.",
          "The current architecture makes it easy to extend into features like pity counters, rarity filters, or shareable collection exports without rewriting the core pulling logic.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "code-roaster",
    title: "CodeRoaster",
    role: "Fullstack Development",
    summary:
      "An AI code review tool with multiple personalities—from brutal roasts to supportive mentor feedback—so developers can inspect their code from different angles.",
    description: [
      "Built an AI-powered code review experience where developers paste code, pick a review persona, and get structured feedback in seconds.",
      "Designed review flows for different modes like roasting, supportive mentor, best practices, and security-focused feedback with a clean, focused UI.",
    ],
    marqueeTexts: [
      "AI Code Review with Personality",
      "Roasting & Brutal Honesty",
      "Supportive Mentor Mode",
      "Best Practices & Security Focus",
    ],
    marqueeImages: [
      "/images/yor.jpg",
      "/images/blueberry.jpg",
      "/images/flowercat.jpg",
    ],
    previewSrc: "/images/pre_coderoaster.png",
    heroImage: "/images/pre_coderoaster.png",
    timeline: "Jul 22, 2025 – Aug 19, 2025",
    techStack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "Zustand",
      "Vitest",
    ],
    metrics: [
      { label: "Timeline", value: "Jul 22, 2025 – Aug 19, 2025" },
      { label: "Role", value: "Solo fullstack developer" },
      { label: "Focus", value: "AI-powered code review" },
    ],
    sections: [
      {
        title: "Why I Built It",
        paragraphs: [
          "Most code review tools feel either too dry or too generic. I wanted something that still teaches best practices, but in a voice that matches the mood—whether that’s brutal roasting or a calm mentor tone.",
          "CodeRoaster experiments with how tone affects how feedback is received. The same code can be reviewed as a roast, as a supportive mentor, or as a strict professional reviewer.",
        ],
      },
      {
        title: "Review Engine & UX",
        paragraphs: [
          "The core flow is simple: paste code, choose a persona, and hit review. Behind that, prompts are tailored per persona so the output stays consistent in style while still being technically useful.",
          "The interface is built around readability: monospace code area, clearly separated feedback sections, and persona switches that make it easy to rerun the same snippet with different review styles.",
        ],
        highlights: [
          "Multiple review personas: roast, mentor, professional, security, and best practices.",
          "Structured feedback sections for readability: issues, suggestions, and improvements.",
        ],
      },
      {
        title: "What I Learned",
        paragraphs: [
          "Tuning prompts for consistent tone taught me how sensitive AI behavior is to small wording changes, especially when you want personality without losing technical depth.",
          "Designing the flow also reinforced how important it is to keep friction low for developers: the less setup needed, the more likely they are to actually run a review before pushing code.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "eduverse",
    title: "Eduverse",
    role: "Frontend Development",
    summary:
      "A React-based learning interface that turns static curriculum into modular, snackable lessons with a clean, student-first UI.",
    description: [
      "Built an educational front-end experience with interactive lesson cards and clear subject grouping.",
      "Implemented responsive components and reusable layouts with modern React + TypeScript patterns.",
    ],
    marqueeTexts: [
      "Interactive lessons",
      "Student-friendly layout",
      "Reusable course components",
    ],
    marqueeImages: [
      "/images/watermelon.jpg",
      "/images/otter.jpg",
      "/images/anime.jpg",
    ],
    previewSrc: "/images/pre_eduverse.png",
    heroImage: "/images/pre_eduverse.png",
    timeline: "Apr 5, 2022 – Jun 18, 2022",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    metrics: [
      { label: "Timeline", value: "Apr 5, 2022 – Jun 18, 2022" },
      { label: "Role", value: "Frontend lead" },
      { label: "Focus", value: "Learning modules & UI" },
    ],
    sections: [
      {
        title: "Brief",
        paragraphs: [
          "Eduverse explores how a modern learning interface can make lessons feel lighter and less intimidating. Instead of dumping long blocks of text, content is broken down into focused, card-based lessons that are easy to scan and revisit.",
          "The goal was to design a front-end that could sit on top of different backends or LMS systems, acting as a clean, white-label style shell for schools or courses.",
        ],
      },
      {
        title: "Interaction Model",
        paragraphs: [
          "Each lesson is treated as a small module with a consistent structure: title, key idea, and call-to-action to dive deeper. Components are built as composable units so they can be reused across subjects, grades, or course types.",
          "Layouts are optimized for both desktop and mobile, with responsive grids, clear hierarchy, and smooth transitions to keep learners focused on the content instead of fighting the UI.",
        ],
        highlights: [
          "Reusable React components for subjects, lessons, and sections.",
          "Mobile-first layout so students can browse content comfortably on any device.",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Eduverse became a solid playground for experimenting with education-focused UX: typography, spacing, and layout choices that make reading long-form content less tiring.",
          "The component-driven approach means new subjects, lesson types, or even a future analytics layer can be added without rewriting the core UI patterns.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "ternakq",
    title: "TernakQ",
    role: "Web Development",
    summary:
      "A chicken farm management web app that combines educational articles with tools to track flock population, feed, finances, and coop conditions.",
    description: [
      "Built a management system for chicken farms to track incoming, harvested, dead, and sick chickens in one dashboard.",
      "Added modules for feed usage, basic financial records, coop management, and articles to help farmers learn better practices.",
    ],
    marqueeTexts: [
      "Chicken farm dashboard",
      "Population tracking",
      "Feed & finance management",
      "Articles for farmers",
    ],
    marqueeImages: [
      "/images/capybara.jpg",
      "/images/ponyo.jpg",
      "/images/sailormoon.jpg",
    ],
    previewSrc: "/images/pre_ternakq.png",
    heroImage: "/images/pre_ternakq.png",
    timeline: "Jan 12, 2025 – May 22, 2025",
    techStack: ["Laravel", "Tailwind CSS", "Alpine.js", "MySQL"],
    metrics: [
      { label: "Timeline", value: "Jan 12, 2025 – May 22, 2025" },
      { label: "Role", value: "Web dev" },
      { label: "Focus", value: "Chicken farm management" },
    ],
    sections: [
      {
        title: "Challenge",
        paragraphs: [
          "Many small chicken farmers still rely on paper notes and chat apps to track how many chickens enter, are harvested, die, or get sick. Feed and cash flow are often recorded in separate books, so it’s hard to see the full picture of the farm.",
          "TernakQ centralizes flock data, feed usage, simple financial records, and coop information in one place, while also providing articles that explain basic poultry management concepts.",
        ],
      },
      {
        title: "Solution",
        paragraphs: [
          "Laravel powers the core logic and database for chicken population (in, harvested, dead, sick), feed stock and usage, coop records, and transaction history. Vue.js renders a responsive dashboard so farmers can quickly input daily data from desktop or mobile.",
          "An article module lets admins publish guides and tips about chicken health, feeding schedules, and coop management, so the app is not just a tool but also a learning resource for farmers.",
        ],
        highlights: [
          "Population tracking by status: incoming, harvested, dead, and sick.",
          "Feed, expense, and revenue records to monitor basic farm finances.",
          "Article CMS for poultry management tips and education.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "By putting population, feed, and financial data in one dashboard, farmers can more easily see whether their farm is growing, losing stock, or overspending on feed.",
          "The combination of data and articles helps new farmers understand not just what is happening on their farm, but also why it happens and how to improve it.",
        ],
      },
    ],
  },
];
