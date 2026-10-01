"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";
import { MaskText } from "@/components/motion/MaskText";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { HERO_STRIP } from "@/lib/content";
import { trackUnderlineOrigin } from "@/lib/underlineOrigin";

declare global {
  interface Window {
    tscPreloaderComplete?: boolean;
  }
}

/** Plays once per page session — not on client-nav back to home, not on refresh mid-page. */
let entrancePlayed = false;

export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const firstLoad = !entrancePlayed;

  useIsoLayoutEffect(() => {
    if (entrancePlayed || reduce) return;
    const root = rootRef.current;
    if (!root || document.hidden || !window.innerHeight) return;
    if (window.scrollY > 6) {
      entrancePlayed = true; // refreshed while scrolled down — no entrance
      return;
    }

    const playEntrance = () => {
      entrancePlayed = true;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q(".eyebrow"), { autoAlpha: 0, y: 14, duration: 0.55 }, 0.05)
        .from(q(".hero-sub"), { autoAlpha: 0, y: 12, duration: 0.55 }, 0.34)
        .from(
          q(".hero-actions > *"),
          { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.09 },
          0.44,
        )
        .from(q(".hero-strip"), { autoAlpha: 0, y: 10, duration: 0.55 }, 0.6)
        .from(
          q(".hero-media video"),
          { scale: 1.09, duration: 2.6, ease: "power2.out" },
          0,
        );

      // Timeout just for failsafe
      window.setTimeout(() => { if (tl.progress() < 1) tl.progress(1).kill(); }, 2800);
    };

    if (typeof window !== "undefined") {
      if (window.tscPreloaderComplete) {
        playEntrance();
      } else {
        window.addEventListener("preloader-complete", playEntrance, { once: true });
      }
    } else {
      playEntrance();
    }

    return () => {
      window.removeEventListener("preloader-complete", playEntrance);
      gsap.set(gsap.utils.selector(root)(".eyebrow, .hero-sub, .hero-actions > *, .hero-strip, .hero-media video"), {
        clearProps: "all",
      });
    };
  }, [reduce]);

  return (
    <section ref={rootRef} className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <BackgroundVideo
          src="/assets/video/panels-sunset.mp4"
          poster="/assets/img/panels-sunset.webp"
        />
        <div className="hero-scrim" />
      </div>

      <div className="hero-inner">
        <Eyebrow
          light
          tag={t("hero_eyebrow_tag")}
          note={t("hero_eyebrow_text")}
        />
        <MaskText
          as="h1"
          className="hero-title"
          trigger={firstLoad ? "load" : "none"}
          lines={[t("hero_title_1"), t("hero_title_2")]}
        />
        <p className="hero-sub">{t("hero_sub")}</p>
        <div className="hero-actions">
          <Button href="#quote" size="lg">
            {t("hero_cta")}
          </Button>
          <a
            href="#process"
            className="link-underline link-light"
            onPointerEnter={trackUnderlineOrigin}
            onPointerLeave={trackUnderlineOrigin}
          >
            {t("hero_link")}
          </a>
        </div>
      </div>

      <div className="hero-strip">
        {HERO_STRIP.map((key) => (
          <span key={key}>{t(key)}</span>
        ))}
      </div>
    </section>
  );
}
