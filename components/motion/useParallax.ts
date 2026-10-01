"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useMediaQuery } from "./useMediaQuery";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

type ParallaxOptions = {
  /** Upscale applied so the drift never opens a gap at the frame's edge. */
  scale?: number;
  /** Total vertical travel, as yPercent from -range to +range. */
  range?: number;
  /** Disable on coarse/touch pointers too (most sections do). */
  disableOnCoarse?: boolean;
};

/**
 * The site's one parallax recipe — a media element drifts a little behind
 * a trigger element as it scrolls through the viewport. Used by every large
 * photo/video panel (Numbers, CtaBand, AboutStory, Process) instead of each
 * one hand-rolling the same GSAP setup/cleanup.
 *
 * `trigger` bounds the scroll range (usually the whole section, so a taller
 * layout next to the media gets a longer, smoother drift); `media` is the
 * element that actually moves (an <img> or <video>).
 */
export function useParallax(
  trigger: RefObject<HTMLElement | null>,
  /** Either a ref straight to the <img>/<video>, or to a wrapper div around
   * one (e.g. BackgroundVideo, which doesn't forward its own ref). */
  media: RefObject<HTMLElement | null>,
  { scale = 1.15, range = 5, disableOnCoarse = true }: ParallaxOptions = {},
) {
  const reduce = useReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)");

  useIsoLayoutEffect(() => {
    if (reduce || (disableOnCoarse && coarse)) return;
    const triggerEl = trigger.current;
    const node = media.current;
    const mediaEl =
      node instanceof HTMLImageElement || node instanceof HTMLVideoElement
        ? node
        : node?.querySelector<HTMLElement>("img, video");
    if (!triggerEl || !mediaEl) return;

    gsap.set(mediaEl, { scale });
    const tween = gsap.fromTo(
      mediaEl,
      { yPercent: -range },
      {
        yPercent: range,
        ease: "none",
        scrollTrigger: { trigger: triggerEl, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(mediaEl, { clearProps: "transform,scale" });
    };
  }, [reduce, coarse, scale, range, disableOnCoarse, trigger, media]);
}
