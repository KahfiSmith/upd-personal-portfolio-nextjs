"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import type { ProjectItem } from "@/types";
import { dataProjects } from "@/data/projects";
import AnimatedPillButton from "@/components/common/AnimatedPillButton";
import { usePageTransition } from "@/hooks";

type ProjectsListProps = {
  limit?: number;
  showHeader?: boolean;
  sectionId?: string;
  showCTA?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  wrapperClassName?: string;
};

type MarqueeToken =
  | { type: "text"; value: string }
  | { type: "image"; value: string };

const buildTokens = (project: ProjectItem): MarqueeToken[] => {
  const fallbackTexts = [project.summary, project.role, ...(project.techStack ?? [])];
  const rawTexts = project.marqueeTexts && project.marqueeTexts.length > 0 ? project.marqueeTexts : fallbackTexts;

  const textBits = rawTexts
    .filter(
      (entry): entry is string =>
        typeof entry === "string" && entry.trim().length > 0
    )
    .map((entry) => entry.replace(/\.$/, "").toUpperCase());

  const uniqueText = Array.from(new Set(textBits));
  if (!uniqueText.length) uniqueText.push(project.title.toUpperCase());

  const customMarqueeImages = Array.isArray(project.marqueeImages) ? project.marqueeImages : [];
  const filteredImages = customMarqueeImages.filter(
    (src): src is string => typeof src === "string" && src.trim().length > 0
  );

  const tokens: MarqueeToken[] = [];
  uniqueText.forEach((text, index) => {
    tokens.push({ type: "text", value: text });
    if (filteredImages.length) {
      const imageIndex = index % filteredImages.length;
      tokens.push({ type: "image", value: filteredImages[imageIndex]! });
    }
  });

  if (!uniqueText.length && filteredImages.length) {
    tokens.push({ type: "image", value: filteredImages[0]! });
  }

  return tokens;
};

