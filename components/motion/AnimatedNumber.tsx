"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { ABOVE_FOLD_RATIO } from "./tokens";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  /** Text appended after the number, e.g. "+", "%", "+ MWp". */
  suffix?: string;
  className?: string;
};

function format(value: number, decimals: number, suffix: string) {
  const n =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");
  return n + suffix;
}

/**
 * Count-up for a real statistic (GSAP tween + ScrollTrigger). Runs once,
 * quickly, when scrolled into view.
 *
 * • SSR renders the final value → correct with JS off, no CLS baseline.
 * • Numbers already on screen at load are NOT animated.
 * • Reduced-motion → the final value.
 * • Tabular figures so the width barely moves while counting.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const final = format(value, decimals, suffix);
  const [display, setDisplay] = useState(final);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight * ABOVE_FOLD_RATIO) {
      return; // already visible — keep the final value
    }

    let cancelled = false;
    let st: ScrollTrigger | null = null;
    let tween: gsap.core.Tween | null = null;

    // Same reasoning as MaskText: don't start counting (and don't measure
    // "is this already on screen") until the real font is in — a metrics
    // swap mid-count can nudge digit widths and the whole card around it.
    const start = () => {
      if (cancelled || !el) return;
      const proxy = { v: 0 };
      st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom-=10%",
        once: true,
        onEnter: () => {
          proxy.v = 0;
          // A gentler, more even curve than EASE.soft (power2.out) — that
          // one decelerates hard near the end, so the last ~10% of a big
          // number crawls for a beat and can read as "already finished"
          // right before it visibly jumps to the real total.
          tween = gsap.to(proxy, {
            v: value,
            duration: 1.1,
            ease: "power1.out",
            onUpdate: () => setDisplay(format(proxy.v, decimals, suffix)),
            onComplete: () => setDisplay(final),
          });
        },
      });
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      st?.kill();
      tween?.kill();
    };
  }, [reduce, value, decimals, suffix, final]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", minWidth: `${final.length}ch` }}
    >
      {display}
    </span>
  );
}
