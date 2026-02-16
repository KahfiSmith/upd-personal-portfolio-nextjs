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
    detailImages: [
      "/images/quowrld-page.png",
      "/images/quowrld.png",
      "/images/quowrld-profile.png",
    ],
    marqueeTexts: [
      "Quote-First Experience",
      "Community for Writers",
      "Trending & Hashtags",
    ],
    marqueeImages: [
      "/images/quowrld/halloween.jpg",
      "/images/quowrld/duck.jpg",
      "/images/quowrld/gojocat.jpg",
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
      "Shadcn UI",
      "Supabase",
    ],
    metrics: [
      { label: "Timeline", value: "Apr 15, 2025 – Jun 10, 2025" },
      { label: "Role", value: "Fullstack Development" },
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
    ],
    detailImages: [
      "/images/kpopulls.png",
      "/images/kpopulls-1.png",
      "/images/kpopulls-2.png",
    ],
    marqueeImages: [
      "/images/kpopulls/blackcat.jpg",
      "/images/kpopulls/godzilla.jpg",
      "/images/kpopulls/orange.jpg",
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
      { label: "Role", value: "Fullstack Development" },
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
      "Best Practices & Security Focus",
    ],
    detailImages: [
      "/images/coderoaster.png",
      "/images/coderoaster-1.png",
      "/images/coderoaster-2.png",
    ],
    marqueeImages: [
      "/images/coderoaster/yor.jpg",
      "/images/coderoaster/blueberry.jpg",
      "/images/coderoaster/flowercat.jpg",
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
      { label: "Role", value: "Fullstack Development" },
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
    slug: "ternakq",
    title: "TernakQ",
    role: "Fullstack Development",
    summary:
      "A chicken farm management web app that combines educational articles with tools to track flock population, feed, finances, and coop conditions.",
    description: [
      "Built a management system for chicken farms to track incoming, harvested, dead, and sick chickens in one dashboard.",
      "Added modules for feed usage, basic financial records, coop management, and articles to help farmers learn better practices.",
    ],
    marqueeTexts: [
      "Chicken farm dashboard",
      "Feed & finance management",
      "Articles for farmers",
    ],
    detailImages: [
      "/images/ternakq.png",
      "/images/ternakq-1.png",
      "/images/ternakq-2.png",
    ],
    marqueeImages: [
      "/images/ternakq/capybara.jpg",
      "/images/ternakq/ponyo.jpg",
      "/images/ternakq/sailormoon.jpg",
    ],
    previewSrc: "/images/pre_ternakq.png",
    heroImage: "/images/pre_ternakq.png",
    timeline: "Jan 12, 2025 – May 22, 2025",
    techStack: ["Laravel", "Tailwind CSS", "Alpine.js", "MySQL"],
    metrics: [
      { label: "Timeline", value: "Jan 12, 2025 – May 22, 2025" },
      { label: "Role", value: "Fullstack Development" },
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
  {
    id: 5,
    slug: "orymu",
    title: "Orymu",
    role: "Frontend Development",
    isLatest: true,
    summary:
      "A reading tracker web app that helps book lovers log their progress, strengthen memory through quizzes, and stay focused with a distraction-free reading mode.",
    description: [
      "Built a web platform for users to track the books they’re reading, log progress by chapter or pages, and visualize their reading activity over time.",
      "Added quiz modules after each chapter to help reinforce key ideas, plus a focus mode that provides a clean, distraction-free reading experience.",
    ],
    marqueeTexts: [
      "Reading tracker dashboard",
      "Distraction-free focus mode",
      "Reading habit insights",
    ],
    detailImages: [
      "/images/orymu.png",
      "/images/orymu-1.png",
      "/images/orymu-2.png",
    ],
    marqueeImages: [
      "/images/orymu/man.jpg",
      "/images/orymu/catgreen.jpg",
      "/images/orymu/yandere.jpg",
    ],
    previewSrc: "/images/pre_orymu.png",
    heroImage: "/images/pre_orymu.png",
    timeline: "Jul 2025 – Present",
    techStack: [
      "React Router V7",
      "TypeScript",
      "Express.js",
      "Tailwind CSS",
      "Tanstack Query",
      "Framer Motion",
      "Shadcn UI",
      "Zod",
      "Zustand",
      "Prisma",
      "PostgreSQL",
    ],
    metrics: [
      { label: "Timeline", value: "Jul 2025 – Present" },
      { label: "Role", value: "Frontend Development" },
      { label: "Focus", value: "Reading tracker & focus mode" },
    ],
    sections: [
      {
        title: "Challenge",
        paragraphs: [
          "Many readers struggle to remember what they’ve read and to build a consistent reading habit, especially when reading on screens full of distractions.",
          "Orymu aims to help book lovers keep their reading organized, remember key ideas through quick quizzes, and enter a dedicated focus mode when it’s time to read.",
        ],
      },
      {
        title: "Solution",
        paragraphs: [
          "Users can add books to their personal library, log current page or chapter, and see a visual overview of their progress and reading streaks.",
          "After finishing a chapter, Orymu offers short quizzes to reinforce memory. A built-in focus mode provides a minimal reading layout with reduced UI elements, dark background options, and optional reading timers to stay in flow.",
        ],
        highlights: [
          "Reading tracker with per-book progress and activity history.",
          "Chapter-based quizzes to strengthen recall and understanding.",
          "Focus mode with distraction-free reading layout and session timers.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "By combining tracking, quizzes, and focus mode in one place, Orymu makes it easier for users to build a more consistent reading routine.",
          "The structured flow—from picking a book, entering focus mode, to reviewing chapters with quizzes—helps readers stay engaged and retain more of what they read.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "e-pkk",
    title: "E-PKK Kab. Nganjuk",
    role: "Fullstack Development",
    summary:
      "A web-based information system for PKK Kabupaten Nganjuk to centralize household, dasawisma, cadre, and activity data into one structured dashboard.",
    description: [
      "Built a management system for PKK Kabupaten Nganjuk to record households, dasawisma groups, cadres, and activity reports in a single application.",
      "Added modules for program indicators, basic statistics, and reporting so sub-districts and villages can submit data consistently to the regency level.",
    ],
    marqueeTexts: [
      "PKK data dashboard",
      "Cadre & activity management",
      "Program reporting",
    ],
    detailImages: ["/images/pkk.png", "/images/pkk-1.png", "/images/pkk-2.png"],
    marqueeImages: [
      "/images/pkk/ghost.jpg",
      "/images/pkk/leafcat.jpg",
      "/images/pkk/skycat.jpg",
    ],
    previewSrc: "/images/pre_pkk.png",
    heroImage: "/images/pre_pkk.png",
    timeline: "Jan 12, 2025 – May 22, 2025",
    techStack: ["Laravel", "Bootstrap", "Alpine.js", "MySQL"],
    metrics: [
      { label: "Timeline", value: "Jan 12, 2025 – May 22, 2025" },
      { label: "Role", value: "Fullstack Development" },
      { label: "Focus", value: "PKK data management" },
    ],
    sections: [
      {
        title: "Challenge",
        paragraphs: [
          "Before e-PKK, data for PKK Kabupaten Nganjuk—such as households, dasawisma groups, cadres, and activities—was spread across paper forms, Excel files, and chat apps. Compiling reports from desa and kecamatan to the regency level was slow and error-prone.",
          "The organization needed a centralized system where each level (kabupaten, kecamatan, desa, dasawisma) could input and update data in a consistent format to support reporting and decision-making.",
        ],
      },
      {
        title: "Solution",
        paragraphs: [
          "Laravel powers the core logic and database for managing households, dasawisma groups, cadre lists, and periodic activity or program reports. Role-based access allows different user types (admin kabupaten, kecamatan, desa, and kader) to work in the same system with the right permissions.",
          "Alpine.js and Tailwind CSS are used to build a responsive, form-focused interface so staff can quickly input data, filter records, and generate simple summaries without needing heavy frontend frameworks.",
        ],
        highlights: [
          "Household and dasawisma data tracking per village and kecamatan.",
          "Cadre and activity records aligned with PKK program indicators.",
          "Structured reporting flows from village level up to kabupaten.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "By centralizing PKK data, e-PKK reduces manual recaps and duplicate data entry when compiling reports for the regency level.",
          "Structured forms and clear data models help PKK officers and cadres in Nganjuk see more accurate statistics across villages, making it easier to monitor participation and program coverage.",
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "relive",
    title: "ReLive",
    role: "Fullstack Development",
    summary:
      "An online psychology consultation platform that connects clients with licensed psychologists through secure, scheduled sessions.",
    description: [
      "Built a web-based platform for users to register, browse available psychologists, and book online consultation sessions.",
      "Implemented modules for schedules, session history, and basic profile management for both clients and psychologists.",
    ],
    marqueeTexts: [
      "Online counseling platform",
      "Psychologist scheduling",
      "Session history & profiles",
    ],
    detailImages: [
      "/images/relive.png",
      "/images/relive-1.png",
      "/images/relive-2.png",
    ],
    marqueeImages: [
      "/images/relive/anya.jpg",
      "/images/relive/dawncat.jpg",
      "/images/relive/skeleton.jpg",
    ],
    previewSrc: "/images/pre_relive.png",
    heroImage: "/images/pre_relive.png",
    timeline: "Feb 16, 2024 – Jun 28, 2024",
    techStack: ["Laravel", "Bootstrap", "Alpine.js", "MySQL"],
    metrics: [
      { label: "Timeline", value: "Feb 16, 2024 – Jun 28, 2024" },
      { label: "Role", value: "Fullstack Development" },
      { label: "Focus", value: "Online psychology consultation" },
    ],
    sections: [
      {
        title: "Challenge",
        paragraphs: [
          "Many people who need psychological help feel intimidated to visit a clinic directly, and managing appointments is often still done manually via chat or phone calls.",
          "ReLive aims to make psychological consultation more approachable by providing a structured online platform where users can discover psychologists, understand their specialties, and book sessions without friction.",
        ],
      },
      {
        title: "Solution",
        paragraphs: [
          "Laravel handles authentication, user roles (admin, psychologist, client), schedules, and consultation records. Psychologists can manage their available time slots, while users can book sessions based on those schedules.",
          "Bootstrap and Alpine.js are used to build a responsive interface for registration, psychologist profiles, booking forms, and simple dashboards that show upcoming sessions and past consultation history.",
        ],
        highlights: [
          "Role-based access for admins, psychologists, and clients.",
          "Schedule and booking system for online consultation sessions.",
          "Psychologist profiles with specialization and basic information.",
        ],
      },
      {
        title: "Impact",
        paragraphs: [
          "By moving appointment management into a web platform, ReLive reduces back-and-forth coordination via chat and makes it easier for users to consistently follow up on their mental health.",
          "The structured flow—from discovering psychologists to booking and tracking sessions—helps both sides stay organized and reduces missed or forgotten appointments.",
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "eduverse",
    title: "Eduverse",
    role: "UI/UX Design",
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
    detailImages: [
      "/images/eduverse.png",
      "/images/eduverse-1.png",
      "/images/eduverse-2.png",
    ],
    marqueeImages: [
      "/images/eduverse/watermelon.jpg",
      "/images/eduverse/otter.jpg",
      "/images/eduverse/anime.jpg",
    ],
    previewSrc: "/images/pre_eduverse.png",
    heroImage: "/images/pre_eduverse.png",
    timeline: "Apr 5, 2022 – Jun 18, 2022",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    metrics: [
      { label: "Timeline", value: "Apr 5, 2022 – Jun 18, 2022" },
      { label: "Role", value: "UI/UX Design" },
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
    id: 9,                                                                                                                                                                                                                 
    slug: "ventura-marketplace",                                                                                                                                                                                           
    title: "Ventura",                                                                                                                                                                                                      
    role: "Frontend Development",                                                                                                                                                                                                  
    summary:                                                                                                                                                                                                               
      "A Next.js marketplace for buying and selling businesses, focused on verified listings, clear financial snapshots, and direct buyer-seller communication.",                                                          
    description: [                                                                                                                                                                                                         
      "Designed a trust-first marketplace experience with listing cards, filters, and a clean, finance-forward layout.",
      "Implemented reusable components and responsive sections with Next.js, TypeScript, Tailwind CSS, and motion-driven UI polish.",                                                                                      
    ],                                                                                                                                                                                                                     
    marqueeTexts: [                                                                                                                                                                                                        
      "Verified listings",                                                                                                                                                                                                 
      "Buyer-seller matching",                                                                                                                                                                                             
      "Deal-ready insights",                                                                                                                                                                                               
    ],                                                                                                                                                                                                                     
    detailImages: [
      "/images/ventura.png",                                                                                                                                                                                                  
      "/images/ventura-1.png",                                                                                                                                                                                             
      "/images/ventura-2.png",                                                                                                                                                                                                
    ],
    marqueeImages: [                                                                                                                                                                                                       
      "/images/ventura/tv.jpg",                                                                                                                                                                                                
      "/images/ventura/girl.jpg",                                                                                                                                                                                                
      "/images/ventura/book.jpg",                                                                                                                                                                                                
    ],
    previewSrc: "/images/ventura.png",                                                                                                                                                                                        
    heroImage: "/images/ventura.png",                                                                                                                                                                                         
    timeline: "Jan 5, 2025 - Feb 3, 2025",                                                                                                                                                                               
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],                                                                                                                                    
    metrics: [                                                                                                                                                                                                             
      { label: "Timeline", value: "Jan 5, 2025 - Feb 3, 2025" },                                                                                                                                                         
      { label: "Role", value: "Frontend Development" },                                                                                                                                                                            
      { label: "Focus", value: "Business marketplace and listing detail UX" },
    ],                                                                                                                                                                                                                     
    sections: [                                                                                                                                                                                                            
      {                                                                                                                                                                                                                    
        title: "Brief",                                                                                                                                                                                                    
        paragraphs: [                                                                                                                                                                                                      
          "Ventura is a business acquisition marketplace that helps founders list companies and helps buyers evaluate opportunities quickly. The UI surfaces price ranges, revenue, and verification status so trust is earned upfront.",                                                                                                                                                                                                        
          "The goal was to deliver a premium, finance-forward front end that combines marketing pages with functional marketplace flows while keeping the experience clean and approachable.",                             
        ],
      },                                                                                                                                                                                                                   
      {                                                                                                                                                                                                                    
        title: "Interaction Model",                                                                                                                                                                                        
        paragraphs: [                                                                                                                                                                                                      
          "Listings are built as cards with consistent metadata (industry tag, status, owner, and key financials) so users can scan and compare fast. Filters and category chips make discovery feel lightweight.",        
          "Detail pages expand into a structured data layout with business info, documents, and contact actions, while motion cues guide attention without distracting from due diligence.",                               
        ],
        highlights: [                                                                                                                                                                                                      
          "Reusable listing cards, category chips, and detail blocks for buyer and seller flows.",                                                                                                                         
          "Responsive layout for landing, marketplace, and detail screens with clear hierarchy.",
        ],                                                                                                                                                                                                                 
      },                                                                                                                                                                                                                   
      {                                                                                                                                                                                                                    
        title: "Outcome",                                                                                                                                                                                                  
        paragraphs: [                                                                                                                                                                                                      
          "Ventura now has a cohesive component system that supports the buyer journey from discovery to outreach while keeping verification and trust signals prominent.",                                                
          "The structure is ready for scaling into deal rooms, messaging, and analytics without redesigning the core UI.",                                                                                                 
        ],                                                                                                                                                                                                                 
      },                                                                                                                                                                                                                   
    ],                                                                                                                                                                                                                     
  },   
];
