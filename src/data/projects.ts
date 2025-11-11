import { ProjectItem } from "@/types";

export const dataProjects: ProjectItem[] = [
  {
    id: 1,
    slug: "quowrld",
    title: "Quowrld",
    role: "Fullstack Development",
    summary:
      "A performance-obsessed personal site that blends Astro, MDX, and cinematic micro-interactions to showcase work with zero wasted bytes.",
    description: [
      "Redesigned my portfolio with a performance-first approach using Astro.",
      "Implemented smooth page transitions, reveal animations, and accessible UI components.",
    ],
    marqueeTexts: [
      "Cinematic Storytelling",
      "MDX Powered",
      "Scroll-linked reveals",
      "Sub-second loads",
    ],
    marqueeImages: [
      "/images/halloween.jpg",
      "/images/duck.jpg",
      "/images/gojocat.jpg",
    ],
    previewSrc: "/images/pre_quowrld.png",
    heroImage: "/images/pre_quowrld.png",
    timeline: "Jan 15, 2024 – Mar 10, 2024",
    techStack: ["Astro", "TypeScript", "Tailwind CSS"],
    metrics: [
      { label: "Timeline", value: "Jan 15, 2024 – Mar 10, 2024" },
      { label: "Role", value: "Solo designer & dev" },
      { label: "Focus", value: "Portfolio refresh" },
    ],
    sections: [
      {
        title: "Project Context",
        paragraphs: [
          "The previous iteration of my site felt heavy and disconnected from how I now approach product work. Quowrld is a clean slate focused on clarity, speed, and immersive storytelling.",
          "Astro handled content hydration while GSAP carried the expressive flourishes, allowing me to ship cinematic visuals without sacrificing performance budgets.",
        ],
        highlights: [
          "Under 100KB for initial load.",
          "Reusable content blocks powered by MDX.",
        ],
      },
      {
        title: "Experience Goals",
        paragraphs: [
          "Every section leans on a narrative arc—setup, proof, takeaway. That required building a typography scale and layout grid that could stretch from short snippets to long-form writing.",
          "Magnetic cursor states and scroll-linked reveals keep the page alive while remaining accessible with keyboard-only navigation.",
        ],
        highlights: [
          "Custom magnetic layer for CTA clusters.",
          "Scroll-triggered orbit visualization for tech stack.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "After launch I saw a 34% uptick in portfolio inquiries and recruiters consistently called out how easy it was to scan the work narrative.",
          "Because the foundation is component-driven, adding new case studies is now a content exercise rather than an engineering one.",
        ],
        highlights: [
          "+34% inbound from organic shares.",
          "Sub-1s first contentful paint globally.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "kpop-pulls",
    title: "Kpop Pulls",
    role: "Fullstack Development",
    summary:
      "A playful commerce experience for collectors with real-time drops, curated bundles, and a loyalty engine.",
    description: [
      "Built a modern storefront with responsive layouts and reusable components.",
      "Integrated global state for cart and wishlist with clean UX flows.",
    ],
    marqueeTexts: ["Real-time drops", "Loyalty Engine", "Dynamic theming"],
    marqueeImages: [
      "/images/leafcat.jpg",
      "/images/blackcat.jpg",
      "/images/orange.jpg",
    ],
    previewSrc: "/images/pre_kpopulls.png",
    heroImage: "/images/pre_kpopulls.png",
    timeline: "Jul 10, 2023 – Sep 22, 2023",
    techStack: ["React.js", "Redux", "Framer Motion"],
    metrics: [
      { label: "Timeline", value: "Jul 10, 2023 – Sep 22, 2023" },
      { label: "Role", value: "Fullstack dev" },
      { label: "Focus", value: "Commerce drops" },
    ],
    sections: [
      {
        title: "Why it matters",
        paragraphs: [
          "Collectors were juggling spreadsheets and DMs to trade pulls. We wanted to bring that energy into a dedicated marketplace that still felt personal.",
          "The product mix changes weekly, so CMS-driven merchandising blocks were a must. Editors can reorder hero tiles, add capsules, and schedule drops without touching code.",
        ],
      },
      {
        title: "System Design",
        paragraphs: [
          "Redux Toolkit powers cart, wishlist, and drop notifications with optimistic updates so the interface never stalls. Framer Motion adds context during restocks and sold-out states.",
          "Material UI primitives were restyled with a glassy, neon aesthetic to mirror K-pop visuals while staying WCAG AA compliant.",
        ],
        highlights: [
          "60+ reusable UI tokens.",
          "Dynamic theming triggered by artist collections.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "Average session duration climbed by 27% and the loyalty drawer drove a 2x increase in repeat purchases within the first month of beta.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "code-roaster",
    title: "Code Roaster",
    role: "Fullstack Development",
    summary:
      "A coffee-themed developer chat with latency-sensitive messaging, reactions, and presence indicators.",
    description: [
      "Developed a real-time chat interface with optimistic UI updates.",
      "Handled authentication and presence with scalable architecture.",
    ],
    marqueeTexts: ["Realtime chat", "Optimistic UI", "Presence indicators"],
    marqueeImages: [
      "/images/yor.jpg",
      "/images/blueberry.jpg",
      "/images/flowercat.jpg",
    ],
    previewSrc: "/images/pre_coderoaster.png",
    heroImage: "/images/pre_coderoaster.png",
    timeline: "Oct 3, 2022 – Dec 14, 2022",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Timeline", value: "Oct 3, 2022 – Dec 14, 2022" },
      { label: "Role", value: "Product engineer" },
      { label: "Focus", value: "Realtime chat" },
    ],
    sections: [
      {
        title: "Messaging Core",
        paragraphs: [
          "Socket.IO handles bi-directional messaging while Redis fan-out keeps delivery reliable. Messages render optimistically and reconcile once the server confirms ordering.",
        ],
        highlights: [
          "Typing indicators scoped per channel.",
          "Presence list synced via Redis pub/sub.",
        ],
      },
      {
        title: "Brewing the UI",
        paragraphs: [
          "The interface leans into the café concept: warm gradients, frothy cards, and subtle steam trails built with SVG filters. Despite the whimsy, everything stays responsive down to 320px.",
        ],
      },
      {
        title: "What I learned",
        paragraphs: [
          "Building a real-time product solo reinforced the importance of tracing state transitions. Every WebSocket event maps to a reducer so QA can replay issues deterministically.",
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
      "Interactive learning modules that translate dense curriculum into snackable, trackable lessons.",
    description: [
      "Educational platform with interactive learning modules.",
      "Built responsive components with modern React patterns.",
    ],
    marqueeTexts: [
      "Interactive lessons",
      "White-label LMS",
      "Real-time analytics",
    ],
    marqueeImages: [
      "/images/watermelon.jpg",
      "/images/otter.jpg",
      "/images/anime.jpg",
    ],
    previewSrc: "/images/pre_eduverse.png",
    heroImage: "/images/pre_eduverse.png",
    timeline: "Apr 5, 2022 – Jun 18, 2022",
    techStack: ["React.js", "TypeScript", "Tailwind CSS"],
    metrics: [
      { label: "Timeline", value: "Apr 5, 2022 – Jun 18, 2022" },
      { label: "Role", value: "Frontend lead" },
      { label: "Focus", value: "Learning modules" },
    ],
    sections: [
      {
        title: "Brief",
        paragraphs: [
          "Schools wanted to deliver interactive coursework without rebuilding their LMS. Eduverse plugs in as a white-label experience focused on engagement analytics.",
        ],
      },
      {
        title: "Interaction Model",
        paragraphs: [
          "Each lesson is composed of atoms (prompts, quizzes, labs) orchestrated by a JSON schema. This lets curriculum teams prototype sequences without engineering support.",
        ],
        highlights: [
          "Real-time progress sync between devices.",
          "Embedded reflections for qualitative data.",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Pilot classrooms reported students completing 22% more assignments, largely due to immediate feedback loops and badges that celebrate streaks.",
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
      "A livestock management dashboard with forecasting, health tracking, and automated paperwork for small farms.",
    description: [
      "Livestock management system with inventory tracking.",
      "Implemented data visualization and reporting features.",
    ],
    marqueeTexts: ["Ops intelligence", "Forecasting engine", "Health tracking"],
    marqueeImages: [
      "/images/capybara.jpg",
      "/images/ponyo.jpg",
      "/images/sailormoon.jpg",
    ],
    previewSrc: "/images/pre_ternakq.png",
    heroImage: "/images/pre_ternakq.png",
    timeline: "Jan 12, 2022 – Mar 30, 2022",
    techStack: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
    metrics: [
      { label: "Timeline", value: "Jan 12, 2022 – Mar 30, 2022" },
      { label: "Role", value: "Web dev" },
      { label: "Focus", value: "Ops dashboard" },
    ],
    sections: [
      {
        title: "Challenge",
        paragraphs: [
          "Small farms were juggling spreadsheets, WhatsApp chats, and paper notebooks. We centralized herd data, medical history, and logistics in one calm interface.",
        ],
      },
      {
        title: "Solution",
        paragraphs: [
          "Laravel handled the heavy relational logic while Vue powered a responsive dashboard. Farmers can log treatments offline and sync once they regain coverage.",
        ],
        highlights: [
          "Automated export to government templates.",
          "Predictive feed calculator based on growth curves.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "Teams cut administrative time by 40% and reduced missed vaccinations thanks to calendar nudges delivered through WhatsApp webhooks.",
        ],
      },
    ],
  },
];
