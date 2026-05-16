"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function LeistungenHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide initial state synchronously so the entrance animation has somewhere
      // to come from. Done in JS (not inline JSX) so that if this effect never
      // runs — e.g. JS error, hydration glitch — the content stays visible
      // instead of permanently stuck off-screen / at opacity 0.
      gsap.set(eyebrowRef.current, { y: 24, opacity: 0 });
      gsap.set(".leistungen-title-line", { yPercent: 100 });
      gsap.set(descRef.current, { y: 24, opacity: 0 });
      gsap.set(scrollCueRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(eyebrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      });
      tl.to(
        ".leistungen-title-line",
        { yPercent: 0, duration: 1.3, stagger: 0.16, ease: "power4.out" },
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
              [ Unsere Leistungen ]
            </span>

            <h1 className="font-display font-medium leading-[0.92] tracking-tight text-text text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(5rem,8.5vw,10rem)]">
              <span className="block overflow-hidden">
                <span className="leistungen-title-line block">
                  Drei
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="leistungen-title-line block">
                  Disziplinen.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="leistungen-title-line block text-text-muted">
                  Ein Anspruch.
                </span>
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p
              ref={descRef}
              className="font-sans text-base leading-relaxed text-text-muted md:text-lg"
            >
              Sicherheitsdienst, Umzugservice und Reinigung — drei Geschäftsbereiche
              unter einem Dach. Jede Disziplin mit eigenen Spezialisten, Verfahren
              und Standards. Verbunden durch einen kompromisslosen Qualitätsanspruch.
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
            Scrollen
          </span>
        </div>
      </div>
    </section>
  );
}
