"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils/utils";
import { usePageTransition } from "@/hooks";

interface BackButtonProps {
  href?: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
  disableTransition?: boolean;
}

export default function BackButton({
  href,
  label = "Back",
  icon,
  className,
  disableTransition = false,
}: BackButtonProps) {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const baseClass = cn(
    "group inline-flex items-center gap-3 text-sm font-semibold text-charcoal/70 hover:text-charcoal transition-colors",
    className
  );
  const content = (
    <>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/50 text-charcoal/70 transition-transform duration-300 group-hover:-translate-x-1 group-active:-translate-x-1.5">
        {icon ?? <ArrowLeft className="h-4 w-4" />}
      </span>
      <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
        {label}
      </span>
    </>
  );

  if (href) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button !== 0 ||
        event.defaultPrevented
      ) {
        return;
      }
      event.preventDefault();
      navigate(href, { label, disableCurtain: disableTransition });
    };

    return (
      <Link href={href} className={baseClass} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => router.back()} className={baseClass}>
      {content}
    </button>
  );
}
