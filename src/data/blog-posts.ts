import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "cara-efektif-belajar-vocabulary-bahasa-inggris",
    title: "Cara Efektif Belajar Vocabulary Bahasa Inggris",
    excerpt:
      "Tips dan trik untuk menguasai kosakata bahasa Inggris dengan metode yang mudah dan menyenangkan.",
    content: [
      {
        type: "text",
        content:
          "Kalo yang ini tuh lebih ke menemukan kosa kata baru di bandingkan sama menghafal langsung. Tapi cara ini menurut gua ampuh karena bikin lu jadi familiar sama Inggris, dimulai dari kosakatanya, penggunaan katanya, Slangnya, Format maupun Informalnya, dan sebagainya.",
      },
      {
        type: "image",
        src: "/images/eduverse.png",
        alt: "Contoh pembelajaran vocabulary melalui media"
      },
      {
        type: "text",
        content:
          "Di cara ini, setiap ada kata baru tu kalian harus searching artinya, nanti lama-kelamaan bakal familiar kalo kalian rajin mah. Sering-sering rajin kalo bisa biar cepet jagoannya.",
      },
      {
        type: "text",
        content:
          "Jadi buat penggunaan kosakata tuh bakal lebih tau sama familiar. Ya memang kalo pake cara ini bakalan pusing karena gak tau artinya bahkan bingkob dulu. Tapi bisa kalian boleh kedua cara belajar kosakatanya. Hafalan kosakata langsung dan dengerin percakapan, itu bakal lebih ampuh.",
      },
      {
        type: "text",
        content:
          "Metode pembelajaran seperti ini sangat efektif untuk membangun fondasi vocabulary yang kuat. Dengan terbiasa mendengar dan melihat kata-kata dalam konteks yang natural, otak akan lebih mudah mengingat dan menggunakan kosakata tersebut dalam percakapan sehari-hari.",
      },
      {
        type: "text",
        content:
          "Selain itu, kalian juga bisa mencoba teknik chunking, yaitu mengelompokkan kata-kata berdasarkan tema atau kategori tertentu. Misalnya kata-kata yang berkaitan dengan makanan, transportasi, atau emosi. Ini akan membantu otak untuk membuat koneksi yang lebih kuat antar kata.",
      },
      {
        type: "text",
        content:
          "Jangan lupa juga untuk selalu praktek speaking dan writing. Kosakata yang sudah dipelajari harus digunakan dalam konteks nyata agar benar-benar tertanam di memori jangka panjang. Coba buat kalimat sendiri atau cerita pendek menggunakan vocabulary baru yang sudah dipelajari.",
      },
      {
        type: "image",
        src: "/images/coderoaster.png",
        alt: "Contoh praktek vocabulary dalam writing"
      },
      {
        type: "text",
        content:
          "Aplikasi mobile juga bisa jadi teman baik untuk belajar vocabulary. Ada banyak aplikasi seperti Anki, Quizlet, atau Memrise yang menggunakan sistem spaced repetition. Sistem ini terbukti efektif untuk mengingat kosakata dalam jangka panjang.",
      },
      {
        type: "text",
        content:
          "Yang paling penting adalah konsistensi. Lebih baik belajar 15-20 kata baru setiap hari secara konsisten daripada belajar 100 kata dalam satu hari tapi tidak dilanjutkan. Otak manusia lebih mudah mengingat informasi yang diterima secara bertahap dan berulang.",
      },
      {
        type: "image",
        src: "/images/kpopulls.png",
        alt: "Konsistensi dalam belajar vocabulary"
      },
      {
        type: "text",
        content:
          "Media sosial juga bisa dimanfaatkan untuk belajar bahasa Inggris. Follow akun-akun yang menggunakan bahasa Inggris sesuai dengan minat kalian. Misalnya kalau suka teknologi, follow tech influencers atau tech companies. Kalau suka olahraga, follow atlet atau sports channels.",
      },
      {
        type: "text",
        content:
          "Dengan cara ini, kalian akan terpapar vocabulary yang natural dan up-to-date. Plus, kalian juga jadi tahu trending topics dan slang yang sedang populer. Ini akan membuat bahasa Inggris kalian terdengar lebih natural dan tidak kaku.",
      },
    ],
    publishedAt: "2025-09-18",
    minuteRead: 6,
    tags: ["Bahasa Inggris", "Vocabulary", "Learning Tips"],
    heroImage: "/images/quowrld-page.png",
  },
  {
    id: 2,
    slug: "scaling-design-systems-with-nextjs",
    title: "Scaling Design Systems with Next.js",
    excerpt:
      "Lessons learned from turning a scrappy UI kit into a living system that powers multiple products.",
    content: [
      {
        type: "text",
        content:
          "The hardest part about design systems isn’t tokens or figma libraries—it’s governance. A system becomes real when teams trust it enough to stop reinventing buttons at 2 a.m.",
      },
      {
        type: "text",
        content:
          "Within Next.js apps, I lean on colocated stories, visual regression tests, and lint rules that guard slot props or typography rules. These guardrails keep the system flexible but cohesive.",
      },
      {
        type: "text",
        content:
          "As the component catalog grows, I document intent, not just usage. That narrative helps new contributors extend the system without diluting its voice.",
      },
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
      {
        type: "text",
        content:
          "Portfolios are playgrounds for motion. I experiment with Lenis, spring-based easing, and shader-driven gradients to make scroll feel like you’re gliding through stories.",
      },
      {
        type: "text",
        content:
          "Performance matters: buttery motion only delights if it stays above 60fps on everyday hardware. That’s why I prioritize GPU-friendly transforms, defer heavy shaders, and ship reduced-motion fallbacks.",
      },
      {
        type: "text",
        content:
          "Ultimately these touches aren’t about flexing tech—they’re about hospitality. Visitors should feel guided, never lost, as they explore the work.",
      },
    ],
    publishedAt: "2025-04-14",
    minuteRead: 5,
    tags: ["Motion", "Lenis", "Portfolio"],
    heroImage: "/images/coderoaster.png",
  },
];
