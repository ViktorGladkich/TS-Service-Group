"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export function KontaktMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { latitude, longitude } = siteConfig.contact.geo;

  // Bounding box around the marker (~0.012 deg ≈ 1km on each side)
  const bbox = [
    longitude - 0.012,
    latitude - 0.008,
    longitude + 0.012,
    latitude + 0.008,
  ]
    .map((v) => v.toFixed(4))
    .join(",");

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const externalUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (wrapperRef.current) {
        gsap.fromTo(
          wrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-border bg-bg py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Header row */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-12">
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.25em] text-text-subtle">
              [ Standort ]
            </span>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-text md:text-3xl">
              {siteConfig.contact.address.city},{" "}
              {siteConfig.contact.address.region}
            </h2>
          </div>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-text-muted transition-colors hover:text-text"
          >
            <span>In OpenStreetMap öffnen</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </div>

        {/* Map frame */}
        <div
          ref={wrapperRef}
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <div className="relative h-[380px] w-full bg-elevated md:h-auto md:aspect-[16/9]">
            {!loaded ? (
              <MapPlaceholder onLoad={() => setLoaded(true)} />
            ) : (
              <iframe
                title="OpenStreetMap — TS Service Group Dresden"
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Placeholder (click-to-load — DSGVO-compliant)

function MapPlaceholder({ onLoad }: { onLoad: () => void }) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className="group absolute inset-0 flex flex-col items-center justify-center gap-6 bg-elevated transition-colors hover:bg-elevated/80"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-metallic-light/30 bg-bg/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
        <MapPin className="h-6 w-6 text-metallic-light" />
      </span>

      <div className="relative z-10 max-w-md space-y-3 text-center">
        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-metallic-light">
          [ Karte laden ]
        </span>
        <p className="px-6 text-sm leading-relaxed text-text-muted">
          Aus Datenschutzgründen laden wir OpenStreetMap erst nach Ihrer
          Zustimmung. Mit dem Klick wird eine Verbindung zu openstreetmap.org
          aufgebaut.
        </p>
      </div>

      <span className="relative z-10 mx-4 inline-flex items-center justify-center gap-3 rounded-full border border-border-hover bg-bg/40 px-4 py-3 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-text backdrop-blur-sm transition-colors group-hover:bg-bg/70">
        OpenStreetMap aktivieren
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </button>
  );
}
