"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { CONTACT } from "@/lib/site";

/**
 * A calmer, editorial closer for article pages — sits inside the reading
 * flow (warm card, not a full-bleed cinematic band) so it reads as the
 * natural next step in the story, not a sales banner dropped on top of it.
 */
export function ArticleCta() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <div className="article-cta" data-reveal>
        <Eyebrow>{t("article_cta_eyebrow")}</Eyebrow>
        <MaskText as="h2" className="h2" trigger="scroll">
          {t("article_cta_h2")}
        </MaskText>
        <div className="article-cta-actions">
          <Magnetic strength={0.25}>
            <Button href="/contact/">{t("cta_talk")}</Button>
          </Magnetic>
          <a href={CONTACT.phoneHref} className="link-underline">
            {t("quote_call")} {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
