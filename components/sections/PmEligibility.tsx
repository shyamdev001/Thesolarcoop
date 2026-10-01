"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckList } from "@/components/ui/CheckList";
import { MaskText } from "@/components/motion/MaskText";
import { PersonCheckIcon, FolderIcon } from "@/components/ui/pmIcons";
import { PM_DOCUMENTS, PM_ELIGIBILITY } from "@/lib/content";

/** PM Surya Ghar: two-column "eligibility" + "documents you'll need" — plain
 * editorial checklist rows, not boxed cards. */
export function PmEligibility() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <div className="about-grid">
        <div>
          <span className="pm-elig-icon" aria-hidden="true">
            <PersonCheckIcon />
          </span>
          <Eyebrow>{t("pm_elig_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("pm_elig_h2")}
          </MaskText>
          <div className="pm-elig-list">
            <CheckList items={PM_ELIGIBILITY.map((k) => t(k))} />
          </div>
        </div>
        <div>
          <span className="pm-elig-icon" aria-hidden="true">
            <FolderIcon />
          </span>
          <Eyebrow>{t("pm_docs_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("pm_docs_h2")}
          </MaskText>
          <div className="pm-elig-list">
            <CheckList items={PM_DOCUMENTS.map((k) => t(k))} />
          </div>
        </div>
      </div>
    </section>
  );
}
