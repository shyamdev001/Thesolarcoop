"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { MaskText } from "@/components/motion/MaskText";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";
import type { Article } from "@/lib/blog-articles";

/** Editorial hero for a single article — category, title, dek, meta, then a
 * large cinematic featured image with a subtle settle-in scale. */
export function ArticleHero({ article }: { article: Article }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useIsoLayoutEffect(() => {
    const photo = photoRef.current;
    const img = imgRef.current;
    if (!photo || !img || reduce) return;

    gsap.set(img, { scale: 1.06 });
    const st = ScrollTrigger.create({
      trigger: photo,
      start: "top 80%",
      once: true,
      onEnter: () => gsap.to(img, { scale: 1, duration: 1.2, ease: "power2.out" }),
    });
    return () => st.kill();
  }, [reduce]);

  return (
    <header className="article-hero">
      <div className="article-hero-text">
        <p className="breadcrumb" data-reveal>
          <Link href="/">{t("crumb_home")}</Link> <span aria-hidden="true">/</span>{" "}
          <Link href="/blog/">{t("blog_page_eyebrow")}</Link>
        </p>
        <span className="article-category" data-reveal>
          {article.category}
        </span>
        <MaskText as="h1" className="article-title" trigger="load">
          {article.title}
        </MaskText>
        <p className="article-dek" data-reveal>
          {article.dek}
        </p>
        <div className="article-meta" data-reveal>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span className="article-meta-dot" aria-hidden="true" />
          <span>
            {article.readMinutes} {t("article_min_read")}
          </span>
        </div>
      </div>

      <div className="article-hero-photo" ref={photoRef} data-reveal>
        <div className="article-hero-photo-frame">
          <Image
            ref={imgRef}
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </header>
  );
}
