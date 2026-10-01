import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { Founder } from "@/components/sections/Founder";
import { AboutJourney } from "@/components/sections/AboutJourney";
import { AboutVisionMission } from "@/components/sections/AboutVisionMission";
import { AboutSolutions } from "@/components/sections/AboutSolutions";
import { Numbers } from "@/components/sections/Numbers";
import { CtaBand } from "@/components/sections/CtaBand";
import { CONTACT } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About The Solar Coop — India's first solar cooperative",
  description:
    "The Solar Coop (PSSU Mandali) started in 2018 in Anand district, Gujarat, with 87 farmer members. Today it serves homes, farms and businesses across the state.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About The Solar Coop",
    description:
      "India's first solar cooperative — farmer-led, member-owned, working across Gujarat since 2018.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]),
        )}
      />
      <PageHero
        crumbKey="ab_crumb"
        titleKey="ab_h1"
        leadKey="ab_lead"
        primary={{ href: "/contact/", labelKey: "cta_talk" }}
        secondary={{ href: CONTACT.phoneHref, labelKey: "cta_call" }}
        mark="coop"
        photo={{
          src: "/assets/img/aerial-farm.jpg",
          alt: "Aerial view of a ground-mounted solar array beside farm buildings in Gujarat",
        }}
      />
      <AboutStory />
      <Founder />
      <AboutJourney />
      <AboutVisionMission />
      <AboutSolutions />
      <Numbers />
      <CtaBand href="/contact/" />
    </>
  );
}
