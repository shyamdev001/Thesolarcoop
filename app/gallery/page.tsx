import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { GALLERY_PHOTOS } from "@/lib/gallery";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery — Real Solar Installations | The Solar Coop",
  description:
    "Real rooftop, farm and net-metering installations from The Solar Coop — photos and videos from our own site visits across Gujarat.",
  alternates: { canonical: "/gallery/" },
  openGraph: {
    title: "Gallery | The Solar Coop",
    description: "Real installations from our own site visits across Gujarat.",
    images: [{ url: GALLERY_PHOTOS[0].src }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery/" }]),
        )}
      />
      <PageHero
        crumbKey="gallery_crumb"
        titleKey="gallery_h1"
        leadKey="gallery_lead"
        primary={{ href: "/contact/", labelKey: "cta_talk" }}
        secondary={{ href: "/services/", labelKey: "hero_link" }}
        photo={GALLERY_PHOTOS[0]}
      />
      <GalleryGrid />
      <CtaBand href="/contact/" />
    </>
  );
}
