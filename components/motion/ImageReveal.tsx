"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { armImage } from "./reveal-core";
import { useReducedMotion } from "./useReducedMotion";

type ImageRevealProps = {
  /** An <img>, <picture> or <video> element. */
  children: ReactNode;
  className?: string;
};

/**
 * Premium image reveal: a left-to-right clip-path wipe with a subtle
 * 1.06 → 1 scale settle, once. The image is stable afterwards (CSS hover
 * treatments take over). The wrapper clips overflow — give it the sizing /
 * aspect ratio you want.
 */
export function ImageReveal({ children, className }: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const media = ref.current.querySelector<HTMLElement>("img, picture, video");
    if (!media) return;
    return armImage(media);
  }, [reduce]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {children}
    </div>
  );
}
