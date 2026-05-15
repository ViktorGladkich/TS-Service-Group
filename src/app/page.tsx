import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TickerSection } from "@/components/sections/ticker-section";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { BentoSection } from "@/components/sections/bento-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaSection } from "@/components/sections/cta-section";

/**
 * Startseite — homepage
 */
export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <TickerSection />
      <ServiceShowcase />
      <BentoSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
