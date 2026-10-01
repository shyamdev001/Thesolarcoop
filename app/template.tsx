"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";
import { WIPE } from "@/components/motion/tokens";

/**
 * template.tsx re-mounts on every client navigation. We use that to play a
 * page transition: a light-orange band, already covering the full screen,
 * rises and exits off the TOP — revealing the incoming page (already
 * mounted underneath by the time this runs) as it goes. Its leading edge is
 * a wave, not a flat line.
 *
 * The band's SHAPE is drawn once, as a plain constant string — it never
 * changes. The whole svg is one fixed-size "window" sized to the viewport
 * (viewBox 0 0 100 100, one unit = 1% of the screen), and everything the
 * viewer sees is that fixed shape translated up through it via a single
 * GSAP `yPercent` tween:
 *   yPercent 0    → sits at screen [0,100] — exactly fills the viewport.
 *   yPercent -100 → sits at screen [-100,0] — a full screen-height above.
 *
 * The band is armed ALREADY fully covering (yPercent 0), not animated in
 * from below. It used to rise from off-screen over ~220ms first — but by
 * the time this effect runs, the new page is already mounted underneath,
 * so that rise was a window of raw incoming content showing through before
 * the band caught up to hide it. Fine on a fast desktop; on a phone-class
 * CPU the gap read as "the new page loaded, then a transition played over
 * it" — backwards from the intent. Starting pre-covered means the very
 * first frame the browser paints after a navigation is already fully
 * orange — nothing underneath is ever visible before the reveal begins.
 *
 * An earlier version also recomputed and re-set the SVG path's `d` every
 * frame (with the wave's own amplitude growing/shrinking as it went) — that
 * forces the browser to re-layout and repaint actual SVG geometry every
 * frame, which is main-thread work, not compositor work. Fine on a fast
 * desktop, visibly janky on phone-class CPUs. A `transform` on a static
 * shape is compositor-only — the one thing guaranteed to stay smooth
 * everywhere. The cost: the wave's ripple is now a fixed silhouette instead
 * of pulsing in and out over the sweep — a deliberate trade for buttery
 * motion on every device, not a regression.
 *
 * Safety first — a stuck full-screen overlay would blank the site:
 *   • first load is skipped entirely (no transition on refresh)
 *   • skipped when the tab is hidden / viewport unmeasurable / reduced-motion
 *   • every mount starts by force-hiding the overlay (clears any leftover)
 *   • visibilitychange + a short timeout both force it hidden
 */
let firstMount = true;

const WAVE_HEIGHT = 16; // how far the wave bulges, in viewBox units (0–100)

/**
 * The band's shape in its own local space: a flat top edge at y=0, a wavy
 * bottom edge averaging y=100 (so the band is exactly one viewport tall,
 * before the wave). Two control points offset by different fixed amounts
 * so the curve isn't a perfect mirror of itself — reads as one side of the
 * wave leading the other, like a flag rippling. Computed once at module
 * load, never touched again.
 */
const BAND_PATH = (() => {
  const bTop = (100 + WAVE_HEIGHT).toFixed(2);
  const bBottom = (100 - WAVE_HEIGHT * 0.7).toFixed(2);
  return `M0,0 L100,0 L100,100 C75,${bTop} 25,${bBottom} 0,100 Z`;
})();

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useIsoLayoutEffect(() => {
    const overlay = overlayRef.current;
    const svg = svgRef.current;
    if (!overlay || !svg) return;

    const hardHide = () => {
      overlay.style.display = "none";
    };

    // Always clear a possible leftover from a previous transition.
    hardHide();

    if (firstMount) {
      firstMount = false;
      return;
    }
    if (
      reduce ||
      (typeof document !== "undefined" && document.hidden) ||
      !window.innerHeight
    ) {
      return;
    }

    // Arm the overlay already fully covering the screen — this runs in a
    // layout effect, before the browser paints this frame, so the incoming
    // page is never shown uncovered even for a moment.
    overlay.style.display = "block";
    gsap.set(svg, { yPercent: 0 });

    const timeline = gsap
      .timeline({ onComplete: hardHide, onInterrupt: hardHide })
      .to(
        svg,
        { yPercent: -100, duration: WIPE.revealDuration, ease: WIPE.revealEase },
        WIPE.holdDuration,
      );

    const failsafe = window.setTimeout(hardHide, 1600);
    document.addEventListener("visibilitychange", hardHide);

    return () => {
      timeline.kill();
      window.clearTimeout(failsafe);
      document.removeEventListener("visibilitychange", hardHide);
      hardHide();
    };
    // once per mount — template.tsx re-mounts on every navigation
  }, []);

  return (
    <>
      <div ref={overlayRef} className="page-wipe" aria-hidden="true">
        <svg
          ref={svgRef}
          className="page-wipe-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={BAND_PATH} fill="var(--accent-light)" />
        </svg>
      </div>
      {children}
    </>
  );
}
