
/**
 * site.config.ts
 *
 * Single source of truth for site-wide content, branding, and metadata.
 * Import everywhere instead of hardcoding values in components.
 *
 * 🔒 LOCKED  — confirmed by client, do not change without consent
 * ⚠️ PLACEHOLDER — must be replaced before production launch
 *
 * Last updated: 2026-05-10
 */

export const siteConfig = {
  // ============================================================
  // BRAND  🔒
  // ============================================================
  brand: {
    name: "TS Service Group",
    legalName: "TS Service Group GmbH", // ⚠️ confirm legal form (GmbH / UG / e.K. / Einzelunternehmen)
    foundedYear: 2026, // 🔒
    tagline: "Sicherheit. Sauberkeit. Bewegung.",
    shortDescription:
      "Ihr verlässlicher Partner für Sicherheitsdienst, Umzugservice und Reinigung in Dresden.",
  },

  // ============================================================
  // NAP — Name, Address, Phone
  // ⚠️ ALL FIELDS BELOW ARE PLACEHOLDERS — must stay byte-identical
  //    everywhere on the site once replaced (footer, /kontakt, JSON-LD).
  // ============================================================
  contact: {
    address: {
      street: "Königsbrücker Straße 96", // ⚠️ PLACEHOLDER
      postalCode: "01099", // ⚠️ PLACEHOLDER
      city: "Dresden", // 🔒
      region: "Sachsen", // 🔒
      country: "DE",
      countryName: "Deutschland",
    },
    phone: "+49 351 0000000", // ⚠️ PLACEHOLDER (E.164 format, used in tel: links)
    phoneDisplay: "+49 (0) 351 000 00 00", // ⚠️ PLACEHOLDER (formatted for display)
    email: "info@ts-service-group.de", // ⚠️ PLACEHOLDER
    emailContact: "kontakt@ts-service-group.de", // ⚠️ PLACEHOLDER
    geo: {
      latitude: 51.0707, // ⚠️ PLACEHOLDER (Dresden Neustadt approx)
      longitude: 13.7407,
    },
    openingHours: [
      { days: ["Mo", "Di", "Mi", "Do", "Fr"], opens: "08:00", closes: "18:00" },
      { days: ["Sa"], opens: "09:00", closes: "14:00" },
      // Sonntag geschlossen
    ],
    emergency: {
      available: true,
      phone: "+49 351 0000001", // ⚠️ PLACEHOLDER
      label: "24/7 Notruf für Sicherheitsdienst",
    },
  },

  // ============================================================
  // SEO DEFAULTS  🔒
  // ============================================================
  seo: {
    titleTemplate: "%s | TS Service Group Dresden",
    defaultTitle:
      "TS Service Group Dresden | Sicherheitsdienst, Umzug & Reinigung",
    defaultDescription:
      "Professioneller Sicherheitsdienst, Umzugservice und Reinigung in Dresden und Sachsen. Verlässlich, diskret, präzise. Jetzt unverbindlich anfragen.",
    keywords: [
      "Sicherheitsdienst Dresden",
      "Objektschutz Dresden",
      "Veranstaltungsschutz Sachsen",
      "Umzugsunternehmen Dresden",
      "Umzugservice Dresden",
      "Firmenumzug Dresden",
      "Gebäudereinigung Dresden",
      "Unterhaltsreinigung Dresden",
      "Bauendreinigung Dresden",
    ],
    siteUrl: "https://ts-service-group.de", // ⚠️ PLACEHOLDER — confirm final domain
    ogImage: "/og-image.jpg",
    locale: "de_DE",
  },

  // ============================================================
  // SOCIAL (leave empty if none — handled gracefully in UI)
  // ============================================================
  social: {
    instagram: "", // ⚠️ PLACEHOLDER
    linkedin: "", // ⚠️ PLACEHOLDER
    facebook: "", // ⚠️ PLACEHOLDER
  },

  // ============================================================
  // SERVICES  🔒
  // ============================================================
  services: [
    {
      slug: "sicherheitsdienst",
      number: "01",
      title: "Sicherheitsdienst",
      shortTitle: "Sicherheit",
      tagline: "Diskreter Schutz für Objekte und Veranstaltungen.",
      description:
        "Professioneller Objektschutz, Veranstaltungsschutz, Pförtner- und Empfangsdienste in Dresden und Sachsen. Geschultes Personal, klare Prozesse, lückenlose Dokumentation.",
      features: [
        "Objektschutz und Werkschutz",
        "Veranstaltungsschutz",
        "Empfangs- und Pförtnerdienst",
        "Streifendienst und Revierfahrten",
        "Brandwache nach DGUV",
        "Notfall- und Alarmdienst rund um die Uhr",
      ],
      keywords: [
        "Sicherheitsdienst",
        "Objektschutz",
        "Veranstaltungsschutz",
        "Werkschutz",
      ],
    },
    {
      slug: "umzugservice",
      number: "02",
      title: "Umzugservice",
      shortTitle: "Umzug",
      tagline: "Privat- und Firmenumzüge ohne Reibung.",
      description:
        "Vollumfänglicher Umzugservice für Privatkunden und Unternehmen in Dresden, sachsenweit und bundesweit. Verpacken, transportieren, montieren — alles aus einer Hand.",
      features: [
        "Privatumzug und Seniorenumzug",
        "Firmen- und Büroumzug",
        "Möbelmontage und -demontage",
        "Verpackungsservice",
        "Einlagerung in gesicherten Lagerräumen",
        "Entrümpelung und Entsorgung",
      ],
      keywords: [
        "Umzugservice",
        "Umzugsunternehmen Dresden",
        "Firmenumzug",
        "Privatumzug",
      ],
    },
    {
      slug: "reinigung",
      number: "03",
      title: "Reinigung",
      shortTitle: "Reinigung",
      tagline: "Saubere Räume, klare Standards.",
      description:
        "Gewerbliche und private Reinigung in Dresden — von der täglichen Unterhaltsreinigung bis zur abschließenden Bauendreinigung. Geschultes Personal, geprüfte Verfahren.",
      features: [
        "Unterhaltsreinigung für Büro und Gewerbe",
        "Grundreinigung",
        "Bauendreinigung und Bauzwischenreinigung",
        "Fenster- und Glasreinigung",
        "Teppich- und Polsterreinigung",
        "Treppenhaus- und Hausreinigung",
      ],
      keywords: [
        "Gebäudereinigung Dresden",
        "Unterhaltsreinigung",
        "Bauendreinigung",
        "Fensterreinigung",
      ],
    },
  ],

  // ============================================================
  // STATS (Startseite stats band)
  // Founded in 2026 — avoid claims like "20 Jahre Erfahrung".
  // Use qualitative anchors instead of inflated numbers.
  // ============================================================
  stats: [
    { value: "3", label: "Geschäftsbereiche", suffix: "" },
    { value: "24", label: "Erreichbarkeit", suffix: "/7" },
    { value: "100", label: "Verlässlichkeit", suffix: "%" },
    { value: "DD", label: "Standort Dresden", suffix: "" }, // 🔒 stylish: DD = Dresden Kfz-Kennzeichen
  ],

  // ============================================================
  // REFERENZEN — placeholder case studies
  // Anonymized & plausible. Replace with real cases as portfolio grows.
  // Years left at 2026 since the company was just founded.
  // ============================================================
  references: [
    {
      slug: "kulturfestival-neustadt",
      service: "sicherheitsdienst",
      title: "Veranstaltungsschutz für ein Kulturfestival",
      client: "Kulturveranstalter, Dresden-Neustadt",
      year: "2026",
      summary:
        "Einlasskontrolle, Crowd-Management und Nachtdienst über drei Festivaltage.",
      details:
        "Geschulte Sicherheitskräfte, abgestimmtes Schichtsystem, enge Zusammenarbeit mit Veranstalter und Behörden. Reibungsloser Ablauf ohne Zwischenfälle.",
      image: "/placeholder/ref-01.jpg",
    },
    {
      slug: "firmenumzug-it-dienstleister",
      service: "umzugservice",
      title: "Firmenumzug eines IT-Dienstleisters",
      client: "Mittelständischer IT-Dienstleister, Dresden-Altstadt",
      year: "2026",
      summary:
        "Umzug von 80 Arbeitsplätzen über ein Wochenende — ohne Betriebsunterbrechung.",
      details:
        "Vorab-Inventur, beschriftete Transportbehälter, koordinierte Demontage und Wiederaufbau. Am Montagmorgen voll funktionsfähig.",
      image: "/placeholder/ref-02.jpg",
    },
    {
      slug: "bauendreinigung-buerokomplex",
      service: "reinigung",
      title: "Bauendreinigung eines Bürokomplexes",
      client: "Bauträger, Dresden-Pieschen",
      year: "2026",
      summary:
        "Komplette Bauendreinigung von 2.400 m² Bürofläche vor Übergabe.",
      details:
        "Mehrstufiges Reinigungsverfahren, abgestimmt auf Bodenbeläge und Oberflächen. Übergabe termingerecht und mängelfrei.",
      image: "/placeholder/ref-03.jpg",
    },
    {
      slug: "werkschutz-industrie",
      service: "sicherheitsdienst",
      title: "Werkschutz für ein Industrieunternehmen",
      client: "Produzierendes Gewerbe, Dresden-Klotzsche",
      year: "2026",
      summary:
        "Permanenter Werkschutz inklusive Pförtnerdienst und Streifengang.",
      details:
        "Definierte Kontrollgänge, dokumentierte Übergaben, abgestimmte Schnittstellen zur Werksleitung. Spürbare Reduktion von Vorfällen.",
      image: "/placeholder/ref-04.jpg",
    },
    {
      slug: "unterhaltsreinigung-praxis",
      service: "reinigung",
      title: "Unterhaltsreinigung einer Gemeinschaftspraxis",
      client: "Medizinische Gemeinschaftspraxis, Dresden-Striesen",
      year: "2026",
      summary:
        "Tägliche Reinigung nach Hygieneplan außerhalb der Praxiszeiten.",
      details:
        "Abgestimmt auf medizinische Hygieneanforderungen, geprüfte Reinigungsmittel, geschultes Personal mit Verschwiegenheitspflicht.",
      image: "/placeholder/ref-05.jpg",
    },
  ],

  // ============================================================
  // PARTNER LOGOS — placeholders
  // Generate generic geometric wordmarks (e.g. abstract monograms).
  // Do NOT fabricate real company names or imply real partnerships.
  // Use neutral labels like "Partner A" and swap later.
  // ============================================================
  partners: [
    { name: "Partner A", logo: "/placeholder/partner-01.svg" }, // ⚠️ PLACEHOLDER
    { name: "Partner B", logo: "/placeholder/partner-02.svg" }, // ⚠️ PLACEHOLDER
    { name: "Partner C", logo: "/placeholder/partner-03.svg" }, // ⚠️ PLACEHOLDER
    { name: "Partner D", logo: "/placeholder/partner-04.svg" }, // ⚠️ PLACEHOLDER
    { name: "Partner E", logo: "/placeholder/partner-05.svg" }, // ⚠️ PLACEHOLDER
    { name: "Partner F", logo: "/placeholder/partner-06.svg" }, // ⚠️ PLACEHOLDER
  ],

  // ============================================================
  // FONTS  🔒  (Clash Display + Switzer, locally hosted from Fontshare)
  // Download .woff2 (and .woff fallback) from fontshare.com and place
  // under /public/fonts/. Declare with next/font/local.
  // ============================================================
  fonts: {
    display: {
      family: "Clash Display",
      weights: [400, 500, 600, 700],
      files: [
        "/fonts/ClashDisplay-Regular.woff2",
        "/fonts/ClashDisplay-Medium.woff2",
        "/fonts/ClashDisplay-Semibold.woff2",
        "/fonts/ClashDisplay-Bold.woff2",
      ],
    },
    sans: {
      family: "Switzer",
      weights: [300, 400, 500, 600, 700],
      files: [
        "/fonts/Switzer-Light.woff2",
        "/fonts/Switzer-Regular.woff2",
        "/fonts/Switzer-Medium.woff2",
        "/fonts/Switzer-Semibold.woff2",
        "/fonts/Switzer-Bold.woff2",
      ],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Service = (typeof siteConfig.services)[number];
export type Reference = (typeof siteConfig.references)[number];
export type Partner = (typeof siteConfig.partners)[number];
