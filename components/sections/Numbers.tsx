"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useParallax } from "@/components/motion/useParallax";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { CountStat } from "@/components/ui/CountStat";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { NUMBERS } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "By the numbers" over a full-bleed video. The figures are set large and
 * editorial (left-aligned, tabular, ruled). Each counts up as it passes; the
 * video drifts a touch behind them. Parallax is off for reduced-motion and
 * touch, and the video has scale headroom so the drift can never open a gap.
 */
export function Numbers() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useParallax(sectionRef, mediaRef, { scale: 1.18, range: 5 });

  return (
    <section className="section numbers" ref={sectionRef}>
      <div className="numbers-media" aria-hidden="true" ref={mediaRef}>
        <BackgroundVideo
          src="/assets/video/aerial-field.mp4"
          poster="/assets/img/aerial-commercial-roof.jpg"
        />
        <div className="numbers-scrim" />
      </div>

      <div className="numbers-inner">
        <Eyebrow light>{t("numbers_eyebrow")}</Eyebrow>
        <MaskText as="h2" className="h2 h2-light" trigger="scroll">
          {t("numbers_h2")}
        </MaskText>

        <ol className="numbers-list">
          {NUMBERS.map((item, i) => (
            <li className="numbers-row" data-reveal key={item.label}>
              <span className="numbers-row-i" aria-hidden="true">
                {pad(i + 1)}
              </span>
              {item.count !== undefined ? (
                <CountStat
                  className="num-value"
                  value={item.count}
                  suffix={item.suffix}
                />
              ) : (
                <span className="num-value">{t(item.value!)}</span>
              )}
              <span className="num-label">{t(item.label)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
