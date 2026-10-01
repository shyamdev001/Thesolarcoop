"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { BlogCard } from "@/components/sections/BlogCard";
import { BLOG_POSTS } from "@/lib/content";

/** "More from The Solar Coop" — up to 3 other real posts, excluding the
 * current one. */
export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const { t } = useLanguage();
  const posts = BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="section section-tight">
      <SectionHead align="left" eyebrow={t("blog_eyebrow")} title={t("article_related_h2")} />
      <div className="blog-teaser-grid">
        {posts.map((post) => (
          <BlogCard post={post} key={post.href} />
        ))}
      </div>
    </section>
  );
}
