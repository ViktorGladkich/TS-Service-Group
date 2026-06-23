"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Audit & Bedarfsanalyse",
    subtitle: "Vor-Ort-Begehung in Dresden",
    description:
      "Jedes Projekt beginnt mit einer detaillierten Standortanalyse. Wir identifizieren architektonische und logistische Schwachstellen, kalkulieren den exakten Personalbedarf und definieren individuelle Sicherheits- oder Reinigungsprotokolle.",
    tags: ["Standort-Audit", "Risikobewertung", "Festpreis"],
  },
  {
    id: "02",
    title: "Maßgeschneiderte Konzeption",
    subtitle: "Entwicklung des Einsatzplans",
    description:
      "Auf Basis des Audits erstellen wir ein passgenaues Service-Konzept. Sie erhalten einen klaren Ablaufplan, einen festen Ansprechpartner und ein verbindliches Angebot — kurz, schriftlich, ohne Kleingedrucktes.",
    tags: ["Festes Angebot", "Einsatzplanung", "Fester Ansprechpartner"],
  },
  {
    id: "03",
    title: "Implementierung & Einsatz",
    subtitle: "Strukturierter Start vor Ort",
    description:
      "Geschulte Fachkräfte mit §34a-Sachkundenachweis im Sicherheitsbereich übernehmen die Ausführung. Klare Abläufe, geprüftes Equipment und dokumentierte Übergaben sichern verlässliche Standards vom ersten Einsatz an.",
    tags: ["§34a-Sachkunde", "Geprüftes Equipment", "Dokumentation"],
  },
  {
    id: "04",
    title: "Qualität & Nachsorge",
    subtitle: "Direkter Draht zum Inhaber",
    description:
      "Qualität ist kein Zufall, sondern Ergebnis kurzer Wege. Sie haben einen festen Ansprechpartner, regelmäßige Rückmeldungen und im Sicherheitsbereich einen Notdienst rund um die Uhr — direkt am Mobil des Inhabers.",
    tags: ["Inhabergeführt", "Persönlich"],
  },
];

