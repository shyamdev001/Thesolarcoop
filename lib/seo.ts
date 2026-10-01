// Structured-data (JSON-LD) builders. Server-only, plain functions — no
// dependency on the client i18n context, since schema is generated once at
// build/request time from the real English copy (the same copy search
// engines crawl via SSR), the same approach layout.tsx's LocalBusiness
// block already uses.

import { FAQS } from "./content";
import { translations } from "./i18n/translations";

const en = translations.en as Record<string, string>;

/**
 * FAQPage schema from the site's real FAQ content (lib/content.ts FAQS) —
 * added once, on the homepage, rather than on every page that also renders
 * the <Faq> component (Services, the calculator): the content is
 * identical in all three places, and duplicating the same schema three
 * times reads as thin/repetitive structured data rather than three
 * genuinely distinct FAQ sets.
 */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: en[q],
      acceptedAnswer: { "@type": "Answer", text: en[a] },
    })),
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList schema matching the visible breadcrumb on inner pages. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const base = "https://www.thesolarcoop.in";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${base}${c.path}`,
    })),
  };
}

/** BlogPosting schema for one real article (lib/blog-articles.ts). */
export function articleJsonLd(article: {
  title: string;
  dek: string;
  date: string;
  image: string;
  slug: string;
}) {
  const base = "https://www.thesolarcoop.in";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    image: `${base}${article.image}`,
    url: `${base}/blog/${article.slug}/`,
    mainEntityOfPage: `${base}/blog/${article.slug}/`,
    author: {
      "@type": "Organization",
      name: "The Solar Coop",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "The Solar Coop",
      logo: { "@type": "ImageObject", url: `${base}/new-logo.webp` },
    },
  };
}

/** Renders a JSON-LD object as the <script> tag it needs to sit in. */
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
