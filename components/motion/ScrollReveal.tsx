"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "./gsap";
import {
  armImage,
  armReveal,
  hardRescue,
  revealAllArmed,
} from "./reveal-core";
import { useReducedMotion } from "./useReducedMotion";
import { STAGGER } from "./tokens";

/**
 * Site-wide reveal controller. Applies the shared motion language to markup
 * that is already in place:
 *   • [data-reveal]  → fade + upward rise   (GSAP ScrollTrigger)
 *   • framed photos  → clip-path wipe + scale settle
 *
 * Rebuilds its triggers after every client-side navigation and kills them on
 * cleanup. Reduced-motion → does nothing. A scroll listener + timers act as a
 * rescue so content is always shown, even if the ticker stalls.
 *
 * [data-reveal] siblings under the same parent (grid cards, stat rows, list
 * items — every card grid on the site marks each card individually, not the
 * grid as a whole) sit at almost the same scroll position, so their own
 * ScrollTriggers fire within the same frame — the whole row appearing at
 * once instead of cascading. Rather than require every grid to opt into
 * <Stagger> by hand, this walks the matches in DOM order and hands each one
 * a small extra delay based on its place among same-parent siblings, reset
 * per parent — the exact same idea as <Stagger>, applied automatically to
 * the [data-reveal] convention every section already uses.
 *
 * Sections can also use <Reveal> / <Stagger> / <ImageReveal> directly.
 */

const IMAGE_SELECTOR =
  "#main .about-photo img, #main .work-card-media img, #main .area-card--feature img, #main .page-hero-photo img, #main .detail-photo img, #main .pm-about-photo img";

export function ScrollReveal() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const cleanups = useRef<Array<() => void>>([]);

  useEffect(() => {
    if (reduce) {
      revealAllArmed();
      return;
    }

    let raf = 0;
    let scrollRaf = 0;
    const timeouts: number[] = [];

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        hardRescue();
      });
    };

    const build = () => {
      if (document.hidden) return;
      cleanups.current.forEach((fn) => fn());
      cleanups.current = [];

      const siblingIndex = new Map<Element, number>();
      document
        .querySelectorAll<HTMLElement>("#main [data-reveal], .site-footer [data-reveal]")
        .forEach((el) => {
          const parent = el.parentElement;
          const index = parent ? (siblingIndex.get(parent) ?? 0) : 0;
          if (parent) siblingIndex.set(parent, index + 1);
          cleanups.current.push(armReveal(el, { delay: index * STAGGER }));
        });
      document
        .querySelectorAll<HTMLElement>(IMAGE_SELECTOR)
        .forEach((el) => cleanups.current.push(armImage(el)));

      ScrollTrigger.refresh();
    };

    const onVisible = () => {
      if (!document.hidden && cleanups.current.length === 0) build();
      else hardRescue();
    };

    // On the very first load, this initial build() races Preloader.tsx's
    // own readiness wait (fonts + hero poster) — it can run before either
    // is ready, measuring elements against fallback-font metrics or a
    // layout that's about to shift. Rebuilding once the preloader confirms
    // things have actually settled re-measures everyone against the real
    // layout, so nothing gets stuck mis-classified as "already visible"
    // from that earlier, premature pass. A no-op on later navigations —
    // the preloader has already played by then and never fires this again.
    const onPreloaderComplete = () => build();

    raf = requestAnimationFrame(build);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("preloader-complete", onPreloaderComplete);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    timeouts.push(window.setTimeout(() => ScrollTrigger.refresh(), 400));
    timeouts.push(window.setTimeout(hardRescue, 1500));
    timeouts.push(window.setTimeout(hardRescue, 3500));
    timeouts.push(window.setTimeout(revealAllArmed, 9000));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      timeouts.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("preloader-complete", onPreloaderComplete);
      cleanups.current.forEach((fn) => fn());
      cleanups.current = [];
    };
  }, [reduce, pathname]);

  return null;
}
