import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/blog-articles";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ArticleSource } from "@/components/sections/ArticleSource";
import { RelatedArticles } from "@/components/sections/RelatedArticles";
import { ArticleCta } from "@/components/sections/ArticleCta";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | The Solar Coop`,
    description: article.dek,
    alternates: { canonical: `/blog/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.dek,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleJsonLd(article))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: article.title, path: `/blog/${article.slug}/` },
          ]),
        )}
      />
      <ReadingProgress targetId="article-content" />
      <ArticleHero article={article} />
      <section className="section" id="article-content">
        <div className="article-layout">
          <ArticleBody blocks={article.blocks} />
          <ArticleSource sourceUrl={article.sourceUrl} />
        </div>
      </section>
      <RelatedArticles currentSlug={article.slug} />
      <ArticleCta />
    </>
  );
}
