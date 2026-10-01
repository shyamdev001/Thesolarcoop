import type { Metadata } from "next";
import Link from "next/link";
import { ArticleBody } from "@/components/sections/ArticleBody";
import type { ArticleBlock } from "@/lib/blog-articles";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

/**
 * Real policy text, ported verbatim from thesolarcoop.in/privacy-policy (the
 * live site's own published page) — reorganised into the same block system
 * the blog articles use (ArticleBody), not reworded. Legal text, so kept
 * English-only like the blog bodies, unlike the rest of the site's UI
 * chrome (which stays bilingual as normal).
 */
const BLOCKS: ArticleBlock[] = [
  { type: "note", text: "Effective date: 19 June 2026." },
  {
    type: "p",
    text: "Welcome to The Solar Coop. Your privacy is important to us. This Privacy Policy explains how Petlad Sojitra Taluka Sauraurja Utpadak Sahkari Mandali Limited (PSSU Mandali) collects, uses, stores, and protects your personal information when you visit our website or use our services.",
  },

  { type: "h3", text: "Information we collect" },
  { type: "p", text: "When you fill out enquiry forms, request a quote, or contact us, we may collect:" },
  {
    type: "list",
    items: [
      "Full name",
      "Phone number",
      "Email address",
      "City / location",
      "Address",
      "Project details",
      "Any other information you voluntarily provide",
    ],
  },
  { type: "p", text: "When you browse our website, we may automatically collect:" },
  {
    type: "list",
    items: [
      "IP address",
      "Browser type",
      "Device information",
      "Pages visited",
      "Date and time of access",
      "Cookies and analytics data",
    ],
  },

  { type: "h3", text: "How we use your information" },
  { type: "p", text: "We use the collected information to:" },
  {
    type: "list",
    items: [
      "Respond to your enquiries and requests",
      "Provide solar consultation and project quotations",
      "Process service requests",
      "Improve our website and customer experience",
      "Send updates regarding solar products, services, government schemes, and promotional offers",
      "Comply with legal and regulatory requirements",
    ],
  },

  { type: "h3", text: "Cookies and tracking technologies" },
  { type: "p", text: "Our website may use cookies and similar technologies to:" },
  {
    type: "list",
    items: [
      "Enhance website performance",
      "Remember user preferences",
      "Analyze website traffic and usage patterns",
      "Improve user experience",
    ],
  },
  {
    type: "p",
    text: "You may choose to disable cookies through your browser settings; however, some features of the website may not function properly.",
  },

  { type: "h3", text: "Sharing of information" },
  { type: "p", text: "We do not sell, rent, or trade your personal information to third parties." },
  { type: "p", text: "We may share your information with:" },
  {
    type: "list",
    items: [
      "Authorized employees and representatives",
      "Installation partners and service providers involved in project execution",
      "Government authorities for subsidy or compliance-related processes",
      "Legal authorities when required by law",
    ],
  },

  { type: "h3", text: "Data security" },
  {
    type: "p",
    text: "We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, alteration, or destruction. While we strive to protect your information, no method of transmission over the Internet is completely secure.",
  },

  { type: "h3", text: "Data retention" },
  { type: "p", text: "We retain personal information only for as long as necessary to:" },
  {
    type: "list",
    items: [
      "Fulfill the purposes described in this Privacy Policy",
      "Provide our services",
      "Comply with legal, tax, accounting, and regulatory obligations",
    ],
  },

  { type: "h3", text: "Third-party links" },
  {
    type: "p",
    text: "Our website may contain links to third-party websites, including government portals, financing partners, and social media platforms. We are not responsible for the privacy practices or content of such external websites.",
  },

  { type: "h3", text: "Your rights" },
  { type: "p", text: "Subject to applicable laws, you may have the right to:" },
  {
    type: "list",
    items: [
      "Access your personal information",
      "Request correction of inaccurate information",
      "Request deletion of your information",
      "Withdraw consent for marketing communications",
      "Object to certain processing activities",
    ],
  },
  { type: "p", text: "To exercise these rights, please contact us using the details below." },

  { type: "h3", text: "Children's privacy" },
  {
    type: "p",
    text: "Our services are intended for individuals who are at least 18 years of age. We do not knowingly collect personal information from children.",
  },

  { type: "h3", text: "Changes to this Privacy Policy" },
  {
    type: "p",
    text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of the website after such changes constitutes acceptance of the revised policy.",
  },

  { type: "h3", text: "Contact us" },
  {
    type: "p",
    text: "For any questions regarding this Privacy Policy or the handling of your personal information, please contact:",
  },
  {
    type: "note",
    text: "Petlad Sojitra Taluka Sauraurja Utpadak Sahkari Mandali Limited (PSSU Mandali) — B-22, Sardar Patel Anaj Market Yard, College Crossing, Petlad, Gujarat, India · +91 81409 68999 · sales@thesolarcoop.in",
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | The Solar Coop",
  description:
    "How The Solar Coop (PSSU Mandali) collects, uses, shares and protects the information you give us through enquiry forms and general use of this website.",
  alternates: { canonical: "/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | The Solar Coop",
    description: "How The Solar Coop collects, uses and protects your information.",
    images: [{ url: "/assets/img/pmsg-subsidy-consultation.webp" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy/" }]),
        )}
      />
      <section className="page-hero">
        <p className="breadcrumb">
          <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
          <span>Privacy Policy</span>
        </p>
        <h1>Privacy Policy</h1>
        <p className="lead">
          How we collect, use and protect the information you share with us.
        </p>
      </section>
      <section className="section">
        <div className="article-layout">
          <ArticleBody blocks={BLOCKS} />
        </div>
      </section>
    </>
  );
}
