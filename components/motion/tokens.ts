/**
 * The Solar Coop motion language — one set of timings and curves shared by
 * every animation so the site feels like a single, deliberate piece of work.
 *
 * Feel: calm, editorial, quick enough to feel responsive, never bouncy.
 *
 * Hierarchy:
 *   PRIMARY   image reveals / section entrances .. DUR.slow  + EASE.soft
 *   SECONDARY headings, cards, stagger ........... DUR.base  + EASE.out
 *   MICRO     buttons, links, icons (CSS) ........ DUR.micro + EASE.out
 */

// seconds — GSAP durations
export const DUR = {
  micro: 0.18,
  short: 0.32,
  base: 0.7,
  slow: 1.0,
} as const;

// GSAP ease strings
export const EASE = {
  out: "power3.out", // decisive settle — default for reveals
  soft: "power2.out", // gentle — large moves, image reveals
  none: "none", // scrub / parallax
} as const;

/** Seconds between staggered children. */
export const STAGGER = 0.08;

/** Default upward travel for a reveal, in px. */
export const REVEAL_Y = 24;

/**
 * ScrollTrigger start position. Fires the reveal a little before the element
 * is fully in view.
 */
export const TRIGGER_START = "top bottom-=8%";
export const IMAGE_TRIGGER_START = "top bottom-=4%";

/**
 * Elements whose top is above `innerHeight * ABOVE_FOLD_RATIO` at setup are
 * already visible — shown instantly, never animated. Only content the reader
 * scrolls *to* reveals, so a refresh never shows the page building itself.
 *
 * Kept tight (well under 1.0) on purpose: every page here is built from
 * full-screen `min-height: 100vh` sections, so the section right after any
 * hero starts at ~1.0× the viewport height. A looser ratio (this was 1.05)
 * treats that section's heading as "already visible" at scrollY 0 and skips
 * its reveal — the exact inconsistency of "some headings animate, some
 * don't" that shows up one section after every hero on every page.
 */
export const ABOVE_FOLD_RATIO = 0.9;

/** Lenis smooth-scroll config — a touch heavier / more "designed". */
export const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.5,
} as const;

/** Heading mask-reveal (word-by-word rise from behind its own baseline). */
export const HEADING = {
  yPercent: 110,
  duration: 0.72,
  ease: "power4.out",
  stagger: 0.052,
} as const;

/**
 * Page-transition wipe — the band starts already covering the screen (see
 * app/template.tsx for why) and exits off the top, revealing the new page.
 * Stays inside the 500–700ms "feels like a transition, not a loading
 * screen" range.
 */
export const WIPE = {
  revealDuration: 0.58,
  revealEase: "power3.inOut",
} as const;
