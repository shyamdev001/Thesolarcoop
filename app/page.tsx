import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Why } from "@/components/sections/Why";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { SolarCalculator } from "@/components/sections/SolarCalculator";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Coverage } from "@/components/sections/Coverage";
import { Numbers } from "@/components/sections/Numbers";
import { Reviews } from "@/components/sections/Reviews";
import { Work } from "@/components/sections/Work";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())} />
      <Hero />
      <About />
      <Why />
      <Process />
      <Services />
      <SolarCalculator />
      <QuoteSection />
      <Coverage />
      <Numbers />
      <Reviews />
      <Work />
      <BlogTeaser />
      <Faq />
      <CtaBand />
    </>
  );
}
