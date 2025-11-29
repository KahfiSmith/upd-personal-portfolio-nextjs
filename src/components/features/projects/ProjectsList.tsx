"use client";

import AnimatedPillButton from "@/components/common/AnimatedPillButton";
import { dataProjects } from "@/data/projects";
import { usePageTransition } from "@/hooks";
import { shouldSkipClientNavigation } from "@/lib/utils";
import type { ProjectItem } from "@/types";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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

const MIN_MARQUEE_TOKENS = 8;

const ensureMarqueeDensity = (tokens: MarqueeToken[]): MarqueeToken[] => {
  if (tokens.length >= MIN_MARQUEE_TOKENS) return tokens;
  if (!tokens.length) return tokens;
  const extended: MarqueeToken[] = [...tokens];
  while (extended.length < MIN_MARQUEE_TOKENS) {
    extended.push(...tokens);
  }
  return extended;
};

const buildTokens = (project: ProjectItem): MarqueeToken[] => {
  const fallbackTexts = [
    project.summary,
    project.role,
    ...(project.techStack ?? []),
  ];
  const rawTexts =
    project.marqueeTexts && project.marqueeTexts.length > 0
      ? project.marqueeTexts
      : fallbackTexts;

  const textBits = rawTexts
    .filter(
      (entry): entry is string =>
        typeof entry === "string" && entry.trim().length > 0
    )
    .map((entry) => entry.replace(/\.$/, "").toUpperCase());

  const uniqueText = Array.from(new Set(textBits));
  if (!uniqueText.length) uniqueText.push(project.title.toUpperCase());

  const customMarqueeImages = Array.isArray(project.marqueeImages)
    ? project.marqueeImages
    : [];
  const filteredImages = customMarqueeImages.filter(
    (src): src is string => typeof src === "string" && src.trim().length > 0
  );

  const tokens: MarqueeToken[] = [];
  const pairCount = Math.max(uniqueText.length, filteredImages.length);
  for (let index = 0; index < pairCount; index += 1) {
    const text = uniqueText[index];
    if (text) {
      tokens.push({ type: "text", value: text });
    }
    const image = filteredImages[index];
    if (image) {
      tokens.push({ type: "image", value: image });
    }
  }

  if (!tokens.length && filteredImages.length) {
    tokens.push({ type: "image", value: filteredImages[0]! });
  }

  if (!tokens.length) {
    tokens.push({ type: "text", value: project.title.toUpperCase() });
  }

  if (tokens.length === 1) {
    const fallbackBase =
      project.role ?? project.summary ?? project.title ?? "PROJECT";
    const fallbackText = fallbackBase.toUpperCase();
    const firstToken = tokens[0];
    if (firstToken.type === "text") {
      if (firstToken.value !== fallbackText) {
        tokens.push({ type: "text", value: fallbackText });
      } else {
        tokens.push({ type: "text", value: `${fallbackText} •` });
      }
    } else {
      const nextImage = filteredImages[1] ?? filteredImages[0];
      if (nextImage && nextImage !== firstToken.value) {
        tokens.push({ type: "image", value: nextImage });
      } else {
        tokens.push({ type: "text", value: fallbackText });
      }
    }
  }

  return tokens;
};

const getPreviewImage = (project: ProjectItem): string | null => {
  if (project.previewSrc) return project.previewSrc;
  if (project.heroImage) return project.heroImage;
  if (Array.isArray(project.detailImages) && project.detailImages.length > 0) {
    return project.detailImages[0] ?? null;
  }
  if (
    Array.isArray(project.marqueeImages) &&
    project.marqueeImages.length > 0
  ) {
    return project.marqueeImages[0] ?? null;
  }
  return null;
};

