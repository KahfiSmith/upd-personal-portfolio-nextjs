"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, type MouseEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils/utils";
import { usePageTransition } from "@/hooks";
import type { BackButtonProps } from "@/types";

export default function BackButton({
  title,
  subtitle,
  titleColor = "text-gray-900",
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
        if (event?.metaKey || event?.altKey || event?.ctrlKey || event?.shiftKey) {
          return;
        }
        event?.preventDefault();
        if (href.includes("#")) {
          try {
            (window as any).__instantHashScroll = true;
          } catch {}
        }
        navigate(href, { label, disableCurtain: disableTransition });
        return;
      }
      router.back();
    },
    [disableTransition, href, label, navigate, router]
  );

  const buttonClasses =
    "flex space-x-2 cursor-pointer group text-charcoal/80 hover:text-charcoal transition-colors duration-300";

  const buttonContent = (
    <>
      <MoveLeft className="transition-transform duration-300 ease-in-out group-hover:text-charcoal group-hover:-translate-x-2" />
      <span className="font-semibold">{label}</span>
    </>
  );

  return (
    <div className={cn("space-y-4", className)}>
      <button type="button" onClick={(event) => handleNavigate(event)} className={buttonClasses}>
        {buttonContent}
      </button>
      <div>
        <h2
          className={`mb-1 font-semibold text-xl md:text-2xl lg:text-3xl ${titleColor}`}
        >
          {title}
        </h2>
        <span className="font-normal text-base leading-7 text-charcoal/75">{subtitle}</span>
      </div>
    </div>
  );
}
