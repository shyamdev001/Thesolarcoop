"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { MaskText } from "@/components/motion/MaskText";
import { SERVICE_ICONS } from "@/components/ui/serviceIcons";
import { SERVICE_DETAILS } from "@/lib/content";

/** One real photo per service — an alternating showcase, not a plain list. */
const PHOTOS = [
  {
    src: "/assets/img/crew-rooftop.webp",
    alt: "The Solar Coop crew working together on a rooftop panel installation",
  },
  {
    src: "/assets/img/aerial-commercial-roof.webp",
    alt: "Aerial view of a large commercial rooftop covered edge to edge with solar panels",
  },
  {
    src: "/assets/img/aerial-farm.webp",
    alt: "Aerial view of a ground-mounted solar array beside farm buildings in Gujarat",
  },
  {
    src: "/assets/img/installer-hardhat.webp",
    alt: "A Solar Coop technician in a hard hat servicing an installed system",
  },
];

/** Services page: the four services as an alternating photo showcase. */
export function ServiceDetails() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t("services_eyebrow")}
        title={t("sv_detail_h2")}
      />
      {SERVICE_DETAILS.map((detail, i) => {
        const Icon = SERVICE_ICONS[i];
        const photo = PHOTOS[i];
        return (
          <article className="detail-showcase" id={detail.id} data-reveal key={detail.id}>
            <div className="detail-photo">
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div className="detail-copy">
              <div className="detail-head">
                <span className="detail-icon" aria-hidden="true">
                  <Icon />
                </span>
                <MaskText as="h3" trigger="scroll">
                  {t(detail.h)}
                </MaskText>
              </div>
              <p>{t(detail.p)}</p>
              <ul className="check-list detail-checks">
                {detail.bullets.map((bullet) => (
                  <li key={bullet}>{t(bullet)}</li>
                ))}
              </ul>
              <Link href="/contact/" className="service-link">
                <span>{t("sv_get_quote")}</span> <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
