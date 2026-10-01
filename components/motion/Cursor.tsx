"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useMediaQuery } from "./useMediaQuery";

const INTERACTIVE =
  'a, button, summary, label, input, textarea, select, [role="button"], [data-cursor]';

const FLARE_RAYS = Array.from({ length: 8 }, (_, i) => i * 45);

/**
 * Two-layer cursor: a small precise dot that tracks the pointer almost
 * instantly, and a soft warm glow (sunlight, not a literal icon) trailing
 * behind it with more lag — the dot reads as precision, the glow as
 * ambient warmth. The OS cursor stays for actual precision (text carets,
 * resize handles); this is presence, not a replacement. A click fires a
 * quick sun-flare burst at the click point — the one moment the cursor
 * gets literal about the "solar" theme, kept rare so it stays a flourish.
 * Mouse + fine pointer only; nothing for touch or reduced-motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    const flare = flareRef.current;
    if (!dot || !glow || !flare || reduce || !fine) return;

    document.documentElement.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.to([dot, glow], { autoAlpha: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };
    const hide = () => {
      shown = false;
      gsap.to([dot, glow], { autoAlpha: 0, duration: 0.2 });
    };
    const over = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE)) {
        gsap.to(dot, { scale: 1.4, duration: 0.3, ease: "power3" });
        gsap.to(glow, { scale: 1.5, opacity: 1, duration: 0.4, ease: "power3" });
      }
    };
    const out = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE)) {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3" });
        gsap.to(glow, { scale: 1, opacity: "", duration: 0.4, ease: "power3" });
      }
    };
    const burst = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.killTweensOf(flare);
      gsap.set(flare, { x: e.clientX, y: e.clientY, scale: 0.4, autoAlpha: 1 });
      gsap.to(flare, { scale: 1.7, autoAlpha: 0, duration: 0.55, ease: "power2.out" });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    window.addEventListener("pointerdown", burst);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("pointerdown", burst);
      gsap.set([dot, glow, flare], { clearProps: "all" });
    };
  }, [reduce, fine]);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={flareRef} className="cursor-flare" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="5" fill="var(--accent)" />
          {FLARE_RAYS.map((deg) => (
            <line
              key={deg}
              x1="20"
              y1="4"
              x2="20"
              y2="11"
              stroke="var(--accent)"
              strokeWidth="2.4"
              strokeLinecap="round"
              transform={`rotate(${deg} 20 20)`}
            />
          ))}
        </svg>
      </div>
    </>
  );
}
