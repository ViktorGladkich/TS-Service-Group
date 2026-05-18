"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for first text reveal
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text1OverlayRef = useRef<HTMLHeadingElement>(null);

  // Refs for services sliding/pinning (displaying "Warum Wir?")
  const servicesRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const header0Ref = useRef<HTMLDivElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);

  // Refs for second text reveal
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text2OverlayRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const ctx = gsap.context(() => {
          // ── 1. FIRST TEXT REVEAL ──
          if (text1Ref.current && text1OverlayRef.current) {
            ScrollTrigger.create({
              trigger: text1Ref.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
              onUpdate: (self) => {
                const clipValue = Math.max(0, 100 - self.progress * 100);
                gsap.set(text1OverlayRef.current, {
                  clipPath: `inset(0% 0% ${clipValue}% 0%)`,
                });
              },
            });
          }

          // ── 2. SERVICES SLIDING (HORIZONTAL ASSEMBLY - LEFT, RIGHT, LEFT) ──
          if (
            servicesRef.current &&
            header0Ref.current &&
            header1Ref.current &&
            header2Ref.current
          ) {
            // Slide in from sides before pinning
            ScrollTrigger.create({
              trigger: servicesRef.current,
              start: "top bottom",
              end: "top top",
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(header0Ref.current, { x: `${-100 + progress * 100}%` });
                gsap.set(header1Ref.current, { x: `${100 - progress * 100}%` });
                gsap.set(header2Ref.current, { x: `${-100 + progress * 100}%` });
              },
            });

            // Pinning, vertical merging, scaling + parallax image strip behind text
            ScrollTrigger.create({
              trigger: servicesRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 2}`,
              pin: true,
              scrub: 1,
              pinSpacing: false, // Allows next section to scroll OVER it
              onUpdate: (self) => {
                const progress = self.progress;
                const vh = window.innerHeight;

                // Parallax image strip: starts just below the viewport (+110vh) and ends
                // fully off the top (-150vh). With 2 stacked cards + gap (~130vh tall),
                // image 1 is centered around progress ~32% and image 2 around ~65%,
                // so both get a fair pass through the viewport during the pinned scroll.
                if (parallaxRef.current) {
                  const startY = vh * 1.1;
                  const endY = vh * -2.5;
                  const y = startY + (endY - startY) * progress;
                  gsap.set(parallaxRef.current, { y });
                }

                if (progress <= 0.5) {
                  // First 50% of scroll: vertical collapse into center
                  const yProgress = progress / 0.5;
                  gsap.set(header0Ref.current, {
                    x: "0%",
                    y: `${yProgress * 100}%`,
                    scale: 1,
                    opacity: 1,
                  });
                  gsap.set(header1Ref.current, { x: "0%", y: "0%", scale: 1, opacity: 1 });
                  gsap.set(header2Ref.current, {
                    x: "0%",
                    y: `${yProgress * -100}%`,
                    scale: 1,
                    opacity: 1,
                  });
                } else {
                  // Second 50%: stay collapsed & scale down to fade away
                  const scaleProgress = (progress - 0.5) / 0.5;
                  const minScale = isDesktop ? 0.3 : 0.45;
                  const scale = 1 - scaleProgress * (1 - minScale);
                  const opacity = 1 - scaleProgress * 0.5;

                  gsap.set(header0Ref.current, { x: "0%", y: "100%", scale, opacity });
                  gsap.set(header1Ref.current, { x: "0%", y: "0%", scale, opacity });
                  gsap.set(header2Ref.current, { x: "0%", y: "-100%", scale, opacity });
                }
              },
            });
          }

          // ── 3. SECOND TEXT REVEAL ──
          if (text2Ref.current && text2OverlayRef.current) {
            ScrollTrigger.create({
              trigger: text2Ref.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
              onUpdate: (self) => {
                const clipValue = Math.max(0, 100 - self.progress * 100);
                gsap.set(text2OverlayRef.current, {
                  clipPath: `inset(0% 0% ${clipValue}% 0%)`,
                });
              },
            });
          }
        }, containerRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const text1 =
    "Ein Raum für Dienstleistungen, gestaltet mit absoluter Klarheit und Präzision. Jedes Projekt folgt einem verlässlichen Pfad von der ersten Analyse bis zur vollkommenen Umsetzung im Herzen Sachsens.";
  const text2 =
    "Wir schaffen lückenlose Sicherheit, reibungslose Logistik und hygienische Sauberkeit, die Vertrauen stiften. Durch minimale Form und präzises Handeln bieten wir Ihnen ein beruhigendes Gefühl vollendeter Ordnung.";

  return (
    <div ref={containerRef} className="bg-bg w-full text-white">
      {/* ── BRIDGE FROM HERO: metallic-light strip with rounded dark rising ── */}
      <div aria-hidden className="bg-metallic-light relative h-16 overflow-hidden lg:h-24">
        <div className="bg-bg absolute inset-x-0 top-6 bottom-0 rounded-t-[48px] lg:top-8 lg:rounded-t-[64px]" />
      </div>

      {/* ── SECTION HEADER: ÜBER UNS — Process-style layout ── */}
      <section className="bg-bg relative w-full px-6 pt-28 pb-24 lg:px-12 lg:pt-44 lg:pb-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-16 flex flex-col md:mb-24">
            <span className="mb-4 font-mono text-sm tracking-[0.2em] text-text-muted">
              ÜBER UNS
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
              Drei Disziplinen.<br />
              Ein Team.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-sans text-base leading-relaxed text-text-muted md:text-lg">
                Inhabergeführt aus Dresden — Sicherheit, Sauberkeit und Bewegung
                unter einem Dach. Verlässlich, diskret und präzise. Direkter
                Draht zum Verantwortlichen statt Hotline und Ticketsystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: FIRST TEXT REVEAL ── */}
      <section className="relative flex h-svh w-full items-center justify-center overflow-hidden px-6 select-none lg:px-12">
        <div className="relative mx-auto w-full max-w-5xl">
          <h2
            ref={text1Ref}
            className={cn(
              "font-display text-center font-medium",
              "text-text-subtle text-3xl leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            )}
          >
            {text1}
          </h2>
          <h2
            ref={text1OverlayRef}
            className={cn(
              "font-display pointer-events-none absolute top-0 left-0 h-full w-full text-center font-medium select-none",
              "text-3xl leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            )}
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            {text1}
          </h2>
        </div>
      </section>

      {/* ── SECTION 2: PINNED "WARUM WIR?" + PARALLAX IMAGE STRIP BEHIND ── */}
      <section
        ref={servicesRef}
        className="bg-bg relative z-20 flex h-svh w-full flex-col items-center justify-center overflow-hidden"
      >
        {/* Parallax image strip — sits behind the text, travels bottom→top during pin */}
        <div
          ref={parallaxRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 flex flex-col items-center gap-[40vh] will-change-transform"
          style={{ transform: "translateY(100svh)" }}
        >
          <figure className="relative aspect-3/4 w-[220px] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl sm:w-[300px] lg:ml-[18vw] lg:w-[380px] lg:self-auto">
            <Image
              src="/images/about-team.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 220px, 380px"
              className="object-cover brightness-75 contrast-110 filter"
            />
          </figure>

          <figure className="relative aspect-3/4 w-[220px] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl sm:w-[300px] lg:mr-[18vw] lg:w-[380px] lg:self-auto">
            <Image
              src="/images/about-care.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 220px, 380px"
              className="object-cover brightness-75 contrast-110 filter"
            />
          </figure>
        </div>

        {/* Subtle dark vignette over the parallax to keep text readable */}
        <div
          aria-hidden
          className="from-bg/70 via-bg/30 to-bg/70 pointer-events-none absolute inset-0 z-1 bg-linear-to-b"
        />

        {/* "Warum Wir?" headers — sit on top of the parallax */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center">
          <div
            ref={header0Ref}
            className={cn(
              "font-display w-full px-6 py-6 text-center font-extrabold whitespace-nowrap text-white uppercase will-change-transform select-none",
              "text-[9vw] leading-none tracking-normal sm:text-[8vw] lg:text-[7.5vw]"
            )}
            style={{ transform: "translateX(-100%)" }}
          >
            Warum Wir?
          </div>

          <div
            ref={header1Ref}
            className={cn(
              "text-metallic-light font-display z-10 w-full px-6 py-6 text-center font-extrabold whitespace-nowrap uppercase will-change-transform select-none",
              "text-[9vw] leading-none tracking-normal sm:text-[8vw] lg:text-[7.5vw]"
            )}
            style={{ transform: "translateX(100%)" }}
          >
            Warum Wir?
          </div>

          <div
            ref={header2Ref}
            className={cn(
              "font-display w-full px-6 py-6 text-center font-extrabold whitespace-nowrap text-white uppercase will-change-transform select-none",
              "text-[9vw] leading-none tracking-normal sm:text-[8vw] lg:text-[7.5vw]"
            )}
            style={{ transform: "translateX(-100%)" }}
          >
            Warum Wir?
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SECOND TEXT REVEAL (Overlapping via mount offset margin) ── */}
      <section className="bg-bg relative z-30 mt-[152svh] flex h-svh w-full items-center justify-center overflow-hidden px-6 select-none lg:px-12">
        <div className="relative mx-auto w-full max-w-5xl">
          <h2
            ref={text2Ref}
            className={cn(
              "font-display text-center font-medium",
              "text-text-subtle text-3xl leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            )}
          >
            {text2}
          </h2>
          <h2
            ref={text2OverlayRef}
            className={cn(
              "font-display pointer-events-none absolute top-0 left-0 h-full w-full text-center font-medium select-none",
              "text-3xl leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            )}
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            {text2}
          </h2>
        </div>
      </section>
    </div>
  );
}
