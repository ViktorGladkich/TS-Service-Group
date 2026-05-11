import { Section } from "@/components/ui";
import { IMPRESSUM } from "@/content/legal";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: IMPRESSUM.seoTitle,
  description: IMPRESSUM.seoDescription,
  path: "/impressum",
  noIndex: false,
});

export default function ImpressumPage() {
  return (
    <Section padding="default" containerSize="narrow">
      <h1 className="heading-2 mb-12">{IMPRESSUM.title}</h1>
      {IMPRESSUM.sections.map((section) => (
        <div key={section.heading} className="mb-10">
          <h2 className="mb-3 text-lg font-medium">{section.heading}</h2>
          <p className="whitespace-pre-line text-[var(--color-text-muted)]">
            {section.content}
          </p>
        </div>
      ))}
    </Section>
  );
}
