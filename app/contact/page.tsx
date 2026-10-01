import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactMethods } from "@/components/sections/ContactMethods";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { CONTACT } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact The Solar Coop — Petlad, Anand, Gujarat",
  description:
    "Talk to The Solar Coop about rooftop, farm or commercial solar. Head office in Petlad, Gujarat. Phone +91 81409 68999, sales@thesolarcoop.in.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact The Solar Coop",
    description:
      "Talk to a real solar engineer, not a call centre. Petlad, Anand, Gujarat.",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]),
        )}
      />
      <PageHero
        crumbKey="ct_crumb"
        titleKey="quote_h2"
        leadKey="ct_lead"
        primary={{ href: CONTACT.phoneHref, labelKey: "quote_call" }}
        secondary={{ href: CONTACT.emailHref, label: CONTACT.email }}
        mark="pin"
        showSocial
        photo={{
          src: "/assets/img/pmsg-subsidy-consultation.webp",
          alt: "A Solar Coop team member walking a customer through PM Surya Ghar subsidy and loan paperwork at the office",
        }}
      />
      <ContactMethods />
      <QuoteSection headingKey="ct_form_h2" />
      <Faq helpHref={CONTACT.phoneHref} />
      <CtaBand />
    </>
  );
}
