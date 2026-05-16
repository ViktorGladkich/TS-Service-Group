"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function UeberUnsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const imageMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state in JS, not inline JSX, so content stays visible
      // if this effect never runs.
      gsap.set(eyebrowRef.current, { y: 24, opacity: 0 });
      gsap.set(".ueber-title-line", { yPercent: 100 });
      gsap.set(descRef.current, { y: 24, opacity: 0 });
      gsap.set(imageWrapperRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imageMetaRef.current, { y: 16, opacity: 0 });
      gsap.set(scrollCueRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      tl.to(
        ".ueber-title-line",
        { yPercent: 0, duration: 1.3, stagger: 0.15, ease: "power4.out" },
        "-=0.7"
      );
      tl.to(
        descRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.9"
      );

      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" },
        "-=1.5"
      );
      tl.to(
        imageMetaRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.5"
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
      className="relative overflow-hidden bg-bg"
    >
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-12">
        {/* LEFT — text content */}
        <div className="relative flex flex-col justify-end px-6 pb-20 pt-44 md:px-12 md:pb-24 md:pt-56 lg:col-span-7 lg:pr-12 lg:pt-64">
          <div className="space-y-10">
            <span
              ref={eyebrowRef}
              className="block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
            >
              [ Über uns ]
            </span>

            <h1 className="font-display font-medium leading-[0.92] tracking-tight text-text text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,7.5vw,9rem)]">
              <span className="block overflow-hidden">
                <span className="ueber-title-line block">
                  Verlässlich.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="ueber-title-line block">
                  Diskret.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="ueber-title-line block text-text-muted">
                  Präzise.
                </span>
              </span>
            </h1>

            <p
              ref={descRef}
              className="font-sans text-base leading-relaxed text-text-muted md:text-lg max-w-xl"
            >
              Wir sind ein Team in Dresden, das drei Disziplinen unter einem Dach
              vereint. Sicherheit, Sauberkeit und Bewegung — drei eigenständige
              Bereiche, verbunden durch einen kompromisslosen Anspruch.
            </p>

            <div
              ref={scrollCueRef}
              className="flex items-center gap-4 pt-4"
            >
              <div className="h-px w-12 bg-metallic-light" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
                Scrollen
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — full-bleed hero image */}
        <div className="relative min-h-[60svh] overflow-hidden lg:col-span-5 lg:min-h-svh">
          <div
            ref={imageWrapperRef}
            className="absolute inset-0"
          >
            <div ref={imageInnerRef} className="absolute inset-[-5%]">
              <Image
                src="/images/about-hero.png"
                alt="Modernes Gebäudeinterieur in Dresden — Sitz der TS Service Group"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Subtle dark gradient overlay for cohesion */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg/40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 to-transparent" />

            {/* Image meta caption — bottom-left */}
            <div
              ref={imageMetaRef}
              className="absolute bottom-6 left-6 z-10 flex items-center gap-3 md:bottom-10 md:left-10"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-metallic-light">
                Standort
              </span>
              <div className="h-px w-8 bg-metallic-light/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/85">
                Dresden, Sachsen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
