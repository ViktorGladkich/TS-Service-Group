import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strip the `X-Powered-By: Next.js` header in production.
  poweredByHeader: false,
  // Tree-shake heavy barrel imports down to only what each module uses.
  // lucide-react is auto-optimized by default; gsap is added explicitly so
  // pulling in `gsap` + `gsap/ScrollTrigger` doesn't drag the whole package.
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  images: {
    // Serve modern formats — AVIF preferred, WebP fallback. The optimizer
    // re-encodes our local JPG/PNG sources on demand, so large originals are
    // never shipped to the browser at full size.
    formats: ["image/avif", "image/webp"],
    // Optimized variants are immutable for a year (filename carries a hash).
    minimumCacheTTL: 31536000,
  },
  // Long-lived immutable caching for static media the optimizer doesn't touch
  // (videos, poster, fonts) — these filenames are stable so a year is safe.
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