const FACE_TRANSFORMS = [
  "translateZ(30vh)",
  "rotateX(90deg) translateZ(30vh)",
  "rotateX(180deg) translateZ(30vh)",
  "rotateX(-90deg) translateZ(30vh)",
];

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section opener — scroll-driven metallic divider draws across, diamond punctuation fades in
    const openerCtx = gsap.context(() => {
      if (topLineRef.current) {
        gsap.fromTo(
          topLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.2,
            },
          }
        );
      }
      if (diamondRef.current) {
        gsap.fromTo(
          diamondRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    // Intro entrance — sequenced reveal of heading → title → description
    const introCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          0.15
        )
        .fromTo(
          descRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.3
        );
    }, containerRef);

    // Pinned cube — desktop only
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cubeCtx = gsap.context(() => {
        const total = PROCESS_STEPS.length;
        const maxRotation = -270;

        ScrollTrigger.create({
          trigger: pinTargetRef.current,
          pin: pinTargetRef.current,
          // pinType "transform" avoids position:fixed jolt at pin activation
          // when Lenis is smoothing scroll. The cube's perspective lives in an
          // inner container, so this doesn't break 3D rendering.
          pinType: "transform",
          start: "top top",
          end: () => `+=${total * window.innerHeight}`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cubeRef.current, {
              rotateX: progress * maxRotation,
              force3D: true,
            });
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
          },
        });
      }, containerRef);

      return () => cubeCtx.revert();
    });

    mm.add("(max-width: 1023px)", () => {
      const mobileCtx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".process-mobile-item").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, containerRef);

      return () => mobileCtx.revert();
    });

    return () => {
      openerCtx.revert();
      introCtx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="prozess"
      className="relative z-20 mt-12 bg-bg "
      style={{
        
      }}
    >
      {/* ============================================================
          SECTION OPENER  —  scroll-driven metallic divider with diamond
          ============================================================ */}
      <div className="relative pt-12 md:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="relative flex h-3 items-center">
            <div
              ref={topLineRef}
              className="h-px w-full origin-center bg-linear-to-r from-transparent via-metallic-light to-transparent"
              style={{ transform: "scaleX(0)", willChange: "transform" }}
            />
            <div
              ref={diamondRef}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-metallic-light"
              style={{
                opacity: 0,
                boxShadow: "0 0 12px 1px rgba(237,237,237,0.45)",
                willChange: "opacity, transform",
              }}
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION INTRO  —  matches ServiceShowcase pattern
          ============================================================ */}
      <div
        ref={introRef}
        className="mx-auto w-full max-w-[1440px] px-6 md:px-12 pt-12 md:pt-16 pb-24 md:pb-28 lg:pb-32"
      >
        <div className="mb-16 flex flex-col md:mb-24">
          <span
            ref={headingRef}
            className="mb-4 font-mono text-sm tracking-[0.2em] text-text-muted"
            style={{ opacity: 0 }}
          >
            UNSERE METHODIK
          </span>
          <h2
            ref={titleRef}
            className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl"
            style={{ opacity: 0 }}
          >
            Vier Phasen.<br />
            Ein Versprechen.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <p
              ref={descRef}
              className="font-sans text-base leading-relaxed text-text-muted md:text-lg"
              style={{ opacity: 0 }}
            >
              Transparenz, Diskretion und kompromisslose Qualität. Unser
              standardisiertes Onboarding garantiert reibungslose Abläufe vom
              ersten Audit bis zur täglichen Einsatzleitung vor Ort.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP — PINNED 3D ROTATING CUBE
          ============================================================ */}
      <div
        ref={pinTargetRef}
        className="relative hidden h-svh w-full overflow-hidden lg:block"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Hairline scrub progress at the very top */}
        <div className="absolute top-0 right-0 left-0 z-30 h-px overflow-hidden bg-border/40">
          <span
            ref={progressBarRef}
            className="block h-full w-full origin-left bg-metallic-light"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* 3D perspective stage */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-24"
          style={{
            perspective: "2400px",
            perspectiveOrigin: "center center",
          }}
        >
          <div
            ref={cubeRef}
            className="relative h-[60vh] w-full max-w-[1100px]"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {PROCESS_STEPS.map((step, i) => (
              <FaceCard
                key={step.id}
                step={step}
                transform={FACE_TRANSFORMS[i]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE — STACKED FALLBACK
          ============================================================ */}
      <div className="border-t border-border lg:hidden">
        {PROCESS_STEPS.map((step, i) => (
          <div
            key={step.id}
            className={
              "process-mobile-item " +
              (i < PROCESS_STEPS.length - 1
                ? "border-b border-border px-6 py-16"
                : "px-6 py-16")
            }
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-border bg-bg/50 p-6">
              <Image
                src={`/images/${step.id}.png`}
                alt={`Phase ${step.id} Illustration`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 transition-all duration-500 scale-90"
              />
            </div>

            <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-text">
              {step.title}
            </h3>
            <p className="mt-6 text-[15px] leading-[1.7] text-text-muted">
              {step.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaceCard({
  step,
  transform,
}: {
  step: ProcessStep;
  transform: string;
}) {
  return (
    <div
      className="absolute inset-0 grid grid-cols-12 border border-border bg-bg shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
      style={{
        transform,
        backfaceVisibility: "hidden",
      }}
    >
      {/* LEFT — illustration image */}
      <div className="relative col-span-6 flex h-full items-center justify-center overflow-hidden border-r border-border xl:col-span-7 bg-bg p-8 md:p-16">
        <Image
          src={`/images/${step.id}.png`}
          alt={`Phase ${step.id} Illustration`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={step.id === "01"}
          className="object-contain p-12 transition-all duration-500 scale-90"
        />
      </div>

      {/* RIGHT — text content */}
      <div className="col-span-6 flex h-full items-center px-5 sm:px-6 lg:px-7 xl:col-span-5 xl:px-8">
        <div className="w-full">
          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-text-subtle">
            {step.subtitle}
          </span>
          <h3 className="mt-4 font-display text-xl font-medium leading-[1.05] tracking-[-0.02em] text-text sm:text-2xl lg:text-[1.625rem] xl:text-[1.875rem]">
            {step.title}
          </h3>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-text-muted lg:text-[13px]">
            {step.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
