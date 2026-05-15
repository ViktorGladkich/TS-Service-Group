import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;

  const staticPages = [
    "",
    "/leistungen",
    "/leistungen/sicherheitsdienst",
    "/leistungen/umzugservice",
    "/leistungen/reinigung",
    "/ueber-uns",
    "/haeufige-fragen",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/leistungen") ? 0.8 : 0.6,
  }));
}
