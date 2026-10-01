"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";

/**
 * A full-bleed real-photo break between the table and the eligibility
 * columns — a real net-metering box we installed, re-surfacing the single
 * strongest number on the page. A one-time entrance settle (not a
 * continuous scrub): the photo eases from a slight zoom to rest and the
 * scrim deepens in as the section arrives, once.
 */
export function PmImpact() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const scrim = scrimRef.current;
    if (!section || !photo) return;

    if (reduce) {
      gsap.set(photo, { clearProps: "transform" });
      if (scrim) gsap.set(scrim, { clearProps: "opacity" });
      return;
    }

    gsap.set(photo, { scale: 1.05 });
    if (scrim) gsap.set(scrim, { opacity: 0.7 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(photo, { scale: 1, duration: 1.1, ease: "power2.out" });
        if (scrim) gsap.to(scrim, { opacity: 1, duration: 0.9, ease: "power1.out" });
      },
    });

    return () => {
      st.kill();
      gsap.set(photo, { clearProps: "transform" });
      if (scrim) gsap.set(scrim, { clearProps: "opacity" });
    };
  }, [reduce]);

  return (
    <section className="section pm-impact" ref={sectionRef}>
      <div className="pm-impact-media" aria-hidden="true">
        <div className="pm-impact-photo" ref={photoRef}>
          <Image
            src="/assets/img/pmsg-net-meter.jpg"
            alt="A real net-metering and inverter setup installed by The Solar Coop"
            fill
            sizes="100vw"
          />
        </div>
        <div className="pm-impact-scrim" ref={scrimRef} />
      </div>
      <div className="pm-impact-inner">
        <Eyebrow light>{t("pm_impact_eyebrow")}</Eyebrow>
        <MaskText as="p" className="pm-impact-stat" trigger="scroll">
          {t("pm_impact_stat")}
        </MaskText>
        <p className="pm-impact-label" data-reveal>
          {t("pm_impact_label")}
        </p>
      </div>
    </section>
  );
}
