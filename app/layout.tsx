import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Anek_Gujarati } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/context";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { Analytics } from "@/components/Analytics";
import { CONTACT, SOCIAL_LINKS } from "@/lib/site";
import "./globals.css";

// LocalBusiness structured data — same facts already in lib/site.ts, just
// exposed to search engines (Google's business panel / local pack pull
// from this, not from prose on the page). One instance, site-wide.
const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "The Solar Coop",
  alternateName: CONTACT.legalName,
  url: "https://www.thesolarcoop.in",
  logo: "https://www.thesolarcoop.in/new-logo.webp",
  image: "https://www.thesolarcoop.in/new-logo.webp",
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-22, Sardar Patel Anaj Market Yard, College Crossing",
    addressLocality: "Petlad",
    addressRegion: "Gujarat",
    postalCode: "384973",
    addressCountry: "IN",
  },
  areaServed: "Gujarat, India",
  sameAs: SOCIAL_LINKS.map((s) => s.href),
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anekGujarati = Anek_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesolarcoop.in"),
  title: {
    default: "The Solar Coop — Rooftop, Farm & Commercial Solar in Gujarat",
    template: "%s",
  },
  description:
    "The Solar Coop is a Gujarat solar cooperative. We design, install and maintain rooftop, farm and commercial solar, with full help on the PM Surya Ghar subsidy.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "The Solar Coop — Solar for homes, farms and businesses",
    description:
      "Gujarat's solar cooperative. Rooftop, farm and commercial solar, with PM Surya Ghar subsidy support.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="gu"
      className={`${manrope.variable} ${inter.variable} ${anekGujarati.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
        {/* Gujarati is the default for first-time visitors. Apply the
            stored language before paint so a visitor who has explicitly
            chosen English gets the right typography immediately, instead
            of a flash of Gujarati first. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('tsc-lang')==='en')document.documentElement.lang='en'}catch(e){}",
          }}
        />
        <Analytics />
        <Preloader />
        <LanguageProvider>
          <SkipLink />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <SmoothScroll />
          <ScrollReveal />
          <Cursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
