"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";

type LiveNumberProps = {
  value: number;
  /** Formats the in-progress + final value — do currency/unit formatting
   * here rather than passing a bare number, so intermediate frames read
   * as cleanly as the settled one. */
  format: (n: number) => string;
  className?: string;
};

/**
 * A number that tweens to a new value every time `value` changes — for a
 * live control (a slider, a calculator), not a one-time scroll count-up
 * (that's <AnimatedNumber>/<CountStat>, which is gated on scroll visibility
 * and wrong here since this is always on-screen while the reader drags).
 */
export function LiveNumber({ value, format, className }: LiveNumberProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const proxyRef = useRef({ v: value });

  useEffect(() => {
    if (reduce) return; // rendered straight from `value` below instead
    const tween = gsap.to(proxyRef.current, {
      v: value,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setDisplay(proxyRef.current.v),
    });
    return () => {
      tween.kill();
    };
  }, [value, reduce]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(reduce ? value : display)}
    </span>
  );
}
