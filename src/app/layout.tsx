import type { Metadata } from "next";
import { clashDisplay, switzer } from "@/lib/fonts";
import { generateOrganizationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";
import { Header, Footer } from "@/components/layout";
import { PageWrapper } from "@/components/ui/page-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.keywords],
  metadataBase: new URL(siteConfig.seo.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.brand.name,
    locale: siteConfig.seo.locale,
    type: "website",
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = generateOrganizationSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${clashDisplay.variable} ${switzer.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        <PageWrapper>
          <Header />
          <main className="relative z-10 bg-bg min-h-svh shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {children}
          </main>
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
