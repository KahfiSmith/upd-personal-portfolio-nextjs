"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { Briefcase, FolderGit2, User2, BookText } from "lucide-react";
import { MouseEvent, useCallback, useMemo } from "react";

export default function FloatingDockNav() {
  const onAnchorClick = useCallback((e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!hash?.startsWith("#")) return;
    e.preventDefault();
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis: any = (window as any).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.pushState(null, "", `#${id}`);
  }, []);

  const items = useMemo(
    () => [
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
