"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import type { BLOG_POSTS } from "@/lib/content";

type Post = (typeof BLOG_POSTS)[number];

/** One post card — shared by the homepage teaser and the /blog/ listing. */
export function BlogCard({ post }: { post: Post }) {
  const { t } = useLanguage();

  return (
    <Link className="blog-card" href={post.href} data-reveal>
      <div className="blog-card-media">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>
      <div className="blog-card-body">
        <time className="blog-card-date" dateTime={post.date}>
          {post.dateLabel}
        </time>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="blog-card-link">
          <span>{t("blog_readmore")}</span>
          <span className="blog-card-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
