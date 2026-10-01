"use client";

import { gsap, ScrollTrigger } from "./gsap";
import {
  ABOVE_FOLD_RATIO,
  DUR,
  EASE,
  IMAGE_TRIGGER_START,
  REVEAL_Y,
  STAGGER,
  TRIGGER_START,
} from "./tokens";

/**
 * GSAP + ScrollTrigger reveal engine behind <Reveal>, <Stagger>, <ImageReveal>
 * and the <ScrollReveal> controller.
 *
 * Hard rules for this project (blanked content on refresh is a known past sin):
 *   • An element is only ever hidden if it is genuinely off screen at setup.
 *     When the viewport can't be measured or the tab is hidden we NEVER hide.
 *   • Every armed element is tracked. hardRescue() force-shows (no animation)
 *     any armed element that is in view — called on scroll and on a timer, so
 *     content appears even if ScrollTrigger's rAF is starved (background tab).
 *   • Reveals clear their inline styles when done so CSS hover still works.
 */

const NOOP = () => {};

/** armed element -> reveal-now (animated) fn */
const registry = new Map<HTMLElement, { show: () => void; kind: "fade" | "image" }>();

function isAlreadyVisible(el: Element) {
  if (typeof document === "undefined" || document.hidden) return true;
  const vh = window.innerHeight;
  if (!vh) return true;
  return el.getBoundingClientRect().top < vh * ABOVE_FOLD_RATIO;
}

function cleanupFade(el: HTMLElement) {
  el.style.transform = "";
  el.style.willChange = "";
}
function cleanupImage(el: HTMLElement) {
  el.style.clipPath = "";
  el.style.transform = "";
  el.style.willChange = "";
}

type RevealOptions = { y?: number; delay?: number };

export function armReveal(
  el: HTMLElement,
  { y = REVEAL_Y, delay = 0 }: RevealOptions = {},
): () => void {
  if (isAlreadyVisible(el)) return NOOP;

  gsap.set(el, { opacity: 0, y });

  const show = () => {
    if (!registry.has(el)) return;
    registry.delete(el);
    st.kill();
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: DUR.base,
      ease: EASE.out,
      delay,
      overwrite: "auto",
      onComplete: () => cleanupFade(el),
    });
  };

  const st = ScrollTrigger.create({
    trigger: el,
    start: TRIGGER_START,
    once: true,
    onEnter: show,
  });
  registry.set(el, { show, kind: "fade" });

  return () => {
    registry.delete(el);
    st.kill();
    gsap.set(el, { clearProps: "opacity,transform,willChange" });
  };
}

export function armStagger(
  container: HTMLElement,
  { y = 18, gap = STAGGER }: { y?: number; gap?: number } = {},
): () => void {
  const kids = Array.from(container.children) as HTMLElement[];
  if (kids.length === 0) return NOOP;
  const cleanups = kids.map((k, i) => armReveal(k, { y, delay: i * gap }));
  return () => cleanups.forEach((c) => c());
}

export function armImage(el: HTMLElement): () => void {
  if (isAlreadyVisible(el)) return NOOP;

  gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.06 });

  const show = () => {
    if (!registry.has(el)) return;
    registry.delete(el);
    st.kill();
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: DUR.slow,
      ease: EASE.soft,
      overwrite: "auto",
      onComplete: () => cleanupImage(el),
    });
  };

  const st = ScrollTrigger.create({
    trigger: el,
    start: IMAGE_TRIGGER_START,
    once: true,
    onEnter: show,
  });
  registry.set(el, { show, kind: "image" });

  return () => {
    registry.delete(el);
    st.kill();
    gsap.set(el, { clearProps: "clipPath,transform,scale,willChange" });
  };
}

/**
 * Instantly show (no animation) any armed element that is in view. Runs off
 * plain style writes — works even when GSAP's ticker is starved.
 */
export function hardRescue() {
  if (registry.size === 0) return;
  const vh = window.innerHeight || 0;
  registry.forEach(({ kind }, el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.98 && r.bottom > 0) {
      registry.delete(el);
      el.style.opacity = "1";
      if (kind === "image") {
        el.style.clipPath = "inset(0% 0% 0% 0%)";
        el.style.transform = "";
      } else {
        el.style.transform = "";
      }
      el.style.willChange = "";
    }
  });
}

/** Last resort: show everything still armed. */
export function revealAllArmed() {
  registry.forEach((_, el) => {
    el.style.opacity = "1";
    el.style.clipPath = "";
    el.style.transform = "";
    el.style.willChange = "";
  });
  registry.clear();
}
