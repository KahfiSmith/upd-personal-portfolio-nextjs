import type { FooterProps } from '../../types';

export default function Footer({
  headlinePrefix = "Let's Build Something",
  headlineHighlight = "Amazing",
  description = "I'm always excited to collaborate on interesting projects and bring creative ideas to life. Let's create something extraordinary together.",
  primaryButton = { label: "View My Work", href: "/projects" },
  secondaryButton = { label: "Get in Touch", href: "mailto:alkahfii2018@gmail.com" },
  socials = [
    { name: 'github', href: 'https://github.com/kahfismith' },
    { name: 'linkedin', href: 'https://www.linkedin.com/in/mohamad-al-kahfi-b48107271/' },
    { name: 'facebook', href: 'https://www.facebook.com/kahfi.smith.2025/' },
    { name: 'instagram', href: 'https://www.instagram.com/alkaahfi__/' },
  ],
  copyright = 'Portfolio 2025',
  tagline = 'Made with ❤️ and coffee',
}: FooterProps) {
  return (
    <footer className="enhanced-footer relative bg-charcoal text-cream py-16 md:py-20 overflow-hidden">
  
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-12">
          <div className="space-y-8">
            <div className="relative">
              <h3 className="font-display text-cream text-3xl md:text-5xl lg:text-6xl font-light tracking-tight group inline-block">
                <span className="footer-text-reveal">{headlinePrefix}</span>
                <span className="relative inline-block ml-4">
                  <span className="footer-gradient-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                    {headlineHighlight}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-700 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </span>
              </h3>
            </div>

            <div className="relative">
              <p className="text-cream/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto footer-description-reveal">
                {description}
              </p>
              <div className="absolute inset-0 bg-gradient-radial from-cream/5 via-transparent to-transparent blur-2xl opacity-60"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              {primaryButton && (
                <a
                  href={primaryButton.href}
                  className="primary-cta-btn magnetic-button group relative inline-flex items-center gap-2 px-8 py-4 bg-cream text-charcoal rounded-full transition-all duration-500 hover:scale-110 overflow-hidden text-lg font-medium cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <div className="absolute -inset-[3px] rounded-full ring-1 ring-charcoal/20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"></div>

                  <div className="absolute inset-0 rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <span className="relative z-20 font-semibold group-hover:text-charcoal transition-colors duration-300">{primaryButton.label}</span>
                  <svg className="relative z-20 w-5 h-5 transform group-hover:translate-x-2 group-hover:rotate-12 group-hover:scale-125 transition-all duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              )}

              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  className="get-in-touch-btn magnetic-button group relative inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-cream/30 text-cream transition-all duration-500 hover:scale-110 text-lg font-medium overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-full bg-charcoal"></div>

                  <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(120px 120px at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0))' }}></div>

                  <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-white/30 group-hover:w-full transition-all duration-500"></span>
                  <span className="pointer-events-none absolute right-0 bottom-0 h-px w-0 bg-white/20 group-hover:w-full transition-all duration-500"></span>

                  <div className="absolute -inset-[2px] rounded-full ring-1 ring-cream/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative z-20 font-semibold">{secondaryButton.label}</span>

                  <div className="relative z-20">
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 group-hover:rotate-12 group-hover:scale-125 transition-all duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </a>
              )}
            </div>
          </div>

          {socials && socials.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-6">
                {socials.map((s, index) => (
                  <a
                    key={s.name ?? index}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-social group relative p-3 text-cream/60 hover:text-cream transition-all duration-300 hover:scale-110"
                    aria-label={`${s.name} Profile`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-cream/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-full scale-110 group-hover:scale-125 transition-all duration-500 group-hover:animate-spin-slow"></div>
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-400/20 via-transparent to-transparent rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 blur-md"></div>
                    {s.name === 'github' && (
                      <svg className="relative z-10 w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {s.name === 'linkedin' && (
                      <svg className="relative z-10 w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {s.name === 'facebook' && (
                      <svg className="relative z-10 w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {s.name === 'instagram' && (
                      <svg className="relative z-10 w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative mt-16 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
            <div className="footer-copyright-reveal">
              {copyright}
            </div>
            <div className="footer-tagline-reveal flex items-center gap-2">
              <span>{tagline}</span>
            </div>
          </div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5"></div>
        </div>
      </div>
    </footer>
  );
}
