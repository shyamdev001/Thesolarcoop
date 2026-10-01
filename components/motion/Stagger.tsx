"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { armStagger } from "./reveal-core";
import { useReducedMotion } from "./useReducedMotion";
import { STAGGER } from "./tokens";

type StaggerProps = {
  children: ReactNode;
  as?: ElementType;
  /** Seconds between children (default 0.08). */
  gap?: number;
  /** Travel distance in px (default 18). */
  y?: number;
  className?: string;
};

/**
 * Staggered reveal of a container's direct children (cards, list items).
 * Same SSR-safe / off-screen-only rules as <Reveal>. No wrapper needed per
 * child — it animates whatever elements you render.
 */
export function Stagger({
  children,
  as: Tag = "div",
  gap = STAGGER,
  y = 18,
  className,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    return armStagger(ref.current, { gap, y });
  }, [reduce, gap, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
