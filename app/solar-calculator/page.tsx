import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SolarCalculator } from "@/components/sections/SolarCalculator";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar Savings Calculator | The Solar Coop",
  description:
    "Estimate your solar system size, PM Surya Ghar subsidy, monthly savings and payback period — based on your real average monthly electricity use.",
  alternates: { canonical: "/solar-calculator/" },
  openGraph: {
    title: "Solar Savings Calculator | The Solar Coop",
    description: "A real, PM Surya Ghar-aware estimate — updated instantly as you drag the slider.",
    images: [{ url: "/assets/img/pmsg-subsidy-consultation.jpg" }],
  },
};

export default function SolarCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solar Calculator", path: "/solar-calculator/" }]),
        )}
      />
      <PageHero
        crumbKey="calc_crumb"
        titleKey="calc_h1"
        leadKey="calc_lead"
        primary={{ href: "/contact/", labelKey: "cta_talk" }}
        secondary={{ href: "/pm-surya-ghar/", labelKey: "hero_link" }}
        mark="sun"
      />
      <SolarCalculator showHeading={false} />
      <Faq helpHref="/contact/" />
      <CtaBand href="/contact/" />
    </>
  );
}
