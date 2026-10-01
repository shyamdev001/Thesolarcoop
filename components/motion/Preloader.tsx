"use client";

import { useRef } from "react";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";

declare global {
  interface Window {
    tscPreloaderComplete?: boolean;
  }
}

let preloaderPlayed = false;

// Never shorter than this (the brand moment needs a beat to register), never
// longer than this (a slow connection still gets in — waiting forever is
// worse than showing a page that's a beat behind on its fonts).
const MIN_MS = 650;
const MAX_MS = 3000;

// The old preloader hid itself on a fixed ~2.7s timer no matter what had
// actually loaded. On a warm cache that's invisible — everything's already
// there. On a genuine first visit (nothing cached: fonts, the hero poster,
// all of it downloading cold) the timer routinely won races it, so the
// curtain lifted on unstyled fallback-font text and a hero image still
// painting in, and ScrollReveal measured element positions before layout
// had settled from either. This waits for the two things that actually
// cause that: web fonts, and the hero's own poster image (not the full
// video — the poster is what actually paints first, per BackgroundVideo).
function whenReady(): Promise<void> {
  const fonts =
    typeof document !== "undefined" && document.fonts
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve();
  const poster = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = "/assets/img/panels-sunset.webp";
  });
  const real = Promise.all([fonts, poster]).then(() => undefined);
  const capped = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_MS));
  return Promise.race([real, capped]);
}

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (preloaderPlayed || reduce) {
      preloaderPlayed = true;
      if (rootRef.current) rootRef.current.style.display = "none";
      window.dispatchEvent(new Event("preloader-complete"));
      window.tscPreloaderComplete = true;
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    // A tab loading in the background pauses GSAP's ticker until it's
    // focused — same guard every other entrance animation on this site
    // uses, so the preloader can't sit there covering the page indefinitely.
    if (document.hidden) {
      preloaderPlayed = true;
      root.style.display = "none";
      window.dispatchEvent(new Event("preloader-complete"));
      window.tscPreloaderComplete = true;
      return;
    }

    window.tscPreloaderComplete = false;

    const q = gsap.utils.selector(root);
    const started = performance.now();
    let cancelled = false;

    const entrance = gsap.timeline();
    entrance
      .set(root, { autoAlpha: 1 })
      .set(q(".preloader-content"), { autoAlpha: 1 })
      .fromTo(q(".preloader-logo"), { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0.15)
      .fromTo(q(".preloader-text"), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" }, 0.25)
      .fromTo(q(".preloader-sun"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.4);

    const finish = () => {
      if (cancelled) return;
      const exit = gsap.timeline({
        onComplete: () => {
          preloaderPlayed = true;
          root.style.display = "none";
          window.dispatchEvent(new Event("preloader-complete"));
          window.tscPreloaderComplete = true;
        },
      });
      // A quick flare on the sun mark — "ready" — before the curtain lifts.
      exit
        .to(q(".preloader-sun"), { scale: 1.2, duration: 0.22, ease: "power2.out" })
        .to(q(".preloader-sun"), { autoAlpha: 0, scale: 1.35, duration: 0.22, ease: "power1.in" }, "-=0.02")
        .to(root, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "-=0.08");
    };

    whenReady().then(() => {
      if (cancelled) return;
      const elapsed = performance.now() - started;
      if (elapsed < MIN_MS) {
        window.setTimeout(finish, MIN_MS - elapsed);
      } else {
        finish();
      }
    });

    return () => {
      cancelled = true;
      entrance.kill();
    };
  }, [reduce]);

  if (preloaderPlayed && typeof window !== "undefined") return null;

  return (
    <div
      ref={rootRef}
      className="preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <div
        className="preloader-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          visibility: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", fontFamily: "var(--font-display)" }}>
          <img
            className="preloader-logo"
            src="/new-logo.webp"
            alt="The Solar Coop"
            style={{ height: "72px", width: "auto", display: "block", flex: "none", opacity: 0 }}
          />
          <div className="preloader-text" style={{ display: "flex", flexDirection: "column", gap: "4px", whiteSpace: "nowrap", opacity: 0 }}>
            <span style={{ fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)" }}>
              The Solar Coop
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.08em", color: "var(--ink-3)", textTransform: "uppercase" }}>
              PSSU મંડળી · સ્થાપના 2018
            </span>
          </div>
        </div>

        <div className="preloader-sun" aria-hidden="true">
          <svg viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="9" fill="var(--accent)" />
            {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
              <line
                key={deg}
                x1="30"
                y1="6"
                x2="30"
                y2="14"
                stroke="var(--accent)"
                strokeWidth="2.6"
                strokeLinecap="round"
                transform={`rotate(${deg} 30 30)`}
              />
            ))}
          </svg>
        </div>
      </div>
      <noscript>
        <style>{`.preloader{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
