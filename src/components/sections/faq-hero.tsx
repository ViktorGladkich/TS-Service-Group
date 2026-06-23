"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FaqHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide initial state in JS so content stays visible if this effect
      // never runs (no longer relying on inline JSX styles).
      gsap.set(eyebrowRef.current, { y: 24, opacity: 0 });
      gsap.set(".faq-title-line", { y: 40, opacity: 0 });
      gsap.set(descRef.current, { y: 24, opacity: 0 });
      gsap.set(scrollCueRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      tl.to(
        ".faq-title-line",
        { y: 0, opacity: 1, duration: 1.3, stagger: 0.15, ease: "power4.out" },
        "-=0.7"
      );
      tl.to(
        descRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.9"
      );

      tl.to(
        scrollCueRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-bg pb-20 pt-44 md:pb-24 md:pt-56 lg:pt-64"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-10 lg:col-span-8">
            <span
              ref={eyebrowRef}
              className="block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
            >
              [ Häufige Fragen ]
            </span>

            <h1 className="font-display font-medium leading-[0.92] tracking-tight text-text text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,8vw,9.5rem)]">
              <span className="block overflow-hidden">
                <span className="faq-title-line block">
                  Häufige Fragen.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="faq-title-line block text-text-muted">
                  Klare Antworten.
                </span>
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p
              ref={descRef}
              className="font-sans text-base leading-relaxed text-text-muted md:text-lg"
            >
              Was Auftraggeber oft fragen — kompakt beantwortet. Von Versicherung
              und Qualifikation bis zu Verfügbarkeit und Vertragsbedingungen.
              Nicht das Passende dabei? Schreiben Sie uns.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollCueRef}
          className="mt-20 flex items-center gap-4 md:mt-28"
        >
          <div className="h-px w-12 bg-metallic-light" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
            Themen ansehen
          </span>
        </div>
      </div>
    </section>
  );
}
