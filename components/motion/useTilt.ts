"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Subtle cursor-tilt for a single feature card (GSAP quickTo, 3D transform).
 * Fine pointers only, ignored for reduced-motion and touch. Eases back flat
 * on leave — no overshoot, no permanent motion.
 */
export function useTilt(ref: RefObject<HTMLElement | null>, maxDeg = 5) {
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    if (reduce || !fine || !ref.current) return;
    const el = ref.current;

    gsap.set(el, { transformPerspective: 900 });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(el, {
        rotateY: px * maxDeg * 2,
        rotateX: -py * maxDeg * 2,
        y: -4,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    };
    
    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduce, fine, maxDeg, ref]);
}
