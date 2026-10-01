"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { SubsidyIcon, LeafIcon, PlugIcon } from "@/components/ui/pmIcons";
import { CheckIcon } from "@/components/ui/aboutIcons";
import { PM_BENEFITS } from "@/lib/content";

const ICONS = [SubsidyIcon, LeafIcon, LeafIcon, PlugIcon];

export function PmBenefits() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <SectionHead
        align="left"
        eyebrow={t("pm_benefits_eyebrow")}
        title={t("pm_benefits_h2")}
      />
      <div className="pm-benefits-grid">
        {PM_BENEFITS.map((key, i) => {
          const Icon = ICONS[i] ?? CheckIcon;
          return (
            <article className="pm-benefit-card" data-reveal key={key}>
              <span className="pm-benefit-icon" aria-hidden="true">
                <Icon />
              </span>
              <p>{t(key)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
