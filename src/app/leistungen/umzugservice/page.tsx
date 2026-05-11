import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Umzugservice Dresden",
  description:
    "Vollumfänglicher Umzugservice für Privatkunden und Unternehmen in Dresden. Verpacken, transportieren, montieren — alles aus einer Hand.",
  path: "/leistungen/umzugservice",
  keywords: ["Umzugservice Dresden", "Umzugsunternehmen", "Firmenumzug", "Privatumzug"],
});

export default function UmzugservicePage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">02 — Umzugservice</p>
      <h1 className="heading-1">Privat- und Firmenumzüge ohne Reibung</h1>
      {/* TODO: Full service detail page with scroll mechanics */}
    </Section>
  );
}
