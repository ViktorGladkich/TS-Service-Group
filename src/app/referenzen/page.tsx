import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Referenzen",
  description:
    "Ausgewählte Projekte und Referenzen der TS Service Group in Dresden — Sicherheitsdienst, Umzug und Reinigung.",
  path: "/referenzen",
});

export default function ReferenzenPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">Referenzen</p>
      <h1 className="heading-1">Ausgewählte Projekte</h1>
      {/* TODO: Horizontal scroll showcase */}
    </Section>
  );
}
