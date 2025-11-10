"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { getAnchorScrollOffset } from "@/lib/utils/utils";
import { Briefcase, FolderGit2, User2, BookText, Home } from "lucide-react";
import { MouseEvent, useCallback, useMemo } from "react";

export default function FloatingDockNav() {
  const onAnchorClick = useCallback((e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!hash?.startsWith("#")) return;
    e.preventDefault();
    const id = hash.replace(/^#/, "");
    // On home: smooth scroll to section
    const el = document.getElementById(id);
    if (!el) return;
    const lenis: any = (window as any).__lenis;
    const offset = getAnchorScrollOffset(id, el);
    if (lenis?.scrollTo) {
      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      lenis.scrollTo(el, { duration: 1.8, easing: easeInOutCubic, offset });
    } else {
      // Fallback manual tween for smoother-than-default behavior
      const startY = window.scrollY || window.pageYOffset || 0;
      const targetRect = el.getBoundingClientRect();
      const targetY = startY + targetRect.top + offset;
      const duration = 700; // ms
      const start = performance.now();
      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeInOutCubic(t);
        const y = startY + (targetY - startY) * eased;
        window.scrollTo(0, y);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    history.pushState(null, "", `#${id}`);
  }, []);

  const items = useMemo(
    () => [
      {
        title: "Home",
        icon: <Home className="h-5 w-5 text-white" />,
        href: "#hero",
        onClick: onAnchorClick,
      },
      {
        title: "About",
        icon: <User2 className="h-5 w-5 text-white" />,
        href: "#about",
        onClick: onAnchorClick,
      },
      {
        title: "Work Experience",
        icon: <Briefcase className="h-5 w-5 text-white" />,
        href: "#work-experience",
        onClick: onAnchorClick,
      },
      {
        title: "Projects",
        icon: <FolderGit2 className="h-5 w-5 text-white" />,
        href: "#projects",
        onClick: onAnchorClick,
      },
      {
        title: "Blog",
        icon: <BookText className="h-5 w-5 text-white" />,
        href: "/blog",
      },
    ],
    [onAnchorClick]
  );

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <FloatingDock
        items={items}
        desktopClassName="bg-neutral-900 text-white shadow-lg border border-white/10 backdrop-blur"
        mobileClassName=""
      />
    </div>
  );
}
