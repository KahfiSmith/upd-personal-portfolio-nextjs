"use client";

import { useLenis } from "@/hooks/useLenis";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useLenis();

  return <>{children}</>;
}
