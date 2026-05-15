"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

interface Value {
  number: string;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    number: "01",
    title: "Verlässlichkeit",
    description:
      "Was wir versprechen, halten wir. Vom ersten Termin bis zur finalen Ausführung — unsere Zusagen sind verbindlich, schriftlich, nachvollziehbar.",
  },
  {
    number: "02",
    title: "Diskretion",
    description:
      "Vertraulichkeit ist Teil unserer Dienstleistung. Was bei uns bleibt, bleibt bei uns. Geschultes Personal mit Verschwiegenheitspflicht.",
  },
  {
    number: "03",
    title: "Präzision",
    description:
      "Standardisierte Prozesse, geschulte Fachkräfte, klare Dokumentation. Keine Spielräume für Improvisation — nur saubere, messbare Ergebnisse.",
  },
  {
    number: "04",
    title: "Erfahrung",
    description:
      "Jeder Geschäftsbereich von Branchenexperten geführt. Wir wissen, was wir tun — und überlassen nichts dem Zufall.",
  },
];

export function UeberUnsValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        ".values-eyebrow",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".values-title-line",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Each value row — stagger reveal of number, title, description
      const rows = gsap.utils.toArray<HTMLElement>(".values-row");
      rows.forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          row.querySelector(".values-number"),
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" }
        )
          .fromTo(
            row.querySelector(".values-row-title"),
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(
            row.querySelector(".values-row-desc"),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-border bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:mb-24">
          <span
            className="values-eyebrow mb-4 font-mono text-sm uppercase tracking-[0.2em] text-text-muted"
            style={{ opacity: 0 }}
          >
            UNSERE WERTE
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span
                className="values-title-line block"
                style={{ transform: "translateY(100%)" }}
              >
                Was uns antreibt.
              </span>
            </span>
          </h2>
        </div>

        {/* Values rows */}
        <div className="border-t border-border">
          {VALUES.map((value) => (
            <div
              key={value.number}
              className="values-row grid grid-cols-1 gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-12 md:py-16 lg:py-20"
            >
              <div className="overflow-hidden md:col-span-3 lg:col-span-2">
                <span
                  className="values-number block font-display font-medium leading-[0.85] tracking-[-0.05em] select-none"
                  style={{
                    fontSize: "clamp(5rem, 9vw, 8rem)",
                    background: METALLIC_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                  }}
                >
                  {value.number}
                </span>
              </div>

              <div className="flex flex-col justify-center space-y-4 md:col-span-9 lg:col-span-10 lg:pl-12 lg:space-y-6">
                <h3
                  className="values-row-title font-display text-3xl font-medium tracking-tight text-text sm:text-4xl md:text-5xl"
                  style={{ opacity: 0 }}
                >
                  {value.title}.
                </h3>
                <p
                  className="values-row-desc font-sans text-base leading-relaxed text-text-muted md:text-lg max-w-2xl"
                  style={{ opacity: 0 }}
                >
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
