import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { BLOG_POSTS } from "@/lib/content";
import { BlogList } from "@/components/sections/BlogList";
import { CONTACT } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Solar Guides & Updates | The Solar Coop",
  description:
    "Solar guides from The Solar Coop — pricing, subsidy walkthroughs and installation guides for Anand, Kheda and across Gujarat.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog | The Solar Coop",
    description:
      "Solar pricing, subsidy and installation guides for Gujarat, from thesolarcoop.in.",
    images: [{ url: "/assets/img/installer-hardhat.webp" }],
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]),
        )}
      />
      <PageHero
        crumbKey="blog_page_eyebrow"
        titleKey="blog_page_h2"
        leadKey="blog_page_sub"
        primary={{ href: "/contact/", labelKey: "cta_talk" }}
        secondary={{ href: CONTACT.phoneHref, labelKey: "cta_call" }}
      />
      <BlogList posts={BLOG_POSTS} />
      <CtaBand href="/contact/" />
    </>
  );
}
