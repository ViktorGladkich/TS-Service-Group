import { UeberUnsHero } from "@/components/sections/ueber-uns-hero";
import { UeberUnsEditorial } from "@/components/sections/ueber-uns-editorial";
import { UeberUnsManifesto } from "@/components/sections/ueber-uns-manifesto";
import { UeberUnsValues } from "@/components/sections/ueber-uns-values";
import { UeberUnsStats } from "@/components/sections/ueber-uns-stats";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Über uns",
  description:
    "Drei Disziplinen, ein Team in Dresden. Verlässlichkeit, Diskretion und Präzision — unser Anspruch seit dem ersten Tag.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <UeberUnsHero />

      {/* Editorial — establishing shot of Dresden */}
      <UeberUnsEditorial
        src="/images/about-cityscape.jpg"
        alt="Dresden Altstadt zur blauen Stunde — Heimat der TS Service Group"
        metaLeft="Dresden, Sachsen"
        metaRight="Standort 2026 —"
        aspect="16/9"
      />

      <UeberUnsManifesto />

      <UeberUnsValues />

      <UeberUnsStats />

    </>
  );
}
