"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

interface BackButtonProps {
  href?: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
}

export default function BackButton({ href, label = "Back", icon, className }: BackButtonProps) {
  const router = useRouter();
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
    return (
      <Link href={href} className={baseClass}>
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
