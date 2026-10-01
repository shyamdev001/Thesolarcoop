"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { FormIcon, ApprovalIcon, MeterIcon, SubsidyIcon } from "@/components/ui/pmIcons";
import { PM_HOW_STEPS } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";

const ICONS = [FormIcon, ApprovalIcon, MeterIcon, SubsidyIcon];

/**
 * PM Surya Ghar: the four things we handle, as a connected step-through —
 * horizontal on desktop, vertical on mobile. The accent line between steps
 * fills in as the reader scrolls through the row, tracking real progress
 * rather than just appearing.
 */
export function PmHowWeHelp() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;

    if (reduce) {
      track.style.setProperty("--pm-progress", "1");
      return;
    }
    track.style.setProperty("--pm-progress", "0");

    const proxy = { p: 0 };
    const tween = gsap.fromTo(
      proxy,
      { p: 0 },
      {
        p: 1,
        ease: "none",
        onUpdate: () => track.style.setProperty("--pm-progress", String(proxy.p)),
        scrollTrigger: {
          trigger: list,
          start: "top 80%",
          end: "bottom 65%",
          scrub: true,
        },
      },
    );

    return () => {
      (tween.scrollTrigger as ScrollTrigger | undefined)?.kill();
      tween.kill();
    };
  }, [reduce]);

  return (
    <section className="section section-tight">
      <SectionHead
        align="left"
        eyebrow={t("pm_help_eyebrow")}
        title={t("pm_help_h2")}
        sub={t("pm_help_sub")}
      />
      <div className="pm-help-wrap">
        <div className="pm-help-track" ref={trackRef} aria-hidden="true" />
        <ol className="pm-help-steps" ref={listRef}>
          {PM_HOW_STEPS.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <li className="pm-help-step" data-reveal key={label}>
                <span className="pm-help-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="pm-help-label">{t(label)}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
