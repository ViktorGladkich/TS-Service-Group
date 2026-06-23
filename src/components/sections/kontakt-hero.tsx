"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/lib/site.config";

export function KontaktHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const contactBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state via JS, not inline JSX, so content remains visible
      // if this effect never runs.
      gsap.set(eyebrowRef.current, { y: 24, opacity: 0 });
      gsap.set(".kontakt-title-line", { y: 40, opacity: 0 });
      gsap.set(descRef.current, { y: 24, opacity: 0 });
      gsap.set(".kontakt-card-row", { y: 24, opacity: 0 });
      gsap.set(scrollCueRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      tl.to(
        ".kontakt-title-line",
        { y: 0, opacity: 1, duration: 1.3, stagger: 0.15, ease: "power4.out" },
        "-=0.7"
      );
      tl.to(
        descRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.9"
      );
      tl.to(
        ".kontakt-card-row",
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" },
        "-=1.0"
      );
      tl.to(
        scrollCueRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg"
    >
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-12">
        {/* LEFT — text content */}
        <div className="relative flex flex-col justify-end px-6 pb-20 pt-44 md:px-12 md:pb-24 md:pt-56 lg:col-span-7 lg:pr-12 lg:pt-64">          <div className="space-y-10">
            <span
              ref={eyebrowRef}
              className="block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
            >
              [ Kontakt ]
            </span>

            <h1 className="font-display font-medium leading-[0.92] tracking-tight text-text text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,7.5vw,9rem)]">
              <span className="block overflow-hidden">
                <span className="kontakt-title-line block">
                  Sprechen wir.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="kontakt-title-line block text-text-muted">
                  Über Ihr Projekt.
                </span>
              </span>
            </h1>

            <p
              ref={descRef}
              className="font-sans text-base leading-relaxed text-text-muted md:text-lg max-w-xl"
            >
              Persönlicher Kontakt, schnelle Rückmeldung. Schreiben Sie uns oder
              rufen Sie an — wir antworten in der Regel innerhalb eines Werktags.
            </p>

            <div
              ref={scrollCueRef}
              className="flex items-center gap-4 pt-4"
            >
              <div className="h-px w-12 bg-metallic-light" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
                Anfrage stellen
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — direct-contact display card */}
        <div className="relative flex flex-col justify-end border-t border-border px-6 pb-20 pt-12 md:px-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pr-12 lg:pt-64">
          <div ref={contactBlockRef} className="space-y-14 md:space-y-16">
            {/* PHONE */}
            <div className="kontakt-card-row space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
                  [ Anruf ]
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group block"
              >
                <span className="block font-display text-3xl font-medium leading-[1.05] tracking-tight text-text transition-colors duration-500 group-hover:text-metallic-light sm:text-4xl md:text-[2.75rem]">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Mo–Fr 8:00–18:00 · Sa 9:00–14:00
              </span>
            </div>

            {/* EMAIL */}
            <div className="kontakt-card-row space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
                  [ E-Mail ]
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group block break-all"
              >
                <span className="block font-display text-xl font-medium leading-tight tracking-tight text-text transition-colors duration-500 group-hover:text-metallic-light sm:text-2xl md:text-[1.75rem]">
                  {siteConfig.contact.email}
                </span>
              </a>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Antwort innerhalb eines Werktags
              </span>
            </div>

            {/* EMERGENCY */}
            <div className="kontakt-card-row space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-metallic-light">
                  [ Inhaber ]
                </span>
                <div className="h-px flex-1 bg-metallic-light/30" />
              </div>
              <a
                href={`tel:${siteConfig.contact.emergency.phone}`}
                className="group block"
              >
                <span className="block font-display text-2xl font-medium leading-tight tracking-tight text-text transition-colors duration-500 group-hover:text-metallic-light sm:text-3xl md:text-[2rem]">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Nur Sicherheitsdienst · Rund um die Uhr · Direkt am Inhaber
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
