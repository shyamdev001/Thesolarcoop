"use client";

import { useLanguage } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { SectionHead } from "@/components/ui/SectionHead";

type ProseSectionProps = {
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  subKey?: TranslationKey;
  blocks: { h: TranslationKey; body: TranslationKey[] }[];
};

/**
 * Section head + stacked prose blocks (label column + body column).
 * Used for About "our story", "vision & mission" and PM "the scheme".
 */
export function ProseSection({
  eyebrowKey,
  titleKey,
  subKey,
  blocks,
}: ProseSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="section">
      <SectionHead
        align="left"
        eyebrow={t(eyebrowKey)}
        title={t(titleKey)}
        sub={subKey ? t(subKey) : undefined}
      />
      <div className="prose-blocks">
        {blocks.map((block) => (
          <div className="prose-block" data-reveal key={block.h}>
            <h3>{t(block.h)}</h3>
            <div className="prose-body">
              {block.body.map((p) => (
                <p key={p}>{t(p)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
