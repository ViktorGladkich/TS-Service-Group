
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
    legalName: "TS Service Group", // 🔒 Einzelunternehmen, Inhaber: Zaurbek Tsumaev — kein GmbH-Suffix
    owner: "Zaurbek Tsumaev", // 🔒 Inhaber des Einzelunternehmens
    foundedYear: 2026, // 🔒 gegründet 01.04.2026
    foundedDate: "2026-04-01", // 🔒
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
      street: "Hopfgartenstraße 6", // 🔒
      postalCode: "01307", // 🔒
      city: "Dresden", // 🔒
      region: "Sachsen", // 🔒
      country: "DE",
      countryName: "Deutschland",
    },
    phone: "+4915901439302", // 🔒 E.164 (Mobil — Inhaber direkt)
    phoneDisplay: "+49 1590 1439302", // 🔒
    whatsapp: "+4915901439302", // 🔒 gleicher Anschluss
    email: "info@ts-servicegroup.de", // 🔒
    emailContact: "info@ts-servicegroup.de", // 🔒 (gleiche Adresse — Einzelunternehmen, kein separater Postkasten)
    geo: {
      latitude: 51.0545, // 🔒 Hopfgartenstraße 6, Dresden-Johannstadt (approx.)
      longitude: 13.7670,
    },
    openingHours: [
      { days: ["Mo", "Di", "Mi", "Do", "Fr"], opens: "08:00", closes: "18:00" },
      { days: ["Sa"], opens: "09:00", closes: "14:00" },
      // Sonntag geschlossen — außer Sicherheits-Notdienst
    ],
    emergency: {
      available: true,
      phone: "+4915901439302", // 🔒 gleiche Nummer — direkt an Inhaber
      label: "Sicherheits-Notdienst rund um die Uhr (nur Sicherheitsbereich)",
    },
    legal: {
      // Einzelunternehmen — kein HRB, keine USt-ID solange Kleinunternehmer (§19 UStG)
      // §34a GewO Erlaubnis für Sicherheitsgewerbe
      gewerbe: "Sicherheitsunternehmen gemäß §34a GewO",
      liability: "Betriebshaftpflicht über Allianz", // 🔒
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
    siteUrl: "https://ts-servicegroup.de", // 🔒
    ogImage: "/og-image.jpg",
    locale: "de_DE",
  },

  // ============================================================
  // SOCIAL (leave empty if none — handled gracefully in UI)
  // ============================================================
  social: {
    // 🔒 Kunde hat keine Profile angegeben — Icons bleiben in der UI ausgeblendet (siehe Header/Footer-Logik)
    instagram: "",
    linkedin: "",
    facebook: "",
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
        "Objektschutz",
        "Personenschutz",
        "Veranstaltungsschutz",
        "Empfangs- und Pförtnerdienst",
        "Wachdienst und Streifendienst",
        "Baustellenbewachung",
        "Ladendetektiv",
        "Notruf-Service und Citystreife",
      ],
      keywords: [
        "Sicherheitsdienst",
        "Objektschutz",
        "Personenschutz",
        "Veranstaltungsschutz",
        "Baustellenbewachung",
      ],
    },
    {
      slug: "umzugservice",
      number: "02",
      title: "Umzugservice",
      shortTitle: "Umzug",
      tagline: "Privat- und Firmenumzüge ohne Reibung.",
      description:
        "Vollumfänglicher Umzugservice für Privatkunden und Unternehmen — Privat-, Firmen- und Seniorenumzüge in Dresden, sachsenweit und auf Anfrage bundesweit.",
      features: [
        "Privatumzug",
        "Firmen- und Büroumzug",
        "Senioren-Umzug",
        "Verpackungsservice",
        "Möbelmontage und -demontage",
        "Entsorgung und Entrümpelung",
        "Einlagerung",
        "Beiladung",
      ],
      keywords: [
        "Umzugservice",
        "Umzugsunternehmen Dresden",
        "Firmenumzug",
        "Privatumzug",
        "Seniorenumzug",
      ],
    },
    {
      slug: "reinigung",
      number: "03",
      title: "Reinigung",
      shortTitle: "Reinigung",
      tagline: "Saubere Räume, klare Standards.",
      description:
        "Gewerbliche und private Reinigung in Dresden — von der Unterhalts- und Büroreinigung bis zur Industrie- und Sonderreinigung. Geschultes Personal, geprüfte Verfahren.",
      features: [
        "Büroreinigung",
        "Industriereinigung",
        "Privathaushalt-Reinigung",
        "Glasreinigung",
        "Teppichreinigung",
        "Treppenhausreinigung",
        "Sonderreinigung",
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
  // Gegründet 04/2026 — KEINE inflated numbers ("Jahre Erfahrung",
  // Kundenanzahl, 24/7-Allverfügbarkeit). Qualitative Anker statt
  // erfundener Zahlen. 24/7 gilt ausschließlich für den
  // Sicherheits-Notdienst — wird dort separat ausgespielt.
  // ============================================================
  stats: [
    { value: "3", label: "Geschäftsbereiche", suffix: "" },
    { value: "DD", label: "Standort Dresden", suffix: "" }, // 🔒 DD = Dresden Kfz-Kennzeichen
    { value: "Mo–Sa", label: "Erreichbar", suffix: "" }, // 🔒 echte Bürozeiten
    { value: "§34a", label: "GewO-Erlaubnis", suffix: "" }, // 🔒 Wachschein-Nachweis
  ],

  // ============================================================
  // REFERENZEN
  // 🔒 Bewusst LEER bis erste echte Projekte vorliegen.
  // Gegründet 04/2026 — fingierte Case-Studies wären irreführend
  // und rechtlich riskant (UWG §5). Erst befüllen, wenn der Kunde
  // konkrete Projekte (mit Erlaubnis zur Nennung) freigibt.
  // ============================================================
  references: [],

  // ============================================================
  // PARTNER LOGOS
  // 🔒 Leer — keine fingierten Partnerschaften ausspielen.
  // Wenn echte Kooperationen entstehen, hier nachtragen.
  // ============================================================
  partners: [] as Array<{ name: string; logo: string }>,

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