type PreviewLayer = {
  projectId: number;
  src: string;
  key: string;
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
  const [overlayState, setOverlayState] = useState<{
    project: ProjectItem;
    key: string;
  } | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<Record<number, HTMLElement | null>>({});
  const roleRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rowRefs = useRef<Record<number, HTMLElement | null>>({});
  const overlayContentRef = useRef<HTMLDivElement | null>(null);
  const activeRowRef = useRef<HTMLElement | null>(null);
  const [previewLayers, setPreviewLayers] = useState<PreviewLayer[]>([]);
  const previewImageRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const lastRowTopRef = useRef<number | null>(null);
  const wipeDirectionRef = useRef<"down" | "up">("down");
  const firstRevealRef = useRef(true);
  const hideTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const overlayMoveTweenRef = useRef<gsap.core.Tween | null>(null);
  const overlayOpacityTweenRef = useRef<gsap.core.Tween | null>(null);
  const entryTweenRef = useRef<gsap.core.Tween | null>(null);
  const suppressExitRef = useRef(false);
  const deactivateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewHideTimelineRef = useRef<gsap.core.Timeline | null>(null);

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
    activeRowRef.current = null;
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
      const normalized = ensureMarqueeDensity(built);
      map.set(project.id, normalized);
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
    const duration = Math.max(20, tokens.length * 2.2);

    const trackStyles: CSSProperties & { "--projects-marquee-duration": string } = {
      animationPlayState: isActive ? "running" : "paused",
      "--projects-marquee-duration": `${duration}s`,
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
                    className="projects-marquee-media relative"
                  >
                    <Image
                      src={token.value}
                      alt={`${project.title} preview asset`}
                      fill
                      className="projects-marquee-media-image object-cover"
                      sizes="120px"
                      onError={(event) => {
                        const target = event.currentTarget;
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

  const moveOverlay = (
    row: HTMLElement | null,
    options?: { immediate?: boolean }
  ) => {
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
    activeRowRef.current = row;

    if (options?.immediate) {
      overlayMoveTweenRef.current?.kill();
      overlayMoveTweenRef.current = null;
      gsap.set(overlayRef.current, { y: top, height });
      return;
    }

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
        setOverlayState({
          project: { ...project },
          key: `${project.id}-${Date.now()}`,
        });
      }
      if (row) {
        moveOverlay(row);
      }
      return;
    }

    setActiveId(id);
    const project = id ? projects.find((p) => p.id === id) ?? null : null;
    if (project) {
      setOverlayState({
        project: { ...project },
        key: `${project.id}-${Date.now()}`,
      });
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
      const content = overlayContentRef.current;
      const origin =
        wipeDirectionRef.current === "down" ? "50% 100%" : "50% 0%";

      hideTimelineRef.current?.kill();
      overlayMoveTweenRef.current?.kill();
      overlayOpacityTweenRef.current?.kill();

      if (activeRowRef.current) {
        moveOverlay(activeRowRef.current, { immediate: true });
      }

      const hideTween = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(overlayRef.current, { opacity: 0 });
          if (content) {
            gsap.set(content, {
              scaleY: 1,
              opacity: 1,
              transformOrigin: "50% 0%",
            });
          }
          setOverlayState(null);
          hideTimelineRef.current = null;
          lastRowTopRef.current = null;
          activeRowRef.current = null;
        },
      });

      if (content && overlayState) {
        hideTween.to(content, {
          scaleY: 0,
          opacity: 1,
          duration: 0.4,
          transformOrigin: origin,
        });
        hideTween.to(
          overlayRef.current,
          { opacity: 0, duration: 0.2 },
          ">-0.1"
        );
      } else {
        hideTween.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      }

      hideTimelineRef.current = hideTween;
      firstRevealRef.current = true;
    }
  };

  const previewProject = overlayState?.project ?? null;
  const previewImage = previewProject ? getPreviewImage(previewProject) : null;

  useEffect(() => {
    if (!previewProject || !previewImage) return;
    setPreviewLayers((layers) => {
      return [
        ...layers,
        {
          projectId: previewProject.id,
          src: previewImage,
          key: `${previewProject.id}-${Date.now()}-${Math.random()}`,
        },
      ].slice(-3);
    });
  }, [previewProject, previewImage]);

  useEffect(() => {
    if (overlayState) {
      previewHideTimelineRef.current?.kill();
      previewHideTimelineRef.current = null;
      return;
    }

    const nodes = Object.values(previewImageRefs.current).filter(
      (node): node is HTMLImageElement => Boolean(node)
    );
    if (!nodes.length) {
      setPreviewLayers([]);
      return;
    }

    previewHideTimelineRef.current?.kill();
    previewHideTimelineRef.current = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setPreviewLayers([]);
        previewHideTimelineRef.current = null;
      },
    });

    const topNode = nodes[nodes.length - 1];
    const remainingNodes = nodes.slice(0, -1);

    if (remainingNodes.length) {
      previewHideTimelineRef.current.to(remainingNodes, {
        opacity: 0,
        scale: 0.75,
        y: 24,
        filter: "blur(8px)",
        duration: 0.25,
        stagger: 0.03,
        transformOrigin: "50% 50%",
      });
    }

    if (topNode) {
      previewHideTimelineRef.current.to(
        topNode,
        {
          opacity: 0,
          scale: 0.35,
          y: 50,
          filter: "blur(14px)",
          duration: 0.35,
          transformOrigin: "50% 100%",
          ease: "power3.inOut",
        },
        0
      );
    }
  }, [overlayState]);

  useLayoutEffect(() => {
    if (!previewLayers.length) return;
    const ctx = gsap.context(() => {
      previewLayers.forEach((layer, index) => {
        const node = previewImageRefs.current[layer.key];
        if (!node) return;
        const isTop = index === previewLayers.length - 1;
        if (isTop) {
          gsap.fromTo(
            node,
            { opacity: 0, scale: 0.65, y: 40, filter: "blur(12px)" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.65,
              ease: "power3.out",
            }
          );
        } else {
          gsap.to(node, {
            opacity: 0.45,
            scale: 0.88,
            y: -22,
            filter: "blur(4px)",
            duration: 0.65,
            ease: "power3.out",
          });
        }
      });
    });
    return () => ctx.revert();
  }, [previewLayers]);

  const requestDeactivate = () => {
    if (suppressExitRef.current) return;
    clearDeactivateTimeout();
    handleActivate(null);
  };

  const forceHideOverlay = () => {
    handleActivate(null, undefined, { forceExit: true });
  };

  useEffect(() => {
    const el = overlayContentRef.current;
    if (!overlayState || !el) {
      entryTweenRef.current?.kill();
      entryTweenRef.current = null;
      return;
    }
    const fromOrigin =
      wipeDirectionRef.current === "down" ? "50% 0%" : "50% 100%";
    const fromScale = firstRevealRef.current ? 0 : 0.95;
    const duration = firstRevealRef.current ? 0.4 : 0.25;
    entryTweenRef.current?.kill();
    entryTweenRef.current = gsap.fromTo(
      el,
      {
        scaleY: fromScale,
        opacity: firstRevealRef.current ? 0.9 : 1,
        transformOrigin: fromOrigin,
      },
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
                  handleActivate(
                    project.id,
                    rowRefs.current[project.id] ?? null
                  )
                }
                onFocusCapture={() =>
                  handleActivate(
                    project.id,
                    rowRefs.current[project.id] ?? null
                  )
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
                    if (event.key === "Enter" || event.key === " ")
                      startSuppressExit();
                  }}
                  onKeyUp={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    suppressExitRef.current = true;
                    navigate(`/projects/${project.slug}`, {
                      label: project.title,
                    });
                  }}
                  onClick={(event) => {
                    if (shouldSkipClientNavigation(event)) return;
                    event.preventDefault();
                    suppressExitRef.current = true;
                    navigate(`/projects/${project.slug}`, {
                      label: project.title,
                    });
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

        {previewLayers.length > 0 && (
          <div className="pointer-events-none fixed bottom-6 right-6 z-[60] hidden lg:block">
            <div className="relative aspect-[4/3] w-[360px] sm:w-[460px] overflow-hidden rounded-md">
              {previewLayers.map((layer, index) => {
                const isTop = index === previewLayers.length - 1;
                return (
                  <Image
                    key={layer.key}
                    ref={(node) => {
                      if (node) {
                        previewImageRefs.current[layer.key] = node;
                      } else {
                        delete previewImageRefs.current[layer.key];
                      }
                    }}
                    src={layer.src}
                    alt={`Preview ${layer.projectId}`}
                    fill
                    className="absolute inset-0 h-full w-full rounded-md object-cover"
                    sizes="(min-width: 1024px) 460px, 360px"
                    style={{
                      zIndex: index + 1,
                      boxShadow: isTop ? "0 20px 60px rgba(0,0,0,0.45)" : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

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
