export interface ServicePillar {
  id: string;
  title: string;
  body: string;
}

export interface ServiceShowcaseBlock {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceProcessStep {
  id: string;
  title: string;
  body: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceMeta {
  number: string;          // "01"
  slug: string;            // "sicherheitsdienst"
  label: string;           // "Sicherheitsdienst"
  shortLabel: string;      // "Sicherheit"
  tagline: string;         // small italic-ish phrase
  heroEyebrow: string;     // "01 — Sicherheitsdienst"
  heroTitleLines: string[];// big display ("Diskreter Schutz.", "Klare Präsenz.")
  heroIntro: string;       // body paragraph
  heroImage: string;       // /images/...
  heroImageAlt: string;
  heroMeta: { label: string; value: string }[]; // bottom-of-hero stats row
  pillarsEyebrow: string;
  pillarsTitle: string[];
  pillarsIntro: string;
  pillars: ServicePillar[];
  showcase: ServiceShowcaseBlock[];
  processEyebrow: string;
  processTitle: string[];
  processIntro: string;
  process: ServiceProcessStep[];
  faqEyebrow: string;
  faqTitle: string[];
  faq: ServiceFaqItem[];
  ctaEyebrow: string;
  ctaTitle: string[];
  ctaBody: string;
  ctaImage: string;
  ctaImageAlt: string;
}
