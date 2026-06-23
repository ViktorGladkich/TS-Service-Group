import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { IMPRESSUM } from "@/content/legal";
import { generatePageMetadata } from "@/lib/seo";

// Exakter Titel laut Vorgabe — Template ("%s | …") wird bewusst umgangen.
export const metadata: Metadata = {
  ...generatePageMetadata({
    description: IMPRESSUM.seoDescription,
    path: "/impressum",
    noIndex: false,
  }),
  title: IMPRESSUM.seoTitle,
};

export default function ImpressumPage() {
  return (
    <Section padding="default" containerSize="narrow">
      <h1 className="heading-2 mb-12">{IMPRESSUM.title}</h1>
      {IMPRESSUM.sections.map((section) => (
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
