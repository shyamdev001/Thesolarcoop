import type { Metadata } from "next";
import Link from "next/link";
import { ArticleBody } from "@/components/sections/ArticleBody";
import type { ArticleBlock } from "@/lib/blog-articles";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

/**
 * Unlike Privacy Policy, thesolarcoop.in has no published Terms of Service
 * to port — this is drafted fresh, standard terms for an Indian solar EPC
 * cooperative's lead-gen marketing site (not an e-commerce checkout), kept
 * English-only like the other legal/article pages.
 */
const BLOCKS: ArticleBlock[] = [
  { type: "note", text: "Effective date: 19 June 2026." },
  {
    type: "p",
    text: "These Terms of Service govern your use of this website, operated by Petlad Sojitra Taluka Sauraurja Utpadak Sahkari Mandali Limited (PSSU Mandali), trading as The Solar Coop. By browsing this website or submitting an enquiry through it, you agree to these terms.",
  },

  { type: "h3", text: "About this website" },
  {
    type: "p",
    text: "This website is an informational and lead-generation platform for The Solar Coop's rooftop, farm and commercial solar services, and PM Surya Ghar subsidy assistance. It does not process payments or sell goods online — every project proceeds through a direct site visit, quotation and signed agreement with our team, outside this website.",
  },

  { type: "h3", text: "Accuracy of information" },
  {
    type: "p",
    text: "We keep pricing estimates, subsidy figures, savings calculations and project details as accurate and current as reasonably possible, but:",
  },
  {
    type: "list",
    items: [
      "Government subsidy schemes, rates and eligibility (including PM Surya Ghar) can change without notice and are ultimately governed by the relevant authority, not by us.",
      "The solar savings calculator gives estimates only, based on general assumptions — your actual output and savings depend on your site, roof, shading, consumption and local tariffs.",
      "Final pricing, system sizing and timelines are confirmed only after a site assessment and a formal quotation.",
    ],
  },

  { type: "h3", text: "Enquiries and quotations" },
  {
    type: "p",
    text: "Submitting the quote form, calculator or contact form is an enquiry, not a booking or contract. A project begins only once both parties agree to a written quotation and, where applicable, sign an installation agreement.",
  },

  { type: "h3", text: "Acceptable use" },
  { type: "p", text: "When using this website, you agree not to:" },
  {
    type: "list",
    items: [
      "Submit false, misleading or fraudulent information through any form",
      "Attempt to disrupt, overload or gain unauthorized access to the website or its systems",
      "Copy, scrape or republish the website's content for commercial purposes without permission",
      "Use the website for any unlawful purpose",
    ],
  },

  { type: "h3", text: "Intellectual property" },
  {
    type: "p",
    text: "The text, photographs, graphics, logos and layout of this website belong to PSSU Mandali unless otherwise credited, and may not be reproduced without our written permission. Product names, brand names and logos of third parties (inverter and panel manufacturers, government schemes, etc.) belong to their respective owners and are used for identification purposes only.",
  },

  { type: "h3", text: "Third-party links" },
  {
    type: "p",
    text: "This website links to third-party resources, including government subsidy portals, financing partners and social media platforms, for your convenience. We don't control and aren't responsible for the content, accuracy or practices of those external sites.",
  },

  { type: "h3", text: "Limitation of liability" },
  {
    type: "p",
    text: "This website and its content are provided “as is.” To the extent permitted by law, PSSU Mandali is not liable for any loss or damage arising from your use of this website, reliance on its estimates or calculators, or any temporary unavailability of the site. This does not limit any liability we hold under our separate, signed installation or service agreements.",
  },

  { type: "h3", text: "Privacy" },
  {
    type: "p",
    text: "Our collection and use of personal information submitted through this website — including enquiry forms — is covered separately in our Privacy Policy page.",
  },

  { type: "h3", text: "Governing law" },
  {
    type: "p",
    text: "These terms are governed by the laws of India, and any disputes arising from them fall under the jurisdiction of the courts at Anand, Gujarat.",
  },

  { type: "h3", text: "Changes to these terms" },
  {
    type: "p",
    text: "We may update these Terms of Service from time to time. Changes take effect once posted on this page with a revised effective date. Continued use of the website after a change constitutes acceptance of the updated terms.",
  },

  { type: "h3", text: "Contact us" },
  { type: "p", text: "For any questions about these Terms of Service, please contact:" },
  {
    type: "note",
    text: `${CONTACT.legalName} — ${CONTACT.address} · ${CONTACT.phoneDisplay} · ${CONTACT.email}`,
  },
];

export const metadata: Metadata = {
  title: "Terms of Service | The Solar Coop",
  description:
    "The terms governing your use of The Solar Coop's (PSSU Mandali) website, enquiry forms and solar calculator.",
  alternates: { canonical: "/terms-of-service/" },
  openGraph: {
    title: "Terms of Service | The Solar Coop",
    description: "The terms governing your use of The Solar Coop's website.",
    images: [{ url: "/assets/img/pmsg-subsidy-consultation.webp" }],
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms-of-service/" }]),
        )}
      />
      <section className="page-hero">
        <p className="breadcrumb">
          <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
          <span>Terms of Service</span>
        </p>
        <h1>Terms of Service</h1>
        <p className="lead">The terms governing your use of this website.</p>
      </section>
      <section className="section">
        <div className="article-layout">
          <ArticleBody blocks={BLOCKS} />
        </div>
      </section>
    </>
  );
}
