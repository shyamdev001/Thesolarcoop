"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import { SERVICE_ICONS } from "@/components/ui/serviceIcons";
import { HOME_SERVICES } from "@/lib/content";

/** One photo per service, in the same order as HOME_SERVICES. */
const SERVICE_IMAGES = [
  { src: "/assets/img/installer-portrait.webp", alt: "An installer securing a residential rooftop panel" },
  { src: "/assets/img/aerial-commercial-roof.webp", alt: "Aerial view of a large commercial rooftop solar array" },
  { src: "/assets/img/field-closeup.webp", alt: "Aerial view of a ground-mounted farm solar array" },
  { src: "/assets/img/installer-hardhat.webp", alt: "A technician servicing panels on a rooftop" },
];

/**
 * The homepage services list. Row detail still opens on hover/focus (CSS
 * only, works with JS off) — on top of that, a fine-pointer cursor gets a
 * small photo preview that follows it and swaps to match the hovered row.
 */
export function Services() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveTo = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useEffect(() => {
    if (reduce || !fine || !previewRef.current) return;
    const el = previewRef.current;
    gsap.set(el, { xPercent: -50, yPercent: -122 });
    moveTo.current = {
      x: gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }),
    };
    return () => {
      moveTo.current = null;
    };
  }, [reduce, fine]);

  const showPreview = fine && !reduce;

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!showPreview || !listRef.current || !moveTo.current) return;
    const rect = listRef.current.getBoundingClientRect();
    moveTo.current.x(event.clientX - rect.left);
    moveTo.current.y(event.clientY - rect.top);
  };

  return (
    <section className="section services" id="services">
      <SectionHead
        align="left"
        eyebrow={t("services_eyebrow")}
        title={t("services_h2")}
        sub={t("services_sub")}
      />
      <div
        className="service-list"
        ref={listRef}
        onPointerMove={onMove}
        onPointerLeave={() => showPreview && setActive(null)}
      >
        {HOME_SERVICES.map((service, i) => (
          <article
            className="service"
            data-reveal
            key={service.h}
            onPointerEnter={() => showPreview && setActive(i)}
          >
            <div className="service-row">
              <span className="service-row-title">
                <span className="service-icon" aria-hidden="true">
                  {(() => {
                    const Icon = SERVICE_ICONS[i];
                    return <Icon />;
                  })()}
                </span>
                <h3>{t(service.h)}</h3>
              </span>
              <span className="service-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="service-detail">
              <p>{t(service.p)}</p>
            </div>
          </article>
        ))}

        {showPreview && (
          <div
            className="service-preview"
            ref={previewRef}
            data-visible={active !== null || undefined}
            aria-hidden="true"
          >
            {SERVICE_IMAGES.map((img, i) => (
              <img key={img.src} src={img.src} alt="" data-active={active === i || undefined} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
