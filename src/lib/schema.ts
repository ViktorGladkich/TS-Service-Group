import type {
  Organization,
  LocalBusiness,
  Service,
  BreadcrumbList,
  FAQPage,
  WithContext,
} from "schema-dts";
import { siteConfig } from "./site.config";

const { contact, brand, seo, social } = siteConfig;

/**
 * JSON-LD: Organization + LocalBusiness
 * Injected in root layout.
 */
export function generateOrganizationSchema(): WithContext<LocalBusiness> {
  const sameAs: string[] = [];
  if (social.instagram) sameAs.push(social.instagram);
  if (social.linkedin) sameAs.push(social.linkedin);
  if (social.facebook) sameAs.push(social.facebook);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    legalName: brand.legalName,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: String(brand.foundedYear),
    priceRange: "$$",
    image: `${seo.siteUrl}${seo.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dresden",
      },
      {
        "@type": "State",
        name: "Sachsen",
      },
    ],
    openingHoursSpecification: contact.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days as any,
      opens: hours.opens,
      closes: hours.closes,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * JSON-LD: Service (for /leistungen/* pages)
 */
export function generateServiceSchema(
  service: (typeof siteConfig.services)[number]
): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
      url: seo.siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: "Dresden",
    },
    url: `${seo.siteUrl}/leistungen/${service.slug}`,
  };
}

/**
 * JSON-LD: BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${seo.siteUrl}${item.path}`,
    })),
  };
}

/**
 * JSON-LD: FAQPage
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
