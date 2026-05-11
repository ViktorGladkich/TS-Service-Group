import { Section } from "@/components/ui";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Über uns",
  description:
    "Erfahren Sie mehr über die TS Service Group — unser Team, unsere Werte und unser Anspruch in Dresden.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <Section padding="hero">
      <p className="eyebrow mb-4">Über uns</p>
      <h1 className="heading-1">Wer wir sind</h1>
      {/* TODO: Team, values, company story */}
    </Section>
  );
}
