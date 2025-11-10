import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns an additional scroll offset for in-page anchor jumps.
 * First checks for an explicit data-anchor-offset value on the section so designers
 * can fine-tune alignment manually. Falls back to heuristics for the About section.
 */
export function getAnchorScrollOffset(targetId: string, el?: HTMLElement) {
  if (typeof window === "undefined") return 0;
  const section = el ?? document.getElementById(targetId);
  if (!section) return 0;

  const manualAttr = section.getAttribute("data-anchor-offset");
  const manual = manualAttr ? Number(manualAttr) : NaN;
  if (!Number.isNaN(manual)) return manual;

  if (targetId !== "about") return 0;

  const cta = section.querySelector<HTMLElement>("[data-discover-button]");
  if (!cta) return 0;

  const sectionRect = section.getBoundingClientRect();
  const ctaRect = cta.getBoundingClientRect();
  const relativeBottom = ctaRect.bottom - sectionRect.top;
  const viewportAllowance = window.innerHeight - 180; // keep heading mostly visible
  if (relativeBottom <= viewportAllowance) return 0;

  const extra = relativeBottom - viewportAllowance;
  const maxOffset = window.innerHeight * 0.15;
  return Math.min(extra, maxOffset);
}
