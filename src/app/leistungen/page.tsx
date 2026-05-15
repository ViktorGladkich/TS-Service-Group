import { LeistungenHero } from "@/components/sections/leistungen-hero";
import { LeistungenServices } from "@/components/sections/leistungen-services";
import { CtaSection } from "@/components/sections/cta-section";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Leistungen",
  description:
    "Sicherheitsdienst, Umzugservice und Reinigung in Dresden — drei Geschäftsbereiche, ein Qualitätsanspruch.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <LeistungenHero />
      <LeistungenServices />
      <CtaSection />
    </>
  );
}
