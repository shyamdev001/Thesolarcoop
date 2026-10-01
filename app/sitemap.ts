import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog-articles";

const BASE = "https://www.thesolarcoop.in";

/** Static routes + one entry per real blog article (generateStaticParams'
 * slugs, same source ARTICLES the blog pages themselves render from). */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pm-surya-ghar/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/gallery/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/solar-calculator/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy-policy/`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${BASE}/blog/${article.slug}/`,
    lastModified: article.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes];
}
