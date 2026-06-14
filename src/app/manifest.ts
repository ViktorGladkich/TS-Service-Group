import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

/**
 * Web App Manifest — served at /manifest.webmanifest.
 * Enables "Add to Home Screen" and gives the PWA its name, theme,
 * and icons. Icons reuse the app-router /icon convention.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.defaultTitle,
    short_name: siteConfig.brand.name,
    description: siteConfig.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "de",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
