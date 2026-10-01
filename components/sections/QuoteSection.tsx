"use client";

import { useLanguage } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { CheckList } from "@/components/ui/CheckList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { CONTACT } from "@/lib/site";
import { QUOTE_LIST } from "@/lib/content";
import { QuoteForm } from "./QuoteForm";

/** Dark "free consultation" band with the copy + quote form. */
export function QuoteSection({
  headingKey = "quote_h2",
}: {
  headingKey?: TranslationKey;
}) {
  const { t } = useLanguage();

  return (
    <section className="section quote" id="quote">
      <div className="quote-glow" aria-hidden="true" />
      <div className="quote-grid">
        <div className="quote-copy">
          <Eyebrow>{t("quote_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t(headingKey)}
          </MaskText>
          <p className="lead" data-reveal>
            {t("quote_lead")}
          </p>
          <CheckList items={QUOTE_LIST.map((k) => t(k))} />
          <div className="quote-contacts" data-reveal>
            <a href={CONTACT.phoneHref}>
              <span className="qc-label">{t("quote_call")}</span>
              <span className="qc-value">{CONTACT.phoneDisplay}</span>
            </a>
            <a href={CONTACT.emailHref}>
              <span className="qc-label">{t("quote_email")}</span>
              <span className="qc-value">{CONTACT.email}</span>
            </a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
