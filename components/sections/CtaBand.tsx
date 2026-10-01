"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { useParallax } from "@/components/motion/useParallax";

export function CtaBand({
  href = "#quote",
  titleKey = "cta_h2",
  buttonKey = "cta_btn",
}: {
  href?: string;
  titleKey?: TranslationKey;
  buttonKey?: TranslationKey;
}) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Same quiet drift as the other photo/video panels on the site (About,
  // Process, Numbers) — the closer gets the same signature, not a static frame.
  useParallax(sectionRef, photoRef, { scale: 1.15, range: 4 });

  return (
    <section className="section cta-band" ref={sectionRef}>
      <div className="cta-media" aria-hidden="true">
        <div className="cta-media-photo" ref={photoRef}>
          <Image src="/assets/img/solar-array-golden.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="cta-scrim" />
      </div>
      <div className="cta-content">
        <MaskText as="h2" className="cta-title" trigger="scroll">
          {t(titleKey)}
        </MaskText>
        <Magnetic>
          <Button href={href} size="lg" dataReveal>
            {t(buttonKey)}
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
