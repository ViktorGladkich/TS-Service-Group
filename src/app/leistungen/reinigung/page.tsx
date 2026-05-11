import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Reinigung Dresden",
  description:
    "Gewerbliche und private Reinigung in Dresden — Unterhaltsreinigung, Grundreinigung, Bauendreinigung. Geschultes Personal, geprüfte Verfahren.",
  path: "/leistungen/reinigung",
  keywords: ["Gebäudereinigung Dresden", "Unterhaltsreinigung", "Bauendreinigung", "Fensterreinigung"],
});

export default function ReinigungPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">03 — Reinigung</p>
      <h1 className="heading-1">Saubere Räume, klare Standards</h1>
      {/* TODO: Full service detail page with scroll mechanics */}
    </Section>
  );
}