export default function ProjectsList({
  limit,
  showHeader = true,
  sectionId = "projects",
  showCTA = true,
  ctaHref = "/projects",
  ctaLabel = "View Full Projects",
  wrapperClassName = "max-w-[96rem] mx-auto px-6 md:px-8 lg:px-12",
}: ProjectsListProps = {}) {
  const { navigate } = usePageTransition();
  const projects = useMemo(() => {
    if (typeof limit === "number") {
      return dataProjects.slice(0, Math.max(0, limit));
    }
    return dataProjects;
  }, [limit]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [overlayState, setOverlayState] = useState<{ project: ProjectItem; key: number } | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<Record<number, HTMLElement | null>>({});
  const roleRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rowRefs = useRef<Record<number, HTMLElement | null>>({});
  const overlayContentRef = useRef<HTMLDivElement | null>(null);
  const lastRowTopRef = useRef<number | null>(null);
  const wipeDirectionRef = useRef<"down" | "up">("down");
  const firstRevealRef = useRef(true);
  const hideTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const overlayMoveTweenRef = useRef<gsap.core.Tween | null>(null);
  const overlayOpacityTweenRef = useRef<gsap.core.Tween | null>(null);
  const entryTweenRef = useRef<gsap.core.Tween | null>(null);
  const suppressExitRef = useRef(false);
  const deactivateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDeactivateTimeout = () => {
    if (deactivateTimeoutRef.current) {
      clearTimeout(deactivateTimeoutRef.current);
      deactivateTimeoutRef.current = null;
    }
  };

  const clearDebounceTimeout = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
  };

  const finishTween = (tween: gsap.core.Tween | gsap.core.Timeline | null) => {
    if (!tween) return;
    try {
      tween.progress(1, false);
    } catch {}
    tween.kill();
  };

  const resetOverlayImmediate = () => {
    finishTween(overlayMoveTweenRef.current);
    finishTween(overlayOpacityTweenRef.current);
    finishTween(hideTimelineRef.current);
    finishTween(entryTweenRef.current);
    overlayMoveTweenRef.current = null;
    overlayOpacityTweenRef.current = null;
    hideTimelineRef.current = null;
    entryTweenRef.current = null;
    lastRowTopRef.current = null;
    firstRevealRef.current = true;
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
    }
    setOverlayState(null);
  };

  const startSuppressExit = () => {
    suppressExitRef.current = true;
    clearDeactivateTimeout();
    finishTween(overlayMoveTweenRef.current);
    finishTween(overlayOpacityTweenRef.current);
    finishTween(hideTimelineRef.current);
    finishTween(entryTweenRef.current);
    overlayMoveTweenRef.current = null;
    overlayOpacityTweenRef.current = null;
    hideTimelineRef.current = null;
    entryTweenRef.current = null;
  };

  const marqueeTokens = useMemo(() => {
    const map = new Map<number, MarqueeToken[]>();
    projects.forEach((project) => {
      const built = buildTokens(project);
      const duplicated = built.length ? [...built, ...built, ...built] : built;
      map.set(project.id, duplicated);
    });
    return map;
  }, [projects]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      Object.values(titleRefs.current).forEach((node) => {
        if (!node) return;
        gsap.set(node, {
          color: "#171717",
          opacity: 1,
        });
      });
      Object.entries(roleRefs.current).forEach(([id, node]) => {
        if (!node) return;
        const isActive = Number(id) === activeId;
        gsap.to(node, {
          opacity: isActive ? 1 : 0.65,
          y: isActive ? 0 : 4,
          duration: 0.45,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeId]);

  const renderMarquee = (project: ProjectItem, isActive: boolean) => {
    const tokens = marqueeTokens.get(project.id) ?? [];
    const duration = Math.max(18, tokens.length * 1.8);

    const trackStyles = {
      animationPlayState: isActive ? "running" : "paused",
      ["--projects-marquee-duration" as "--projects-marquee-duration"]: `${duration}s`,
    };

    return (
      <div className="projects-marquee-viewport">
        <div className="projects-marquee-track" style={trackStyles}>
          {[0, 1].map((cloneIndex) => (
            <div
              key={`${project.id}-marquee-clone-${cloneIndex}`}
              className="projects-marquee-group"
              aria-hidden={cloneIndex === 1}
            >
              {tokens.map((token, index) =>
                token.type === "text" ? (
                  <span
                    key={`${project.id}-text-${cloneIndex}-${index}`}
                    className="projects-marquee-text"
                  >
                    {token.value}
                  </span>
                ) : (
                  <span
                    key={`${project.id}-img-${cloneIndex}-${index}`}
                    className="projects-marquee-media"
                  >
                    <img
                      src={token.value}
                      alt={`${project.title} preview asset`}
                      className="projects-marquee-media-image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const moveOverlay = (row: HTMLElement | null) => {
    if (!overlayRef.current || !listRef.current || !row) return;
    const listRect = listRef.current.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const top = rowRect.top - listRect.top;
    const height = rowRect.height;
    const prevTop = lastRowTopRef.current;
    if (prevTop !== null) {
      wipeDirectionRef.current = top >= prevTop ? "down" : "up";
    } else {
      wipeDirectionRef.current = "down";
    }
    lastRowTopRef.current = top;
    
    overlayMoveTweenRef.current?.kill();
    overlayMoveTweenRef.current = gsap.to(overlayRef.current, {
      y: top,
      height,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleActivate = (
    id: number | null,
    row?: HTMLElement | null,
    options?: { forceExit?: boolean }
  ) => {
    const forceExit = options?.forceExit ?? false;
    
    if (id === null) {
      if (forceExit) {
        suppressExitRef.current = false;
        if (activeId !== null) setActiveId(null);
        resetOverlayImmediate();
        clearDeactivateTimeout();
        return;
      } else if (suppressExitRef.current) {
        return;
      }
    }
    
    if (id || forceExit) clearDeactivateTimeout();
    
    const sameActive = typeof id === "number" && id === activeId;
    if (sameActive) {
      if (row) moveOverlay(row);
      return;
    }

    // Simple approach for switching between projects
    if (typeof id === "number" && activeId !== null && id !== activeId) {
      setActiveId(id);
      const project = projects.find((p) => p.id === id) ?? null;
      if (project) {
        setOverlayState({ project: { ...project }, key: Date.now() });
      }
      if (row) {
        moveOverlay(row);
      }
      return;
    }

    setActiveId(id);
    const project = id ? projects.find((p) => p.id === id) ?? null : null;
    if (project) {
      setOverlayState({ project: { ...project }, key: Date.now() });
    }
    
    if (!overlayRef.current) return;
    
    if (id && row) {
      suppressExitRef.current = false;
      hideTimelineRef.current?.kill();
      hideTimelineRef.current = null;
      moveOverlay(row);
      overlayOpacityTweenRef.current?.kill();
      overlayOpacityTweenRef.current = gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      suppressExitRef.current = false;
      lastRowTopRef.current = null;
      
      const content = overlayContentRef.current;
      const origin = wipeDirectionRef.current === "down" ? "50% 100%" : "50% 0%";
      
      hideTimelineRef.current?.kill();
      overlayMoveTweenRef.current?.kill();
      overlayOpacityTweenRef.current?.kill();
      
      const hideTween = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(overlayRef.current, { opacity: 0 });
          if (content) {
            gsap.set(content, { scaleY: 1, opacity: 1, transformOrigin: "50% 0%" });
          }
          setOverlayState(null);
          hideTimelineRef.current = null;
        },
      });
      
      if (content && overlayState) {
        hideTween.to(content, {
          scaleY: 0,
          opacity: 1,
          duration: 0.4,
          transformOrigin: origin,
        });
        hideTween.to(overlayRef.current, { opacity: 0, duration: 0.2 }, ">-0.1");
      } else {
        hideTween.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      }
      
      hideTimelineRef.current = hideTween;
      firstRevealRef.current = true;
    }
  };

  const requestDeactivate = () => {
    if (suppressExitRef.current) return;
    clearDeactivateTimeout();
    deactivateTimeoutRef.current = setTimeout(() => {
      deactivateTimeoutRef.current = null;
      handleActivate(null);
    }, 150);
  };

  const forceHideOverlay = () => {
    handleActivate(null, undefined, { forceExit: true });
  };

  const shouldBypassNavigation = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    return (
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.button !== 0
    );
  };

  useEffect(() => {
    const el = overlayContentRef.current;
    if (!overlayState || !el) {
      entryTweenRef.current?.kill();
      entryTweenRef.current = null;
      return;
    }
    const fromOrigin = wipeDirectionRef.current === "down" ? "50% 0%" : "50% 100%";
    const fromScale = firstRevealRef.current ? 0 : 0.95;
    const duration = firstRevealRef.current ? 0.4 : 0.25;
    entryTweenRef.current?.kill();
    entryTweenRef.current = gsap.fromTo(
      el,
      { scaleY: fromScale, opacity: firstRevealRef.current ? 0.9 : 1, transformOrigin: fromOrigin },
      { scaleY: 1, opacity: 1, duration, ease: "power2.out" }
    );
    firstRevealRef.current = false;
    return () => {
      entryTweenRef.current?.kill();
      entryTweenRef.current = null;
    };
  }, [overlayState]);

  useEffect(() => {
    return () => {
      suppressExitRef.current = false;
      clearDeactivateTimeout();
      clearDebounceTimeout();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative py-16 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className={wrapperClassName?.trim() ? wrapperClassName : undefined}>
        {showHeader && (
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="mb-4" data-reveal="right">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-charcoal font-medium leading-tight">
                <span className="bg-gradient-to-r from-cyan-600 to-black bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
            </div>
          </div>
        )}

        <div
          id="projects-list"
          ref={listRef}
          className="relative"
          onPointerLeave={requestDeactivate}
        >
          {projects.map((project, index) => {
            return (
              <article
                key={project.id}
                ref={(node) => {
                  rowRefs.current[project.id] = node;
                }}
                className="group relative"
                onPointerEnter={() =>
                  handleActivate(project.id, rowRefs.current[project.id] ?? null)
                }
                onFocusCapture={() =>
                  handleActivate(project.id, rowRefs.current[project.id] ?? null)
                }
                onBlurCapture={(event) => {
                  const next = event.relatedTarget as Node | null;
                  if (!next || !event.currentTarget.contains(next)) {
                    requestDeactivate();
                  }
                }}
              >
                {index === 0 && (
                  <div
                    className="pointer-events-none absolute top-0 left-0 w-full h-[2px] bg-charcoal/70 origin-left"
                    aria-hidden="true"
                  />
                )}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] bg-charcoal/50 origin-left"
                  aria-hidden="true"
                />

                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full relative z-0 py-8 md:py-10 lg:py-16 focus:outline-none"
                  aria-label={`Open ${project.title}`}
                  onPointerDown={startSuppressExit}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") startSuppressExit();
                  }}
                  onKeyUp={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    forceHideOverlay();
                    navigate(`/projects/${project.slug}`, { label: project.title });
                  }}
                  onClick={(event) => {
                    if (shouldBypassNavigation(event)) return;
                    event.preventDefault();
                    forceHideOverlay();
                    navigate(`/projects/${project.slug}`, { label: project.title });
                  }}
                >
                  <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
                    <div className="md:col-span-6 lg:col-span-6">
                      <h3
                        ref={(node) => {
                          titleRefs.current[project.id] = node;
                        }}
                        className="text-3xl md:text-4xl lg:text-6xl font-display font-bold text-charcoal transition-colors duration-300"
                      >
                        {project.title}
                      </h3>
                    </div>

                    <div className="md:col-span-6 lg:col-span-6 flex md:justify-end">
                      <div
                        ref={(node) => {
                          roleRefs.current[project.id] = node;
                        }}
                        className="text-charcoal/80 text-lg md:text-xl font-medium transition-all duration-300"
                      >
                        {project.role}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}

          <div
            ref={overlayRef}
            className="pointer-events-none absolute left-0 top-0 w-full opacity-0"
            style={{ zIndex: 5 }}
          >
            {overlayState && (
              <div
                ref={overlayContentRef}
                className="h-full w-full bg-charcoal text-white overflow-hidden"
              >
                <div className="flex h-full items-center">
                  {renderMarquee(overlayState.project, Boolean(activeId))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showCTA && (
          <div className="mt-16 text-center">
            <AnimatedPillButton
              href={ctaHref}
              data-discover-button
              data-magnetic
              label={ctaLabel}
              className="inline-flex"
            />
          </div>
        )}
      </div>
    </section>
  );
}
