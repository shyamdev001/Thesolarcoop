"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { ResidentialIcon, CommercialIcon } from "@/components/ui/serviceIcons";
import { PumpIcon } from "@/components/ui/aboutIcons";
import { ABOUT_SOLUTIONS } from "@/lib/content";

const ICONS = [ResidentialIcon, PumpIcon, CommercialIcon];

/** About page: "Solar solutions we deliver" — a boxed 3-up card grid. */
export function AboutSolutions() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("ab_sol_eyebrow")}
        title={t("ab_sol_h2")}
        sub={t("ab_sol_sub")}
      />
      <div className="solutions-grid">
        {ABOUT_SOLUTIONS.map((card, i) => {
          const Icon = ICONS[i];
          return (
            <article className="solutions-card" data-reveal key={card.index}>
              <span className="solutions-index" aria-hidden="true">
                {card.index}
              </span>
              <span className="solutions-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{t(card.h)}</h3>
              <p>{t(card.p)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
