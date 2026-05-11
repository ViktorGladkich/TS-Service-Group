import type { FAQItem } from "@/lib/types";

/**
 * FAQ content — used across service pages and /kontakt.
 * Structured for JSON-LD FAQPage schema.
 */
export const FAQ_GENERAL: FAQItem[] = [
  {
    question: "In welchen Regionen ist die TS Service Group tätig?",
    answer:
      "Unser Hauptstandort ist Dresden. Wir bedienen Kunden in ganz Sachsen und bei Bedarf auch bundesweit — insbesondere bei Firmenumzügen und größeren Sicherheitsprojekten.",
  },
  {
    question: "Wie schnell können Sie einen Auftrag übernehmen?",
    answer:
      "In der Regel sind wir innerhalb weniger Werktage einsatzbereit. Für Sicherheitsdienste bieten wir einen 24/7-Notdienst an, der kurzfristig verfügbar ist.",
  },
  {
    question: "Sind Ihre Mitarbeiter versichert und geschult?",
    answer:
      "Alle unsere Mitarbeiter sind vollständig versichert und werden regelmäßig geschult — sowohl fachlich als auch im Bereich Arbeitssicherheit und Datenschutz.",
  },
  {
    question: "Kann ich ein unverbindliches Angebot anfordern?",
    answer:
      "Selbstverständlich. Nutzen Sie unser Kontaktformular oder rufen Sie uns direkt an. Wir erstellen Ihnen ein individuelles Angebot — kostenlos und unverbindlich.",
  },
  {
    question: "Bieten Sie auch Einzelleistungen an oder nur Pakete?",
    answer:
      "Wir bieten sowohl Einzelleistungen als auch maßgeschneiderte Pakete an. Jeder Auftrag wird individuell auf Ihre Anforderungen abgestimmt.",
  },
];

export const FAQ_SICHERHEIT: FAQItem[] = [
  {
    question: "Welche Qualifikationen haben Ihre Sicherheitskräfte?",
    answer:
      "Unsere Sicherheitsmitarbeiter verfügen über die Sachkundeprüfung nach § 34a GewO. Darüber hinaus werden sie regelmäßig in Deeskalation, Erste Hilfe und Brandschutz geschult.",
  },
  {
    question: "Bieten Sie auch kurzfristigen Veranstaltungsschutz an?",
    answer:
      "Ja, wir sind darauf eingerichtet, auch kurzfristige Anfragen für Veranstaltungsschutz in Dresden und Umgebung zu bedienen. Kontaktieren Sie uns frühzeitig für eine optimale Planung.",
  },
];

export const FAQ_UMZUG: FAQItem[] = [
  {
    question: "Sind meine Möbel während des Transports versichert?",
    answer:
      "Ja, alle Transporte sind über unsere Betriebshaftpflicht versichert. Auf Wunsch bieten wir eine erweiterte Transportversicherung für besonders wertvolle Gegenstände an.",
  },
  {
    question: "Bieten Sie auch Einlagerungsmöglichkeiten an?",
    answer:
      "Wir verfügen über gesicherte Lagerräume in Dresden für Zwischen- und Langzeitlagerung. Die Räume sind trocken, alarmgesichert und jederzeit zugänglich nach Absprache.",
  },
];

export const FAQ_REINIGUNG: FAQItem[] = [
  {
    question: "Welche Reinigungsmittel verwenden Sie?",
    answer:
      "Wir setzen ausschließlich geprüfte und umweltverträgliche Reinigungsmittel ein. Bei speziellen Anforderungen — etwa im medizinischen Bereich — passen wir unsere Verfahren entsprechend an.",
  },
  {
    question: "Wie oft findet die Unterhaltsreinigung statt?",
    answer:
      "Die Häufigkeit richten wir nach Ihrem Bedarf — von täglicher Reinigung bis zu wöchentlichen oder monatlichen Intervallen. Alles wird vertraglich klar geregelt.",
  },
];
