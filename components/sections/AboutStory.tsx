"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { OriginIcon, PumpIcon } from "@/components/ui/aboutIcons";
import { CoopMark } from "@/components/ui/marks";
import { ABOUT_STORY } from "@/lib/content";
import { useParallax } from "@/components/motion/useParallax";

const ICONS = [OriginIcon, PumpIcon, CoopMark];

/**
 * "Our story" — same scroll choreography as the home page's "How it works":
 * a sticky photo on the left tracks down the page while the timeline scrolls
 * past on the right, and an IntersectionObserver lights up whichever step is
 * centred in view (same -45%/-45% rootMargin as Process.tsx).
 */
export function AboutStory() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (i >= 0) setActiveStep(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Same quiet drift as the process media panel — the photo breathes a
  // little inside its sticky frame while the timeline scrolls past it.
  useParallax(gridRef, imgRef, { scale: 1.22, range: 9 });

  return (
    <section className="section about-story">
      <div className="about-story-grid" ref={gridRef}>
        <div className="about-story-photo" data-reveal ref={photoRef}>
          <Image
            ref={imgRef}
            src="/assets/img/crew-installing.jpg"
            alt="The Solar Coop team fixing solar panels onto a rooftop rail system"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <span className="about-story-badge">
            <span className="about-story-badge-num">2018</span>
            <span className="about-story-badge-label">Founded</span>
          </span>
        </div>

        <div className="about-story-copy">
          <Eyebrow>{t("ab_story_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("ab_story_h2")}
          </MaskText>

          <ol className="about-timeline">
            {ABOUT_STORY.map((block, i) => {
              const Icon = ICONS[i];
              return (
                <li
                  className={
                    i <= activeStep ? "about-timeline-row is-done" : "about-timeline-row"
                  }
                  data-reveal
                  data-active={i === activeStep || undefined}
                  key={block.h}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                >
                  <span className="about-timeline-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="about-timeline-body">
                    <h3>{t(block.h)}</h3>
                    {block.body.map((p) => (
                      <p key={p}>{t(p)}</p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
