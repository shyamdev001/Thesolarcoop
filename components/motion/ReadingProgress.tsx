"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * An extremely subtle reading-progress line — 2px, fixed under the header,
 * filling as the reader moves through the article body. Tracks a target
 * element's scroll range rather than the whole document, so it reaches 100%
 * exactly when the article ends, not somewhere in the related-articles
 * section below it.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const bar = barRef.current;
    const target = document.getElementById(targetId);
    if (!bar || !target) return;

    if (reduce) {
      bar.style.transform = "scaleX(0)";
      return;
    }

    const st = ScrollTrigger.create({
      trigger: target,
      start: "top top+=64",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, [reduce, targetId]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress-bar" ref={barRef} />
    </div>
  );
}
