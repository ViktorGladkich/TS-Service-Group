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
  title: "Sicherheitsdienst Dresden",
  description:
    "Professioneller Objektschutz, Veranstaltungsschutz und Werkschutz in Dresden und Sachsen. §34a-geschultes Personal, klare Prozesse, lückenlose Dokumentation.",
  path: "/leistungen/sicherheitsdienst",
  keywords: [
    "Sicherheitsdienst Dresden",
    "Objektschutz Dresden",
    "Veranstaltungsschutz Sachsen",
    "Werkschutz",
    "Baustellenbewachung Dresden",
  ],
});

const META: ServiceMeta = {
  number: "01",
  slug: "sicherheitsdienst",
  label: "Sicherheitsdienst",
  shortLabel: "Sicherheit",
  tagline: "Diskret · Präzise · 24/7",
  heroEyebrow: "01 — Sicherheitsdienst",
  heroTitleLines: ["Diskreter Schutz.", "Klare Präsenz."],
  heroIntro:
    "Objekt- und Veranstaltungsschutz in Dresden und Sachsen. Wir kombinieren geschultes Personal, dokumentierte Abläufe und einen Notdienst rund um die Uhr — direkt am Mobil des Inhabers.",
  heroImage: "/images/service-security.jpg",
  heroImageAlt:
    "Sicherheitsmitarbeiter im Anzug bei Objektkontrolle in Dresden",
  heroMeta: [
    { label: "Erlaubnis", value: "§34a GewO" },
    { label: "Notdienst", value: "24/7" },
    { label: "Region", value: "Dresden · Sachsen" },
    { label: "Versicherung", value: "Betriebshaftpflicht" },
  ],

  pillarsEyebrow: "WAS UNS UNTERSCHEIDET",
  pillarsTitle: ["Vier Säulen.", "Ein Standard."],
  pillarsIntro:
    "Sicherheit ist kein Image. Sie ist die Summe nüchterner Entscheidungen: wer eingesetzt wird, wie dokumentiert wird, was im Ernstfall passiert. Hier ist, woran wir uns messen lassen.",
  pillars: [
    {
      id: "01",
      title: "§34a-Sachkunde",
      body:
        "Jede eingesetzte Kraft verfügt über den geforderten Sachkundenachweis nach §34a GewO — keine Hilfskräfte, keine Aushilfen.",
    },
    {
      id: "02",
      title: "Notdienst 24/7",
      body:
        "Der Notruf landet nicht bei einem Callcenter, sondern direkt am Mobil des Inhabers. Rund um die Uhr, an 365 Tagen im Jahr.",
    },
    {
      id: "03",
      title: "Lückenlose Doku",
      body:
        "Streifen, Vorkommnisse, Übergaben — alles digital protokolliert. Sie sehen jederzeit, was wann und durch wen passiert ist.",
    },
    {
      id: "04",
      title: "Diskrete Präsenz",
      body:
        "Sicherheit, die wirkt, ohne aufzufallen. Auftreten, Sprache und Equipment werden auf Ihr Umfeld abgestimmt.",
    },
  ],

  showcase: [
    {
      eyebrow: "[ EINSATZFELD 01 ]",
      title: "Objekt- & Werkschutz",
      body:
        "Permanente oder turnusmäßige Bewachung von Gewerbeobjekten, Produktionsstätten und Verwaltungsgebäuden. Wir richten Schichtmodelle, Streifenrouten und Zutrittskontrollen passgenau auf Ihre Liegenschaft ein.",
      bullets: [
        "Pförtner- und Empfangsdienste",
        "Streifen- und Revierdienst",
        "Zutritts- und Schlüsselkontrolle",
        "Alarmverfolgung & Interventionsdienst",
        "Baustellenbewachung",
      ],
      image: "/images/bento-security.jpg",
      imageAlt: "Pförtnerbereich eines Bürogebäudes mit Sicherheitsmitarbeiter",
    },
    {
      eyebrow: "[ EINSATZFELD 02 ]",
      title: "Veranstaltungsschutz",
      body:
        "Vom Firmenevent bis zur Privatfeier — wir planen Sicherheitskonzepte, koordinieren Einlass und Crowd-Flow und stellen einsatzbereite Teams.",
      bullets: [
        "Einlasskontrolle & Akkreditierung",
        "Crowd-Management",
        "Bühnen- und Backstage-Schutz",
        "Ladendetektivdienst",
      ],
      image: "/images/hero-01.jpg",
      imageAlt: "Sicherheitskonzept für Veranstaltung — Einlassbereich",
    },
  ],

  processEyebrow: "VOM ERSTKONTAKT ZUM EINSATZ",
  processTitle: ["Vier Schritte.", "Klare Übergaben."],
  processIntro:
    "Ein Sicherheitsauftrag ist nur so gut wie seine Vorbereitung. Deshalb investieren wir zuerst Zeit in das Objekt — bevor die erste Schicht beginnt.",
  process: [
    {
      id: "01",
      title: "Erstgespräch & Risikoanalyse",
      body:
        "Kostenfreies Gespräch — telefonisch oder vor Ort. Wir erfassen den Schutzbedarf, identifizieren Schwachstellen und klären rechtliche Rahmen.",
    },
    {
      id: "02",
      title: "Sicherheitskonzept & Angebot",
      body:
        "Schriftliches, durchgerechnetes Konzept inkl. Personalstärke, Schichtmodell, Equipment und Festpreis. Keine Kostenfallen, keine versteckten Posten.",
    },
    {
      id: "03",
      title: "Onboarding & Einsatzstart",
      body:
        "Geschultes Personal wird auf Ihr Objekt eingewiesen, Abläufe und Notfallketten werden dokumentiert, Schlüssel und Codes geordnet übergeben.",
    },
    {
      id: "04",
      title: "Betrieb & Nachsteuerung",
      body:
        "Wöchentliche oder monatliche Berichte, fester Ansprechpartner, kurze Wege bei Anpassungsbedarf — auch außerhalb der Bürozeit.",
    },
  ],

  faqEyebrow: "FAQ",
  faqTitle: ["Fragen,", "die zuerst kommen."],
  faq: [
    {
      question: "Übernehmen Sie auch kurzfristige Einsätze?",
      answer:
        "Ja. Für Veranstaltungen und Baustellen können wir innerhalb von 24–48 Stunden besetzen. Für dauerhafte Objektschutzaufträge planen wir den Start sauber ein — meist 7–14 Tage Vorlauf.",
    },
    {
      question: "Welche Qualifikationen hat Ihr Personal?",
      answer:
        "Jede Kraft hat mindestens die Sachkundeprüfung nach §34a GewO. Für exponierte Objekte setzen wir Mitarbeitende mit zusätzlicher Erfahrung und Schulung ein.",
    },
    {
      question: "Was kostet ein Sicherheitsdienst?",
      answer:
        "Pauschalpreise gibt es nicht — der Aufwand hängt von Objekt, Schichtmodell und Risiko ab. Nach einer kurzen Vor-Ort-Analyse erhalten Sie ein schriftliches Festpreisangebot.",
    },
    {
      question: "Sind Sie auch im Notfall erreichbar?",
      answer:
        "Ja. Der Notdienst für Bestandskunden ist 24/7 besetzt — direkt am Mobil des Inhabers, nicht über ein Callcenter.",
    },
  ],

  ctaEyebrow: "[ BEREIT FÜR DEN EINSATZ ]",
  ctaTitle: ["Sicherheit beginnt", "mit einem Gespräch."],
  ctaBody:
    "Schildern Sie uns Ihr Objekt oder Ihren Anlass. Wir melden uns innerhalb eines Werktags mit konkreten Vorschlägen — oder rund um die Uhr im Notfall.",
  ctaImage: "/images/service-security.jpg",
  ctaImageAlt: "Sicherheitskonzept — moderne Liegenschaft in Dresden bei Nacht",
};

export default function SicherheitsdienstPage() {
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
