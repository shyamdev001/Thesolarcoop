import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { Process } from "@/components/sections/Process";
import { Why } from "@/components/sections/Why";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar Services — Rooftop, Commercial & Farm | The Solar Coop",
  description:
    "Residential rooftop, commercial & industrial, and farm solar from The Solar Coop — designed, installed and maintained by our own team across Gujarat.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Solar Services | The Solar Coop",
    description:
      "Rooftop, commercial, industrial and farm solar across Gujarat.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]),
        )}
      />
      <PageHero
        crumbKey="sv_crumb"
        titleKey="sv_h1"
        leadKey="sv_lead"
        primary={{ href: "/contact/", labelKey: "sv_cta" }}
        secondary={{ href: "#process", labelKey: "hero_link" }}
        mark="grid"
        photo={{
          src: "/assets/img/crew-installing.webp",
          alt: "The Solar Coop team installing panels on a rooftop rail system",
        }}
      />
      <ServiceDetails />
      <Process />
      <Why ctaHref="/contact/" />
      <Faq helpHref="/contact/" />
      <CtaBand href="/contact/" />
    </>
  );
}
