import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PmStatBand } from "@/components/sections/PmStatBand";
import { PmAbout } from "@/components/sections/PmAbout";
import { PmBenefits } from "@/components/sections/PmBenefits";
import { SubsidyTable } from "@/components/sections/SubsidyTable";
import { SolarCalculator } from "@/components/sections/SolarCalculator";
import { PmImpact } from "@/components/sections/PmImpact";
import { PmEligibility } from "@/components/sections/PmEligibility";
import { PmHowWeHelp } from "@/components/sections/PmHowWeHelp";
import { CtaBand } from "@/components/sections/CtaBand";
import { CONTACT } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "PM Surya Ghar Subsidy — Muft Bijli Yojana | The Solar Coop",
  description:
    "PM Surya Ghar: Muft Bijli Yojana gives homes a subsidy of up to 40% (up to ₹78,000). See who can apply and how The Solar Coop handles the paperwork.",
  alternates: { canonical: "/pm-surya-ghar/" },
  openGraph: {
    title: "PM Surya Ghar: Muft Bijli Yojana | The Solar Coop",
    description:
      "Rooftop solar subsidy of up to 40% for homes. The Solar Coop handles the registration and the claim.",
  },
};

export default function PmSuryaGharPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "PM Surya Ghar", path: "/pm-surya-ghar/" }]),
        )}
      />
      <PageHero
        crumbKey="pm_crumb"
        titleKey="pm_h1"
        leadKey="pm_lead"
        primary={{ href: "/contact/", labelKey: "pm_cta" }}
        secondary={{ href: CONTACT.phoneHref, labelKey: "cta_call" }}
        mark="sun"
        photo={{
          src: "/assets/img/installer-portrait.jpg",
          alt: "A Solar Coop technician testing a newly installed rooftop solar panel",
        }}
      />
      <PmStatBand />
      <PmAbout />
      <PmBenefits />
      <SubsidyTable />
      <SolarCalculator />
      <PmImpact />
      <PmEligibility />
      <PmHowWeHelp />
      <CtaBand
        href="/contact/"
        titleKey="pm_cta_h2"
        buttonKey="pm_cta_btn"
      />
    </>
  );
}
