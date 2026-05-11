import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Sicherheitsdienst Dresden",
  description:
    "Professioneller Objektschutz, Veranstaltungsschutz und Werkschutz in Dresden und Sachsen. Geschultes Personal, klare Prozesse.",
  path: "/leistungen/sicherheitsdienst",
  keywords: ["Sicherheitsdienst Dresden", "Objektschutz", "Veranstaltungsschutz", "Werkschutz"],
});

export default function SicherheitsdienstPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">01 — Sicherheitsdienst</p>
      <h1 className="heading-1">Diskreter Schutz für Objekte und Veranstaltungen</h1>
      {/* TODO: Full service detail page with scroll mechanics */}
    </Section>
  );
}
