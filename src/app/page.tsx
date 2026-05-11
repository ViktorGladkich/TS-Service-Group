import { HeroSection } from "@/components/sections/hero-section";
import { TickerSection } from "@/components/sections/ticker-section";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { BentoSection } from "@/components/sections/bento-section";

/**
 * Startseite — homepage
 */
export default function HomePage() {
  return (
    <main className="bg-[#EDEDED]">
      <HeroSection />
      <TickerSection />

      {/* Parallax wrapper: ServiceShowcase sticks, BentoSection slides over it */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <ServiceShowcase />
        </div>
        <div className="relative z-10">
          <BentoSection />
        </div>
      </div>
    </main>
  );
}
