"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { CalendarIcon, PercentIcon } from "@/components/ui/pmIcons";
import { PM_ABOUT } from "@/lib/content";

const ICONS = [CalendarIcon, PercentIcon];

/**
 * PM Surya Ghar: "What the scheme is" — a real install photo beside two
 * ghost-index info cards, instead of cards floating alone on bare paper.
 */
export function PmAbout() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("pm_about_eyebrow")}
        title={t("pm_about_h2")}
      />
      <div className="pm-about-layout">
        <div className="pm-about-photo" data-reveal>
          <Image
            src="/assets/img/pmsg-rooftop-install.jpg"
            alt="A real rooftop solar installation on a home in Gujarat, completed under PM Surya Ghar"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
        <div className="pm-about-grid">
          {PM_ABOUT.map((block, i) => {
            const Icon = ICONS[i];
            return (
              <article className="pm-about-card" data-reveal key={block.h}>
                <span className="pm-about-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pm-about-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{t(block.h)}</h3>
                {block.body.map((p) => (
                  <p key={p}>{t(p)}</p>
                ))}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
