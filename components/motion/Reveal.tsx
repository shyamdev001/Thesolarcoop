"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { armReveal } from "./reveal-core";
import { useReducedMotion } from "./useReducedMotion";
import { REVEAL_Y } from "./tokens";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Travel distance in px (default 24). */
  y?: number;
  /** Delay in seconds — offset supporting text after a heading. */
  delay?: number;
  className?: string;
};

/**
 * Fade + upward reveal, once, when scrolled into view (GSAP ScrollTrigger).
 * SSR-safe: children render at full opacity; JS only hides the element if it
 * is off screen at load, so a refresh never animates visible content.
 */
export function Reveal({
  children,
  as: Tag = "div",
  y = REVEAL_Y,
  delay = 0,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    return armReveal(ref.current, { y, delay });
  }, [reduce, y, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
