import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt mit der TS Service Group auf — Ihr Ansprechpartner für Sicherheitsdienst, Umzug und Reinigung in Dresden.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">Kontakt</p>
      <h1 className="heading-1">Sprechen Sie uns an</h1>
      {/* TODO: Contact form (RHF + Zod), OSM map, NAP */}
    </Section>
  );
}
