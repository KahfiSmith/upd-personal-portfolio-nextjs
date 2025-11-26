"use client";

import AnimatedPillButton from "@/components/common/AnimatedPillButton";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-8 md:pt-12 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full opacity-18 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at center, #fef3c7 0%, #f3e8ff 55%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-10 -left-32 w-[300px] h-[300px] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at center, #f97316 0%, #ec4899 60%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-16 -right-32 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle at center, #8b5cf6 0%, #06b6d4 70%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-10 right-10 w-[250px] h-[180px] rounded-full opacity-12 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle at center, #a855f7 0%, #3b82f6 75%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full opacity-18 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle at center, #f59e0b 0%, #d946ef 65%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-16 left-1/3 w-[280px] h-[220px] rounded-full opacity-14 blur-[75px]"
          style={{
            background:
              "radial-gradient(circle at center, #06b6d4 0%, #8b5cf6 70%, transparent 100%)",
          }}
        ></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col justify-between pt-2 px-8 pb-8 md:pt-4 md:pb-12 max-w-[96rem] mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-sm md:text-base text-charcoal/60 font-medium max-w-xs">
            © Code by Kahfi Smith
          </div>

          <AnimatedPillButton
            data-get-in-touch
            label="Contact Me"
            href="/contact"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[3rem] sm:text-[5rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-medium leading-[0.75] text-charcoal mb-8 md:mb-12 font-display text-shadow-soft responsive-title">
              Portfolio
            </h1>
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-charcoal/85 font-display tracking-wide responsive-name">
                Mohamad Al-Kahfi
              </h2>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-charcoal/70 font-mono font-medium uppercase tracking-[0.15em] md:tracking-[0.25em] responsive-job">
                Frontend Web Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
