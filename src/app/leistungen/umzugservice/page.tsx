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
  title: "Umzugservice Dresden",
  description:
    "Vollumfänglicher Umzugservice für Privatkunden und Unternehmen in Dresden. Verpacken, transportieren, montieren — alles aus einer Hand. Festpreis statt böser Überraschungen.",
  path: "/leistungen/umzugservice",
  keywords: [
    "Umzugservice Dresden",
    "Umzugsunternehmen Dresden",
    "Firmenumzug Dresden",
    "Privatumzug Dresden",
    "Seniorenumzug",
  ],
});

const META: ServiceMeta = {
  number: "02",
  slug: "umzugservice",
  label: "Umzugservice",
  shortLabel: "Umzug",
  tagline: "Geplant · Gepackt · Geliefert",
  heroEyebrow: "02 — Umzugservice",
  heroTitleLines: ["Privat- oder Firmen-", "umzug. Ohne Reibung."],
  heroIntro:
    "Vom Karton bis zur Endmontage: ein Ansprechpartner, ein Termin, ein Festpreis. Wir planen, verpacken und montieren — Sie schließen am Abend Ihre neue Tür auf.",
  heroImage: "/images/service-moving.jpg",
  heroImageAlt:
    "Umzugsteam beim Tragen verpackter Möbel in einem Treppenhaus in Dresden",
  heroMeta: [
    { label: "Festpreis", value: "Schriftlich" },
    { label: "Material", value: "Inklusive" },
    { label: "Region", value: "DD · Sachsen · DE" },
    { label: "Versicherung", value: "Transport inkl." },
  ],

  pillarsEyebrow: "WAS DEN UNTERSCHIED MACHT",
  pillarsTitle: ["Vier Versprechen.", "Schriftlich."],
  pillarsIntro:
    "Ein Umzug scheitert selten am Möbel — meist am Plan. Deshalb halten wir alles fest, bevor der erste Karton bewegt wird: Termine, Preis, Verantwortlichkeiten.",
  pillars: [
    {
      id: "01",
      title: "Festpreisangebot",
      body:
        "Nach Besichtigung erhalten Sie einen verbindlichen Festpreis — keine Stundenabrechnung, keine Nachverhandlung am Umzugstag.",
    },
    {
      id: "02",
      title: "Vollservice",
      body:
        "Packen, transportieren, montieren, entsorgen, einlagern — alles aus einer Hand. Sie koordinieren keine Subunternehmer.",
    },
    {
      id: "03",
      title: "Material inklusive",
      body:
        "Kartons, Decken, Stretchfolie, Möbelhauben — Material und Werkzeug sind im Preis enthalten. Keine Mietkosten, keine Pfandfallen.",
    },
    {
      id: "04",
      title: "Versichert",
      body:
        "Transportversicherung über die Betriebshaftpflicht. Schäden werden direkt und unbürokratisch reguliert — nicht über Dritte.",
    },
  ],

  showcase: [
    {
      eyebrow: "[ EINSATZFELD 01 ]",
      title: "Privat- & Seniorenumzug",
      body:
        "Wir planen Ihren Umzug so, wie wir ihn für uns selbst planen würden: sauber inventarisiert, sorgfältig gepackt und respektvoll mit Ihren Möbeln. Für Senioren-Umzüge übernehmen wir auf Wunsch auch das Ausräumen der alten Wohnung und das Einräumen am neuen Ort.",
      bullets: [
        "Komplette oder teilweise Verpackung",
        "Möbel- und Küchenmontage",
        "Halteverbotszone & Parkanmeldung",
        "Entrümpelung & Entsorgung",
        "Senioren-Umzug mit Einrichten",
      ],
      image: "/images/bento-interior.jpg",
      imageAlt: "Eingerichteter Wohnraum nach erfolgreichem Umzug",
    },
    {
      eyebrow: "[ EINSATZFELD 02 ]",
      title: "Firmen- & Büroumzug",
      body:
        "Ein Büroumzug ist Logistik im Kleinen — Server, IT, Akten, Möbel müssen zeitlich abgestimmt zwischen zwei Standorten bewegt werden, oft am Wochenende. Wir liefern den Projektplan, das Team und das Material, damit montags wieder gearbeitet wird.",
      bullets: [
        "Standort- und Inventaranalyse",
        "Verpackung von IT, Akten & Mobiliar",
        "Demontage und Wiederaufbau",
        "Wochenend- und Nachteinsätze",
        "Einlagerung & Beiladung möglich",
      ],
      image: "/images/bento-premium.jpg",
      imageAlt: "Büromöbel verpackt und beschriftet zur Übergabe vorbereitet",
    },
  ],

  processEyebrow: "VOM ERSTKONTAKT BIS ZUR ÜBERGABE",
  processTitle: ["Vier Schritte.", "Ein Verantwortlicher."],
  processIntro:
    "Ein Ansprechpartner von der ersten E-Mail bis zur Schlüsselübergabe. Sie wissen jederzeit, wer entscheidet und wer ausführt.",
  process: [
    {
      id: "01",
      title: "Besichtigung & Inventaraufnahme",
      body:
        "Vor Ort oder per Video. Wir erfassen Volumen, Wege, Möbel und Besonderheiten — die Basis für ein belastbares Festpreisangebot.",
    },
    {
      id: "02",
      title: "Festpreisangebot & Termin",
      body:
        "Sie erhalten ein schriftliches Angebot mit Leistungsumfang, Material, Dauer und Festpreis. Termine inkl. Halteverbotszonen werden verbindlich geblockt.",
    },
    {
      id: "03",
      title: "Packen & Transport",
      body:
        "Unser Team verpackt, beschriftet und transportiert sachgerecht. Empfindliche Möbel werden in Decken und Hauben gesichert, Wege geschützt.",
    },
    {
      id: "04",
      title: "Aufbau & Übergabe",
      body:
        "Möbel werden am Zielort aufgestellt, montiert und ausgerichtet. Kartons werden auf Wunsch ausgepackt — am Abend ist Ihre Wohnung nutzbar.",
    },
  ],

  faqEyebrow: "FAQ",
  faqTitle: ["Was Auftraggeber", "vorab fragen."],
  faq: [
    {
      question: "Wie kommt der Preis zustande?",
      answer:
        "Nach einer Besichtigung (vor Ort oder per Videoanruf) erhalten Sie ein schriftliches Festpreisangebot. Volumen, Etagen, Wege und Material sind enthalten — Sie zahlen, was vereinbart wurde.",
    },
    {
      question: "Was ist im Festpreis enthalten?",
      answer:
        "Personal, Transport, Material (Kartons, Decken, Folie), Möbelmontage und -demontage sowie die Transportversicherung. Optionale Leistungen wie Halteverbotszonen, Entsorgung oder Einlagerung werden transparent ausgewiesen.",
    },
    {
      question: "Übernehmen Sie auch Firmenumzüge am Wochenende?",
      answer:
        "Ja. Büroumzüge planen wir bewusst über Wochenenden, damit der Betrieb am Montag weiterläuft. IT- und Server-Komponenten transportieren wir in Abstimmung mit Ihrem IT-Team.",
    },
    {
      question: "Was passiert, wenn etwas beschädigt wird?",
      answer:
        "Transportschäden sind über unsere Betriebshaftpflicht abgedeckt und werden direkt reguliert. Wir dokumentieren Vorzustände vor Beginn jedes Umzugs.",
    },
  ],

  ctaEyebrow: "[ BEREIT ZUM PACKEN ]",
  ctaTitle: ["Termin sichern.", "Festpreis erhalten."],
  ctaBody:
    "Schildern Sie uns kurz Ihren Umzug — wir vereinbaren eine Besichtigung und schicken Ihnen ein schriftliches Festpreisangebot. Ohne Verpflichtung.",
  ctaImage: "/images/service-moving.jpg",
  ctaImageAlt: "Umzugswagen vor einem Stadthaus in Dresden",
};

export default function UmzugservicePage() {
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
