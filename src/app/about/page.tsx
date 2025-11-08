import type { Metadata } from "next";
import TechOrbit from "@/components/features/about/TechOrbit";
import AboutPageEnhancer from "@/components/features/about/AboutPageEnhancer";

export const metadata: Metadata = {
  title: "About | Behind the Code",
  description: "Discover my story, what drives me, and the technologies I love.",
};

export default function AboutPage() {
  return (
    <main id="about-page" className="min-h-screen relative">
      <AboutPageEnhancer />
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-100/30 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
      </div>

      <section className="relative py-16 md:py-24">
        <div className="max-w-[96rem] mx-auto px-6 md:px-8">
          <div className="max-w-full mb-20">
            <div className="space-y-6">
              <div data-animate="fade-up" className="space-y-8">
                <h1 className="font-display text-charcoal text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-light">
                  Behind
                  <span className="block font-medium bg-gradient-to-r from-cyan-600 via-black to-cyan-600 bg-clip-text text-transparent">
                    the Code
                  </span>
                </h1>
                <div className="w-full h-1 bg-gradient-to-r from-charcoal via-cyan-500 to-charcoal rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 mb-32">
            <div className="lg:col-span-7 space-y-12">
              <div data-animate="fade-up" data-delay="0.2" className="group">
                <div className="space-y-6">
                  <div className="space-y-6 text-charcoal/80 text-lg md:text-2xl lg:text-2xl leading-relaxed">
                    <p>
                      I&apos;m a frontend web developer who believes that great user experiences are born from the intersection of beautiful design and performant code. My journey started with curiosity about how websites work, and it has evolved into a passion for creating digital experiences that feel both functional and magical.
                    </p>
                    <p>
                      When I&apos;m not crafting interfaces, you&apos;ll find me exploring new web technologies, contributing to open source, or enjoying a good cup of coffee while sketching ideas for my next project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div data-animate="fade-up" data-delay="0.4" className="sticky top-24">
                <div className="relative" data-tech-orbit>
                  <div data-orbit-center className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 group z-10">
                    <div className="w-full h-full rounded-full absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-sm scale-110" />

                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-gray-600/50 shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent" />

                      <div className="relative z-10 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg animate-pulse" />
                        <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: "8s" }} />
                        <div className="absolute inset-1 border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" as any }} />
                      </div>

                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-t from-cyan-400/50 to-transparent -translate-x-1/2 -translate-y-8" />
                        <div className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent -translate-x-1/2 translate-y-8" />
                        <div className="absolute left-0 top-1/2 h-px w-8 bg-gradient-to-l from-cyan-400/50 to-transparent -translate-y-1/2 -translate-x-8" />
                        <div className="absolute right-0 top-1/2 h-px w-8 bg-gradient-to-r from-cyan-400/50 to-transparent -translate-y-1/2 translate-x-8" />
                      </div>
                    </div>
                  </div>

                  <TechOrbit
                    icons={[
                      { src: "/icons/react.svg", alt: "React" },
                      { src: "/icons/nextjs.svg", alt: "Next.js" },
                      { src: "/icons/express.svg", alt: "Express" },
                      { src: "/icons/mysql-icon.svg", alt: "MySQL" },
                      { src: "/icons/postgresql.svg", alt: "PostgreSQL" },
                      { src: "/icons/nodejs-icon-alt.svg", alt: "Node.js" },
                      { src: "/icons/tailwindcss-icon.svg", alt: "Tailwind" },
                      { src: "/icons/git-icon.svg", alt: "Git" },
                    ]}
                    duration={26}
                    reverse={false}
                    keepUpright={true}
                    orbitRatio={0.75}
                  />
                </div>
              </div>
            </div>
          </div>

          <div data-animate="fade-up" data-delay="0.3" className="space-y-20 lg:space-y-24">
            <div className="text-center space-y-8">
              <h3 className="font-display text-charcoal text-4xl md:text-5xl lg:text-6xl font-light mb-12" data-drives-title>
                What Drives Me
              </h3>
              <div className="flex items-center justify-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-charcoal/40 to-charcoal/60" data-drives-line-left />
                <div className="px-6">
                  <div className="w-2 h-2 rounded-full bg-charcoal/70 shadow-sm" data-drives-dot />
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-charcoal/40 to-charcoal/60" data-drives-line-right />
              </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20" data-drives-container>
              {/* Item 01 */}
              <div className="drives-item group cursor-pointer" data-drives-item="1" data-magnetic>
                <div className="py-8 md:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="relative drives-number">
                          <span className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-charcoal/20">01</span>
                          <div className="absolute inset-0 font-display text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent opacity-0 drives-number-gradient">01</div>
                        </div>
                        <div className="w-px h-16 bg-charcoal/20 drives-divider" />
                        <div className="space-y-2">
                          <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal drives-title">Problem Solving</h4>
                          <div className="w-24 md:w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full drives-underline" />
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-charcoal/70 text-lg md:text-xl lg:text-2xl leading-relaxed drives-description">
                        Every project is a puzzle waiting to be solved. I thrive on breaking down complex challenges into manageable solutions, finding elegant ways to turn ideas into reality through thoughtful architecture and innovative thinking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 02 */}
              <div className="drives-item group cursor-pointer" data-drives-item="2" data-magnetic>
                <div className="py-8 md:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <p className="text-charcoal/70 text-lg md:text-xl lg:text-2xl leading-relaxed drives-description">
                        Technology evolves rapidly, and staying curious keeps me ahead. Whether it&apos;s exploring new frameworks, design patterns, or emerging web standards, I&apos;m always expanding my toolkit to deliver better solutions.
                      </p>
                    </div>
                    <div className="lg:col-span-5 order-1 lg:order-2">
                      <div className="flex items-center gap-6 justify-end lg:justify-start flex-row-reverse lg:flex-row">
                        {/* Title */}
                        <div className="space-y-2 text-right lg:text-left">
                          <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal drives-title">Continuous Learning</h4>
                          <div className="w-24 md:w-28 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full drives-underline ml-auto lg:ml-0" />
                        </div>
                        <div className="w-px h-16 bg-charcoal/20 drives-divider" />
                        <div className="relative drives-number">
                          <span className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-charcoal/20">02</span>
                          <div className="absolute inset-0 font-display text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-br from-emerald-400 to-teal-500 bg-clip-text text-transparent opacity-0 drives-number-gradient">02</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 03 */}
              <div className="drives-item group cursor-pointer" data-drives-item="3" data-magnetic>
                <div className="py-8 md:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="relative drives-number">
                          <span className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-charcoal/20">03</span>
                          <div className="absolute inset-0 font-display text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent opacity-0 drives-number-gradient">03</div>
                        </div>
                        <div className="w-px h-16 bg-charcoal/20 drives-divider" />
                        <div className="space-y-2">
                          <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal drives-title">User Impact</h4>
                          <div className="w-24 md:w-28 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full drives-underline" />
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-charcoal/70 text-lg md:text-xl lg:text-2xl leading-relaxed drives-description">
                        Behind every click is a real person with real needs. I&apos;m passionate about creating experiences that make people&apos;s lives easier, more productive, and more enjoyable. User satisfaction is my ultimate success metric.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
