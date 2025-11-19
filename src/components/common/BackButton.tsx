"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, type MouseEvent, type KeyboardEvent } from "react";
import { cn, shouldSkipClientNavigation } from "@/lib/utils";
import { usePageTransition } from "@/hooks";
import type { BackButtonProps } from "@/types";

export default function BackButton({
  className,
  href,
  label = "Back",
  disableTransition = false,
}: BackButtonProps) {
  const router = useRouter();
  const { navigate } = usePageTransition();

  const handleNavigate = useCallback(
    (event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      if (href) {
        if (event && shouldSkipClientNavigation(event)) return;
        event?.preventDefault();
        navigate(href, { label, disableCurtain: disableTransition });
        return;
      }
      router.back();
    },
    [disableTransition, href, label, navigate, router]
  );

  const buttonClasses = cn(
    "inline-flex items-center gap-2 cursor-pointer group text-charcoal/80 hover:text-charcoal transition-colors duration-300",
    className
  );

  const buttonContent = (
    <>
      <MoveLeft className="transition-transform duration-300 ease-in-out group-hover:text-charcoal group-hover:-translate-x-2" />
      <span className="font-semibold">{label}</span>
    </>
  );

  return (
    <button type="button" onClick={(event) => handleNavigate(event)} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}
