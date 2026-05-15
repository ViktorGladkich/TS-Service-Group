import { KontaktHero } from "@/components/sections/kontakt-hero";
import { KontaktForm } from "@/components/sections/kontakt-form";
import { KontaktMap } from "@/components/sections/kontakt-map";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Kontakt",
  description:
    "Sprechen Sie uns an — TS Service Group Dresden. Sicherheitsdienst, Umzugservice und Reinigung. Anfrage über das Formular oder direkt per Telefon.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <KontaktHero />
      <KontaktForm />
      <KontaktMap />
    </>
  );
}
