"use client";

import { useLanguage } from "@/lib/i18n/context";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a className="skip-link" href="#main">
      {t("skip")}
    </a>
  );
}
