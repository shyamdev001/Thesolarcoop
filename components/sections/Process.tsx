"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { useParallax } from "@/components/motion/useParallax";
import { PROCESS_ICONS } from "@/components/ui/processIcons";
import { PROCESS_STEPS } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The four-step process. A sticky title + progress rail on the left; the steps
 * scroll past on the right, the rail tracking which one is centred in view.
 * Pure CSS `position: sticky` + one IntersectionObserver — no scroll pinning,
 * so it can't trap the scroll or break the layout. Degrades to a plain
 * two-column list with JS off.
 */
export function Process() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const mediaRef = useRef<HTMLElement>(null);

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

  // Same quiet drift as the Numbers video — the media panel breathes a
  // little instead of sitting dead still while the steps scroll past it.
  useParallax(mediaRef, mediaRef, { scale: 1.16, range: 4 });

  return (
    <section className="section process" id="process">
      <div className="process-layout">
        <div className="process-aside">
          <Eyebrow>{t("process_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("process_h2")}
          </MaskText>
          <p className="process-intro" data-reveal>
            {t("process_intro")}
          </p>

          <ol className="process-rail" aria-hidden="true">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.tag}
                className={i <= activeStep ? "is-done" : undefined}
                data-active={i === activeStep || undefined}
              >
                <span className="process-rail-n">{pad(i + 1)}</span>
                <span className="process-rail-t">{t(step.h)}</span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="process-steps">
          {PROCESS_STEPS.map((step, i) => (
            <li
              className="process-step"
              data-reveal
              data-active={i === activeStep || undefined}
              key={step.tag}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
            >
              <span className="process-step-n" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <div>
                <span className="process-step-icon" aria-hidden="true">
                  {(() => {
                    const Icon = PROCESS_ICONS[i];
                    return <Icon />;
                  })()}
                </span>
                <span className="step-tag">{t(step.tag)}</span>
                <MaskText as="h3" trigger="scroll">
                  {t(step.h)}
                </MaskText>
                <p>{t(step.p)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figure className="process-media" ref={mediaRef} data-reveal>
        <BackgroundVideo
          src="/assets/video/install-work.mp4"
          poster="/assets/img/installer-hardhat.webp"
        />
      </figure>
    </section>
  );
}
