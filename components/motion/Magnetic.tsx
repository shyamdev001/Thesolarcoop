"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useMediaQuery } from "./useMediaQuery";

type MagneticProps = {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1, default 0.3). */
  strength?: number;
  className?: string;
};

/**
 * Cursor-follow "pull" for a primary CTA or control (GSAP quickTo). Fine
 * pointers only — ignored on touch and for reduced-motion. Eases back to
 * rest on leave, no overshoot.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce || !fine || !ref.current) return;
    const el = ref.current;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * strength);
      yTo((event.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduce, fine, strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
