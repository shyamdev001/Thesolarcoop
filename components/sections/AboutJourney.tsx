"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { CountStat } from "@/components/ui/CountStat";
import { PartnersIcon, PinIcon, TeamIcon } from "@/components/ui/aboutIcons";
import { ResidentialIcon } from "@/components/ui/serviceIcons";
import { ABOUT_JOURNEY } from "@/lib/content";

// The first 4 figures are capacity (MW) — kept clean, typographic. The
// last 4 are reach (partners / homes / cities / team), each get a small
// icon — the icon row is a quiet visual cue that the grid shifts register
// from "what we built" to "who it reaches".
const ICONS = [null, null, null, null, PartnersIcon, ResidentialIcon, PinIcon, TeamIcon];

/** "Our journey" — the real project/impact figures, as a ruled stat grid. */
export function AboutJourney() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("ab_journey_eyebrow")}
        title={t("ab_journey_h2")}
      />
      <div className="journey-grid">
        {ABOUT_JOURNEY.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <div className="journey-stat" data-reveal key={stat.label}>
              {Icon && (
                <span className="journey-icon" aria-hidden="true">
                  <Icon />
                </span>
              )}
              <CountStat
                className="journey-num"
                value={stat.count}
                suffix={stat.suffix}
              />
              <span className="journey-label">{t(stat.label)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
