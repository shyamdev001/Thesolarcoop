"use client";

import { useLanguage } from "@/lib/i18n/context";

/** Small transparency credit at the foot of an article's body. */
export function ArticleSource({ sourceUrl }: { sourceUrl: string }) {
  const { t } = useLanguage();
  return (
    <p className="blog-source" data-reveal>
      {t("blog_source_note")}:{" "}
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        thesolarcoop.in
      </a>
    </p>
  );
}
