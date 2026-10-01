"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * A GSAP-ticker-driven infinite marquee: `track` must render its content
 * twice back-to-back (see Reviews.tsx) so wrapping at half its scroll width
 * loops seamlessly. Speed eases to 0 on hover/drag rather than snapping to
 * a stop, and a mouse-drag nudges it manually (same "mouse only, touch
 * keeps its native behaviour" convention as useDragScroll). Off entirely
 * for reduced-motion — the CSS then falls back to a static wrapped row.
 */
export function useMarqueeDrag(
  trackRef: RefObject<HTMLElement | null>,
  speed = 44,
) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let half = track.scrollWidth / 2;
    let targetSpeed = speed;
    let currentSpeed = speed;
    let dragging = false;
    let hovering = false;
    let dragStartClientX = 0;
    let dragStartX = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 100) / 1000;
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, dt * 4);
      if (!dragging) x -= currentSpeed * dt;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      gsap.set(track, { x });
    };
    gsap.ticker.add(tick);

    const onEnter = () => {
      hovering = true;
      targetSpeed = 0;
    };
    const onLeave = () => {
      hovering = false;
      if (!dragging) targetSpeed = speed;
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      targetSpeed = 0;
      currentSpeed = 0;
      dragStartClientX = e.clientX;
      dragStartX = x;
      track.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      x = dragStartX + (e.clientX - dragStartClientX);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      targetSpeed = hovering ? 0 : speed;
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      track.classList.remove("is-dragging");
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduce, trackRef, speed]);
}
