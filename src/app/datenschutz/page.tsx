import { Section } from "@/components/ui";
import { DATENSCHUTZ } from "@/content/legal";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: DATENSCHUTZ.seoTitle,
  description: DATENSCHUTZ.seoDescription,
  path: "/datenschutz",
  noIndex: false,
});

export default function DatenschutzPage() {
  return (
    <Section padding="default" containerSize="narrow">
      <h1 className="heading-2 mb-12">{DATENSCHUTZ.title}</h1>
      <p className="text-sm text-text-subtle">
        Stand: {DATENSCHUTZ.lastUpdated}
      </p>
      {/* TODO: Full Datenschutzerklärung content — must be reviewed by legal */}
      <div className="mt-8 space-y-8 text-text-muted">
        <p>
          Die Datenschutzerklärung wird vor der Veröffentlichung ergänzt und von
          einem Rechtsanwalt geprüft.
        </p>
      </div>
    </Section>
  );
}
