import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Leistungen",
  description:
    "Sicherheitsdienst, Umzugservice und Reinigung in Dresden — drei Geschäftsbereiche, ein Qualitätsanspruch.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">Unsere Leistungen</p>
      <h1 className="heading-1">Drei Disziplinen. Ein Anspruch.</h1>
      {/* TODO: ServiceShowcase with mask-reveal cards */}
    </Section>
  );
}
