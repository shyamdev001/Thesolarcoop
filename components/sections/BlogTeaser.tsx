"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/sections/BlogCard";
import { BLOG_POSTS } from "@/lib/content";

/**
 * "Latest from the blog" — the 3 most recent real posts from
 * thesolarcoop.in/blogs, each linking out to the original article (we
 * don't have the full article bodies to host locally, so this doesn't
 * pretend to). "View all posts" goes to our own /blog/ listing.
 */
export function BlogTeaser() {
  const { t } = useLanguage();
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="section blog-teaser">
      <div className="blog-teaser-head">
        <SectionHead
          align="left"
          eyebrow={t("blog_eyebrow")}
          title={t("blog_h2")}
          sub={t("blog_sub")}
        />
        <Button href="/blog/" variant="ghost" className="blog-teaser-all" dataReveal>
          {t("blog_view_all")}
        </Button>
      </div>

      <div className="blog-teaser-grid">
        {posts.map((post) => (
          <BlogCard post={post} key={post.href} />
        ))}
      </div>
    </section>
  );
}
