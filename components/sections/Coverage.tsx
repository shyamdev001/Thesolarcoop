"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { useTilt } from "@/components/motion/useTilt";
import { AREAS_MINI, AREAS_MORE } from "@/lib/content";

export function Coverage() {
  const { t } = useLanguage();
  const featureRef = useRef<HTMLElement>(null);
  useTilt(featureRef);

  return (
    <section className="section areas" id="areas">
      <SectionHead
        align="left"
        eyebrow={t("areas_eyebrow")}
        title={t("areas_h2")}
        sub={t("areas_sub")}
      />

      <div className="areas-grid">
        <article className="area-card area-card--feature" ref={featureRef} data-reveal>
          <div className="area-card--feature-media">
            <Image
              src="/assets/img/aerial-farm.jpg"
              alt="Aerial view of a ground-mounted solar array beside farm buildings"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="area-card-body">
            <span className="area-city">{t("areas_feature_city")}</span>
            <span className="area-count">{t("areas_feature_tag")}</span>
            <p>{t("areas_feature_p")}</p>
          </div>
        </article>

        <div className="area-mini-grid">
          {AREAS_MINI.map((area) => (
            <div className="area-mini" data-reveal key={area.city}>
              <span className="area-city">{t(area.city)}</span>
              <span className="area-count">{t(area.note)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="areas-more" data-reveal>
        <span className="areas-more-tag" style={{ flexShrink: 0 }}>{t("areas_more_tag")}:</span>
        <div className="areas-marquee">
          {[...Array(2)].map((_, i) => (
            <div className="areas-marquee-track" key={i} aria-hidden={i === 1 ? "true" : undefined}>
              {["Petlad", "Sojitra", "Anand", "Nadiad", "Vaso", "Dharmaj", "Bhadran", "Tarapur", "Khambhat", "Umreth", "Dakor", "Kapadvanj", "Kathalal", "Mahudha", "Matar", "Bochasan", "Chikhodra", "Anklav"].map(name => (
                <span key={name}>{name}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
