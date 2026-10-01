"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useMediaQuery } from "./useMediaQuery";

type ParallaxProps = {
  children: ReactNode;
  /** Half the total travel across the scroll pass, in px (default 40). */
  distance?: number;
  className?: string;
};

/**
 * Subtle scroll-linked vertical movement (GSAP scrub). Compositor-only,
 * capped small. Off for reduced-motion and for coarse pointers (touch), so
 * mobile stays calm and cheap.
 */
export function Parallax({ children, distance = 40, className }: ParallaxProps) {
  const reduce = useReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || coarse || !ref.current) return;
    const el = ref.current;

    const tween = gsap.fromTo(
      el,
      { y: distance },
      {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduce, coarse, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
