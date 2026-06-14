import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";

// Below-the-fold sections are code-split into their own client chunks so they
// don't bloat the initial JS the browser must download + hydrate for the hero.
// SSR stays enabled (default) so the HTML/SEO content is still server-rendered.
const ShowreelSection = dynamic(() =>
  import("@/components/sections/showreel-section").then((m) => m.ShowreelSection)
);
const TickerSection = dynamic(() =>
  import("@/components/sections/ticker-section").then((m) => m.TickerSection)
);
const ServiceShowcase = dynamic(() =>
  import("@/components/sections/service-showcase").then((m) => m.ServiceShowcase)
);
const BentoSection = dynamic(() =>
  import("@/components/sections/bento-section").then((m) => m.BentoSection)
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/process-section").then((m) => m.ProcessSection)
);
const FaqAccordion = dynamic(() =>
  import("@/components/sections/faq-accordion").then((m) => m.FaqAccordion)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

/**
 * Startseite — homepage
 */
export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <ShowreelSection />
      <TickerSection />
      <ServiceShowcase />
      <BentoSection />
      <ProcessSection />
      <FaqAccordion />
      <CtaSection />
    </div>
  );
}
