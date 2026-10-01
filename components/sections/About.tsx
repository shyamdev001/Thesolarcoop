"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { CountStat } from "@/components/ui/CountStat";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import { ABOUT_LIST, ABOUT_STATS } from "@/lib/content";

export function About() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)");
  const photoWrapRef = useRef<HTMLDivElement>(null);

  // The photo drifts a touch slower than the page — same device as the
  // Numbers video, scaled down for a static frame instead of a full-bleed one.
  useEffect(() => {
    if (reduce || coarse) return;
    const wrap = photoWrapRef.current;
    if (!wrap) return;

    const tween = gsap.fromTo(
      wrap,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(wrap, { clearProps: "transform" });
    };
  }, [reduce, coarse]);

  return (
    <section className="section about" id="about">
      <div className="about-grid">
        <div className="about-copy">
          <Eyebrow>{t("about_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("about_h2")}
          </MaskText>
          <p className="lead" data-reveal>
            {t("about_lead")}
          </p>
          <CheckList items={ABOUT_LIST.map((k) => t(k))} />
          <Button href="#quote" dataReveal>
            {t("about_cta")}
          </Button>
        </div>

        <div className="about-side">
          <figure className="about-photo" data-reveal>
            <div className="about-photo-parallax" ref={photoWrapRef}>
              <Image
                src="/assets/img/crew-installing.webp"
                alt="The Solar Coop team fixing solar panels onto a rooftop rail system"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </figure>
          <div className="stat-stack" data-reveal>
            {ABOUT_STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                {stat.count !== undefined ? (
                  <CountStat
                    className="stat-num"
                    value={stat.count}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span className="stat-num">{stat.value}</span>
                )}
                <span className="stat-label">{t(stat.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
