"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { FAQS } from "@/lib/content";

/** Single-open FAQ accordion. `helpHref` targets the "talk to us" button. */
export function Faq({ helpHref = "#quote" }: { helpHref?: string }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq">
      <div className="faq-grid">
        <div className="faq-aside">
          <Eyebrow>{t("faq_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("faq_h2")}
          </MaskText>
          <div className="faq-help" data-reveal>
            <p>{t("faq_help")}</p>
            <Magnetic strength={0.25}>
              <Button href={helpHref} variant="ghost">
                {t("faq_cta")}
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <details className="faq-item" open={openIndex === i} key={faq.q}>
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex(openIndex === i ? -1 : i);
                }}
              >
                {t(faq.q)}
              </summary>
              <div className="faq-body">
                <p>{t(faq.a)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="faq-calc-promo" data-reveal>
        <div className="faq-calc-promo-text">
          <span className="faq-calc-promo-title">{t("faq_calc_promo_title")}</span>
          <span className="faq-calc-promo-sub">{t("faq_calc_promo_sub")}</span>
        </div>
        <Magnetic strength={0.25}>
          <Button href="/solar-calculator/">{t("faq_calc_promo_cta")}</Button>
        </Magnetic>
      </div>
    </section>
  );
}
