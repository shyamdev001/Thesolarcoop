"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { LENIS_OPTIONS } from "./tokens";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Where a cross-page anchor click (e.g. a footer link to
 * /services/#residential) stashes its target hash, to be picked up once
 * the destination page has mounted. sessionStorage, not the URL: Next.js's
 * own router consumes/strips the hash from the URL during a client-side
 * <Link> transition before our post-navigation effect ever gets to read
 * it, so window.location.hash is unreliable for this specific case. */
const PENDING_HASH_KEY = "tsc-pending-scroll-hash";

// Must match `html { scroll-padding-top }` in globals.css. Lenis's own
// scrollTo already reads that CSS property and subtracts it when computing
// where to land (see node_modules/lenis/dist/lenis.js) — this file used to
// ALSO pass an explicit `offset: -96` on every call, double-subtracting
// the header height (each landing ~192px past where it should, not 96px),
// which is why anchor clicks were overshooting their target. The gap
// comes from the CSS alone now; this constant is only for the drift
// check below.
const HEADER_OFFSET = 96;

/**
 * Scroll to an anchor target, then correct for drift once or twice as the
 * page settles. Landing a hash target isn't a one-shot calculation on this
 * site: images and fonts further down the page can still be loading when
 * we scroll, shifting the target's real position out from under us —
 * true whether the scroll was animated or an instant jump, since either
 * way we computed the target's position before the page had finished
 * growing into its final layout. Skips correcting if the drift is bigger
 * than a full viewport (the reader has very likely scrolled away on their
 * own by then, and a late correction should never fight that).
 */
function landOnTarget(
  lenis: Lenis,
  target: Element,
  scrollOpts: { duration?: number; immediate?: boolean },
) {
  lenis.scrollTo(target as HTMLElement, { ...scrollOpts });

  const settle = () => {
    const drift = target.getBoundingClientRect().top - HEADER_OFFSET;
    if (Math.abs(drift) > 6 && Math.abs(drift) < window.innerHeight) {
      lenis.scrollTo(target as HTMLElement, { immediate: true });
    }
  };
  window.setTimeout(settle, 450);
  window.setTimeout(settle, 1100);
}

/**
 * Lenis smooth scroll, driven by the GSAP ticker and kept in sync with
 * ScrollTrigger. Also handles #anchor links (same-page, with a header
 * offset, and cross-page — a link to another page's #section), and
 * otherwise resets scroll position to the top on client-side navigation.
 *
 * Disabled entirely under prefers-reduced-motion — the browser's native
 * scroll takes over.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // A soft motion-blur on the site's featured photography, keyed off
    // Lenis's own scroll velocity — a few px during a fast flick, lerped
    // back to 0 at rest so it settles rather than snapping off. Read every
    // tick rather than off Lenis's "scroll" event so it decays smoothly
    // even after the last scroll event (i.e. the instant motion stops).
    // Targets (--scroll-blur, app/globals.css) are filter-only, so this
    // can't collide with the transform/clip-path GSAP already owns on the
    // same elements. Multiplier + cap keep it a texture, not a gimmick.
    const root = document.documentElement;
    let blur = 0;
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
      const target = Math.min(Math.abs(lenis.velocity) * 0.06, 5);
      blur += (target - blur) * 0.15;
      root.style.setProperty("--scroll-blur", `${blur < 0.03 ? 0 : blur.toFixed(2)}px`);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.hash.length < 2) return;

      if (anchor.pathname === window.location.pathname) {
        // Same page: scroll there ourselves, animated.
        const target = document.querySelector(anchor.hash);
        if (!target) return;
        event.preventDefault();
        landOnTarget(lenis, target, { duration: 1.1 });
        history.replaceState(null, "", anchor.hash);
      } else {
        // Different page: let the real navigation happen — stash the
        // target hash so the destination page can land on it once it
        // mounts (see the pathname effect below).
        try {
          sessionStorage.setItem(PENDING_HASH_KEY, anchor.hash);
        } catch {
          /* private mode / disabled storage — falls back to landing at top */
        }
      }
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.__lenis = undefined;
      root.style.removeProperty("--scroll-blur");
    };
  }, [reduce]);

  // On navigation, land on a #hash target if one is pending — either
  // stashed by onAnchorClick above (a cross-page <Link> transition, where
  // Next's router strips the hash from the URL before this effect can read
  // it back), or, failing that, still sitting in window.location.hash (a
  // hard page load / direct URL visit, which never goes through onClick at
  // all). The browser's own hash-scroll isn't enough for either case,
  // since Lenis takes over scroll position every frame and would
  // otherwise silently fight it back to wherever Lenis itself thinks the
  // scroll is (the top, on a fresh instance). With no hash, reset to top
  // as before.
  useEffect(() => {
    let hash = "";
    try {
      hash = sessionStorage.getItem(PENDING_HASH_KEY) || "";
      if (hash) sessionStorage.removeItem(PENDING_HASH_KEY);
    } catch {
      /* private mode / disabled storage */
    }
    if (!hash) hash = window.location.hash;

    const target = hash ? document.querySelector(hash) : null;
    if (target && window.__lenis) {
      landOnTarget(window.__lenis, target, { immediate: true });
    } else if (!hash) {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
