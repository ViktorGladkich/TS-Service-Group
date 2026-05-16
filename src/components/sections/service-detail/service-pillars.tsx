"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceMeta } from "./types";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function ServicePillars({ meta }: { meta: ServiceMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Top divider opener
      if (topLineRef.current) {
        gsap.fromTo(
          topLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 60%",
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
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      // Header reveal
      gsap.fromTo(
        ".sp-eyebrow",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".sp-title-line",
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

      gsap.fromTo(
        ".sp-intro",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pillars stagger
      gsap.utils.toArray<HTMLElement>(".sp-pillar").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg py-24 md:py-32 lg:py-40"
    >
      {/* Top divider */}
      <div className="relative">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="relative flex h-3 items-center">
            <div
              ref={topLineRef}
              className="h-px w-full origin-center bg-gradient-to-r from-transparent via-metallic-light to-transparent"
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

      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 md:px-12 md:pt-28">
        {/* Header */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span
              className="sp-eyebrow mb-5 block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
              style={{ opacity: 0 }}
            >
              {meta.pillarsEyebrow}
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
              {meta.pillarsTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <span
                    className={
                      "sp-title-line block " +
                      (i === meta.pillarsTitle.length - 1 ? "text-text-muted" : "")
                    }
                    style={{ transform: "translateY(100%)" }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p
              className="sp-intro font-sans text-base leading-relaxed text-text-muted md:text-lg"
              style={{ opacity: 0 }}
            >
              {meta.pillarsIntro}
            </p>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="mt-20 grid grid-cols-1 md:mt-28 md:grid-cols-2 lg:grid-cols-4">
          {meta.pillars.map((p, i) => (
            <div
              key={p.id}
              className={
                "sp-pillar group relative flex flex-col gap-6 border-border p-6 md:p-8 " +
                (i % 2 === 1 ? "md:border-l " : "") +
                "lg:border-l " +
                (i === 0 ? "lg:border-l-0 " : "") +
                "border-t md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+4)]:border-t-0"
              }
              style={{ opacity: 0 }}
            >
              <span
                className="font-display font-medium leading-none tracking-[-0.04em] select-none"
                style={{
                  fontSize: "clamp(3.5rem, 5vw, 5rem)",
                  background: METALLIC_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {p.id}
              </span>

              <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-text md:text-2xl">
                {p.title}
              </h3>

              <p className="text-sm leading-relaxed text-text-muted md:text-base">
                {p.body}
              </p>

              {/* hairline that draws on hover */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-metallic-light transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
