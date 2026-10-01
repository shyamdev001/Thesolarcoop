"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CountStat } from "@/components/ui/CountStat";
import { ResidentialIcon } from "@/components/ui/serviceIcons";
import { PercentIcon, SubsidyIcon } from "@/components/ui/pmIcons";
import { PM_STAT_BAND } from "@/lib/content";

const ICONS = [ResidentialIcon, PercentIcon, SubsidyIcon];

/** PM Surya Ghar: the light three-up stat band. */
export function PmStatBand() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <div className="stat-band" data-reveal>
        {PM_STAT_BAND.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <div className="stat" key={stat.label}>
              <span className="stat-icon" aria-hidden="true">
                <Icon />
              </span>
              {stat.count !== undefined ? (
                <CountStat
                  className="stat-num"
                  value={stat.count}
                  suffix={stat.suffix}
                />
              ) : (
                <span className="stat-num">{t(stat.value!)}</span>
              )}
              <span className="stat-label">{t(stat.label)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
