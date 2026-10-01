"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { VisionIcon, MissionIcon } from "@/components/ui/aboutIcons";
import { ABOUT_VISION_MISSION } from "@/lib/content";

const ICONS = [VisionIcon, MissionIcon];

/** "Vision & mission" — two cards instead of the generic stacked prose rows. */
export function AboutVisionMission() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("ab_vm_eyebrow")}
        title={t("ab_vm_h2")}
      />
      <div className="about-vm-grid">
        {ABOUT_VISION_MISSION.map((block, i) => {
          const Icon = ICONS[i];
          return (
            <article className="about-vm-card" data-reveal key={block.h}>
              <span className="about-vm-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="about-vm-icon" aria-hidden="true">
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
    </section>
  );
}
