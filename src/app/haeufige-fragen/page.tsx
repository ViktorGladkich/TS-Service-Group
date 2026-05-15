import { FaqHero } from "@/components/sections/faq-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { generatePageMetadata } from "@/lib/seo";
import { generateFaqSchema } from "@/lib/schema";
import {
  FAQ_GENERAL,
  FAQ_SICHERHEIT,
  FAQ_UMZUG,
  FAQ_REINIGUNG,
} from "@/content/faq";

export const metadata = generatePageMetadata({
  title: "Häufige Fragen",
  description:
    "Antworten auf häufige Fragen zu Sicherheitsdienst, Umzug und Reinigung — Versicherung, Qualifikation, Verfügbarkeit, Verträge und mehr.",
  path: "/haeufige-fragen",
});

const ALL_FAQS = [
  ...FAQ_GENERAL,
  ...FAQ_SICHERHEIT,
  ...FAQ_UMZUG,
  ...FAQ_REINIGUNG,
];

const faqSchema = generateFaqSchema(ALL_FAQS);

export default function HaeufigeFragenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqHero />
      <FaqAccordion />
      <CtaSection />
    </>
  );
}
