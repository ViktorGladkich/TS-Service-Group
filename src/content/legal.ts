/**
 * Legal page content — Impressum, Datenschutz, AGB.
 *
 * ⚠️ PLACEHOLDER — all legal texts must be reviewed by a qualified
 * legal professional before production deployment. This content is
 * structured to satisfy German legal requirements (§ 5 TMG, DSGVO)
 * but does NOT constitute legal advice.
 */

import { siteConfig } from "@/lib/site.config";

const { contact, brand } = siteConfig;

export const IMPRESSUM = {
  title: "Impressum",
  seoTitle: "Impressum",
  seoDescription: `Impressum der ${brand.name} — Angaben gemäß § 5 TMG.`,
  sections: [
    {
      heading: "Angaben gemäß § 5 TMG",
      content: `${brand.legalName}
${contact.address.street}
${contact.address.postalCode} ${contact.address.city}
${contact.address.countryName}`,
    },
    {
      heading: "Kontakt",
      content: `Telefon: ${contact.phoneDisplay}
E-Mail: ${contact.email}`,
    },
    {
      heading: "Umsatzsteuer-Identifikationsnummer",
      content:
        "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE XXX XXX XXX", // ⚠️ PLACEHOLDER
    },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      content: `[Name des Verantwortlichen]
${contact.address.street}
${contact.address.postalCode} ${contact.address.city}`, // ⚠️ PLACEHOLDER
    },
    {
      heading: "Streitschlichtung",
      content:
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    },
  ],
};

export const DATENSCHUTZ = {
  title: "Datenschutzerklärung",
  seoTitle: "Datenschutzerklärung",
  seoDescription: `Datenschutzerklärung der ${brand.name} — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.`,
  // Content will be rendered as structured sections
  lastUpdated: "2026-05-10",
};

export const AGB = {
  title: "Allgemeine Geschäftsbedingungen",
  seoTitle: "AGB",
  seoDescription: `Allgemeine Geschäftsbedingungen der ${brand.name}.`,
};
