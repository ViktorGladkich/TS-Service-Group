import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { DATENSCHUTZ } from "@/content/legal";
import { generatePageMetadata } from "@/lib/seo";

// Exakter Titel laut Vorgabe — Template ("%s | …") wird bewusst umgangen.
export const metadata: Metadata = {
  ...generatePageMetadata({
    description: DATENSCHUTZ.seoDescription,
    path: "/datenschutz",
    noIndex: false,
  }),
  title: DATENSCHUTZ.seoTitle,
};

export default function DatenschutzPage() {
  return (
    <Section padding="default" containerSize="narrow">
      <h1 className="heading-2 mb-6">{DATENSCHUTZ.title}</h1>
      <p className="mb-12 text-sm text-text-subtle">
        Stand: {DATENSCHUTZ.lastUpdated}
      </p>
      {DATENSCHUTZ.sections.map((section) => (
        <div key={section.heading} className="mb-10">
          <h2 className="mb-3 text-lg font-medium">{section.heading}</h2>
          <p className="whitespace-pre-line text-text-muted">
            {section.content}
          </p>
        </div>
      ))}
    </Section>
  );
}
