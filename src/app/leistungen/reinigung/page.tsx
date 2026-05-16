import { generatePageMetadata } from "@/lib/seo";
import {
  ServiceHero,
  ServicePillars,
  ServiceShowcase,
  ServiceProcess,
  ServiceFaq,
  ServiceCta,
  type ServiceMeta,
} from "@/components/sections/service-detail";

export const metadata = generatePageMetadata({
  title: "Reinigung Dresden",
  description:
    "Gewerbliche und private Reinigung in Dresden — Unterhaltsreinigung, Grundreinigung, Glas- und Bauendreinigung. Geschultes Personal, geprüfte Verfahren, dokumentierte Qualität.",
  path: "/leistungen/reinigung",
  keywords: [
    "Gebäudereinigung Dresden",
    "Unterhaltsreinigung Dresden",
    "Bauendreinigung Dresden",
    "Fensterreinigung Dresden",
    "Büroreinigung",
  ],
});

const META: ServiceMeta = {
  number: "03",
  slug: "reinigung",
  label: "Reinigung",
  shortLabel: "Reinigung",
  tagline: "Geschult · Geprüft · Dokumentiert",
  heroEyebrow: "03 — Reinigung",
  heroTitleLines: ["Saubere Räume.", "Klare Standards."],
  heroIntro:
    "Unterhalts-, Grund- und Sonderreinigung für Büros, Praxen, Treppenhäuser und Privatobjekte in Dresden. Geschultes Personal, geprüfte Mittel, dokumentierte Qualität — auch bei wiederkehrenden Aufträgen.",
  heroImage: "/images/service-cleaning.jpg",
  heroImageAlt:
    "Reinigungsfachkraft beim Polieren von Glasflächen in einem hellen Büro",
  heroMeta: [
    { label: "Modus", value: "Einmalig · Wiederk." },
    { label: "Personal", value: "Geschult · Fest" },
    { label: "Region", value: "Dresden · Umland" },
    { label: "Doku", value: "Reinigungsplan" },
  ],

  pillarsEyebrow: "WORAUF ES WIRKLICH ANKOMMT",
  pillarsTitle: ["Vier Standards.", "Jeden Einsatz."],
  pillarsIntro:
    "Sauberkeit ist sichtbar — was sie möglich macht, ist es selten. Personal, Mittel, Prozesse und Kontrolle: das sind die Stellschrauben, an denen sich Qualität entscheidet.",
  pillars: [
    {
      id: "01",
      title: "Feste Teams",
      body:
        "Ihre Objekte werden möglichst von denselben Mitarbeitenden betreut — sie kennen Ihre Räume, Geräte und Wünsche.",
    },
    {
      id: "02",
      title: "Geprüfte Mittel",
      body:
        "Wir setzen materialgerechte, dosierte Reinigungsmittel ein — auch umweltschonende Alternativen, wenn gewünscht.",
    },
    {
      id: "03",
      title: "Reinigungsplan",
      body:
        "Jeder Auftrag beginnt mit einem schriftlichen Plan: Was wird wann, wie oft und durch wen gereinigt? Sie wissen es, wir auch.",
    },
    {
      id: "04",
      title: "Qualitätskontrolle",
      body:
        "Regelmäßige Begehungen, dokumentierte Checks, kurze Wege bei Beanstandungen — kein anonymer Subunternehmer-Pingpong.",
    },
  ],

  showcase: [
    {
      eyebrow: "[ EINSATZFELD 01 ]",
      title: "Unterhalts- & Büroreinigung",
      body:
        "Tägliche, wöchentliche oder bedarfsorientierte Reinigung von Büros, Praxen, Kanzleien und Verwaltungsgebäuden. Wir arbeiten außerhalb Ihrer Geschäftszeiten und stimmen Frequenzen und Räume klar ab.",
      bullets: [
        "Büro-, Praxis- und Kanzleireinigung",
        "Sanitär- und Pausenraumpflege",
        "Treppenhausreinigung",
        "Glas- und Rahmenreinigung innen",
        "Materialnachschub & Verbrauchsmittel",
      ],
      image: "/images/about-care.jpg",
      imageAlt: "Modernes Büro nach professioneller Unterhaltsreinigung",
    },
    {
      eyebrow: "[ EINSATZFELD 02 ]",
      title: "Sonder- & Bauendreinigung",
      body:
        "Nach Sanierung, Umbau oder Mieterwechsel — wenn der Staub nach Wochen nicht weichen will. Wir reinigen Bauresten, Glasflächen, Lüftungsgitter und Bodenbeläge gründlich und übergabefertig.",
      bullets: [
        "Bauend- und Bauzwischenreinigung",
        "Grundreinigung & Bodenpflege",
        "Glas-, Fassaden- und Fensterreinigung",
        "Teppich- und Polsterreinigung",
        "Sonderreinigung nach Vorfall",
      ],
      image: "/images/bento-interior.jpg",
      imageAlt: "Gereinigter, übergabefertiger Innenraum nach Bauendreinigung",
    },
  ],

  processEyebrow: "VOM ANGEBOT ZUR ROUTINE",
  processTitle: ["Vier Schritte.", "Verlässliche Routine."],
  processIntro:
    "Reinigung wird zur Routine — sie soll es auch sein. Unser Onboarding stellt sicher, dass diese Routine vom ersten Einsatz an stimmt.",
  process: [
    {
      id: "01",
      title: "Begehung & Bedarfsanalyse",
      body:
        "Vor-Ort-Termin: Wir prüfen Flächen, Beläge, Frequenzen und besondere Anforderungen — Hygienezonen, sensible Räume, Werkstattbereiche.",
    },
    {
      id: "02",
      title: "Reinigungsplan & Angebot",
      body:
        "Sie erhalten einen schriftlichen Reinigungsplan inkl. Leistungen, Mittel, Frequenz und Festpreis. Nichts wird stillschweigend mit eingerechnet.",
    },
    {
      id: "03",
      title: "Einweisung & Start",
      body:
        "Festes Team, Einweisung in Objekt, Schließsystem und Materiallager. Erstreinigung als Referenzpunkt für die laufende Qualitätskontrolle.",
    },
    {
      id: "04",
      title: "Betrieb & Audits",
      body:
        "Regelmäßige Qualitätsbegehungen, fester Ansprechpartner, kurze Reaktionszeiten bei Anpassungswünschen oder Vorfällen.",
    },
  ],

  faqEyebrow: "FAQ",
  faqTitle: ["Antworten,", "die wirklich helfen."],
  faq: [
    {
      question: "Reinigen Sie auch außerhalb der Bürozeiten?",
      answer:
        "Ja, und in den meisten Objekten ist genau das der Standard — früh morgens, abends oder am Wochenende. Wir richten uns nach Ihrem Betrieb, nicht umgekehrt.",
    },
    {
      question: "Bringen Sie Material und Geräte selbst mit?",
      answer:
        "Im Regelfall ja — inkl. Verbrauchsmaterial wie Reinigungsmittel, Tücher und ggf. Maschinen. Auf Wunsch nutzen wir auch von Ihnen gestellte Mittel.",
    },
    {
      question: "Was kostet eine regelmäßige Reinigung?",
      answer:
        "Der Preis hängt von Fläche, Belag, Frequenz und Anforderungen ab. Nach einer kurzen Begehung erhalten Sie ein schriftliches Festpreisangebot — pro Einsatz oder pauschal monatlich.",
    },
    {
      question: "Was passiert, wenn etwas nicht den Standards entspricht?",
      answer:
        "Sie melden es bei Ihrem festen Ansprechpartner — wir bessern in der Regel am nächsten Werktag nach, ohne zusätzliche Kosten. Wiederholungen werden dokumentiert und im Team aufgearbeitet.",
    },
  ],

  ctaEyebrow: "[ BEREIT FÜR SAUBERE STANDARDS ]",
  ctaTitle: ["Saubere Räume.", "Klarer Auftrag."],
  ctaBody:
    "Vereinbaren Sie eine kostenfreie Begehung. Wir erstellen einen Reinigungsplan und ein Festpreisangebot — passgenau auf Ihre Räume und Frequenz.",
  ctaImage: "/images/service-cleaning.jpg",
  ctaImageAlt: "Helle, frisch gereinigte Büroflächen — Glasflächen poliert",
};

export default function ReinigungPage() {
  return (
    <>
      <ServiceHero meta={META} />
      <ServicePillars meta={META} />
      <ServiceShowcase meta={META} />
      <ServiceProcess meta={META} />
      <ServiceFaq meta={META} />
      <ServiceCta meta={META} />
    </>
  );
}
