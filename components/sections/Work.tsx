"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { useMarqueeDrag } from "@/components/motion/useMarqueeDrag";
import { WORK_ITEMS } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

function WorkCard({ item, i }: { item: (typeof WORK_ITEMS)[number]; i: number }) {
  const { t } = useLanguage();
  return (
    <figure className="work-card">
      <div className="work-card-media">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 900px) 60vw, 420px"
          draggable={false}
        />
      </div>
      <figcaption>
        <span className="work-card-n">{pad(i + 1)}</span>
        <span className="work-card-title">{t(item.a)}</span>
        <span className="work-card-loc">{t(item.b)}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Project gallery as a single auto-scrolling row (same GSAP-ticker marquee
 * as Reviews) — the photos drift on their own instead of sitting still
 * waiting for a drag or a button. Eases to a stop on hover/focus, and a
 * mouse-drag nudges it manually.
 */
export function Work() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  useMarqueeDrag(trackRef, 36);

  return (
    <section className="section work">
      <SectionHead
        align="left"
        eyebrow={t("work_eyebrow")}
        title={t("work_h2")}
        sub={t("work_sub")}
      />

      <div className="marquee-wrap" data-reveal>
        <div className="marquee-row">
          <div className="marquee-track" ref={trackRef}>
            <div className="marquee-set">
              {WORK_ITEMS.map((item, i) => (
                <WorkCard item={item} i={i} key={item.src} />
              ))}
            </div>
            <div className="marquee-set" aria-hidden="true">
              {WORK_ITEMS.map((item, i) => (
                <WorkCard item={item} i={i} key={`dup-${item.src}`} />
              ))}
            </div>
          </div>
        </div>
        <span className="marquee-fade marquee-fade-l" aria-hidden="true" />
        <span className="marquee-fade marquee-fade-r" aria-hidden="true" />
      </div>
    </section>
  );
}
