"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { CheckIcon } from "@/components/ui/aboutIcons";
import { FOUNDER_CREDENTIALS } from "@/lib/content";

export function Founder() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("ab_founder_eyebrow")}
        title={t("ab_founder_h2")}
      />
      <div className="founder" data-reveal>
        <div className="founder-photo">
          <Image
            src="/assets/img/founder-tejash-patel.jpg"
            alt="Tejash Patel, Founder and Managing Director of The Solar Coop"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <div className="founder-body">
          <blockquote>{t("ab_founder_quote")}</blockquote>
          <p className="founder-name">Tejash Patel</p>
          <p className="founder-role">{t("ab_founder_role")}</p>
          <ul className="founder-credentials">
            {FOUNDER_CREDENTIALS.map((key) => (
              <li key={key}>
                <CheckIcon />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
