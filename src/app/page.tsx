import { HeroSection } from "@/components/sections/hero-section";
import { TickerSection } from "@/components/sections/ticker-section";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { BentoSection } from "@/components/sections/bento-section";

/**
 * Startseite — homepage
 */
export default function HomePage() {
  return (
    <main className="bg-metallic-light">
      <HeroSection />
      <TickerSection />
      <ServiceShowcase />
      <BentoSection />
    </main>
  );
}
