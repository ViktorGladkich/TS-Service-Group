import type { Metadata } from "next";
import { siteConfig } from "./site.config";

interface PageSeoOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate per-page metadata using Next.js Metadata API.
 * Uses siteConfig as single source of truth for defaults.
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = "",
  ogImage,
  noIndex = false,
}: PageSeoOptions = {}): Metadata {
  const pageTitle = title
    ? siteConfig.seo.titleTemplate.replace("%s", title)
    : siteConfig.seo.defaultTitle;

  const pageDescription = description ?? siteConfig.seo.defaultDescription;
  const canonicalUrl = `${siteConfig.seo.siteUrl}${path}`;
  const ogImageUrl = ogImage ?? siteConfig.seo.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords ?? [...siteConfig.seo.keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.brand.name,
      locale: siteConfig.seo.locale,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
