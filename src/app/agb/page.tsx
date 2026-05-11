import { Section } from "@/components/ui";
import { AGB } from "@/content/legal";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: AGB.seoTitle,
  description: AGB.seoDescription,
  path: "/agb",
  noIndex: false,
});

export default function AgbPage() {
  return (
    <Section padding="default" containerSize="narrow">
      <h1 className="heading-2 mb-12">{AGB.title}</h1>
      {/* TODO: Full AGB content — must be reviewed by legal */}
      <div className="space-y-8 text-[var(--color-text-muted)]">
        <p>
          Die Allgemeinen Geschäftsbedingungen werden vor der Veröffentlichung
          ergänzt und von einem Rechtsanwalt geprüft.
        </p>
      </div>
    </Section>
  );
}
