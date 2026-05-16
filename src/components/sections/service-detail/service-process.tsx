"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceMeta } from "./types";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function ServiceProcess({ meta }: { meta: ServiceMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sproc-eyebrow",
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
        ".sproc-title-line",
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
        ".sproc-intro",
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

      gsap.utils.toArray<HTMLElement>(".sproc-step").forEach((el) => {
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

      // Track progress fill driven by scroll
      if (trackRef.current && progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: true,
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
      className="relative border-t border-border bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span
              className="sproc-eyebrow mb-5 block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
              style={{ opacity: 0 }}
            >
              {meta.processEyebrow}
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
              {meta.processTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <span
                    className={
                      "sproc-title-line block " +
                      (i === meta.processTitle.length - 1 ? "text-text-muted" : "")
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
              className="sproc-intro font-sans text-base leading-relaxed text-text-muted md:text-lg"
              style={{ opacity: 0 }}
            >
              {meta.processIntro}
            </p>
          </div>
        </div>

        {/* Steps with vertical scroll-driven track */}
        <div ref={trackRef} className="relative mt-20 md:mt-28">
          {/* Vertical guideline */}
          <div className="pointer-events-none absolute left-[1.5rem] top-0 hidden h-full w-px bg-border md:block" />
          <span
            ref={progressRef}
            className="pointer-events-none absolute left-[1.5rem] top-0 hidden h-full w-px origin-top bg-metallic-light md:block"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-12 md:space-y-16">
            {meta.process.map((step) => (
              <div
                key={step.id}
                className="sproc-step relative grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
                style={{ opacity: 0 }}
              >
                <div className="md:col-span-3 md:pl-16">
                  <div className="relative flex items-center gap-4">
                    {/* dot anchor on the vertical track */}
                    <span className="absolute -left-16 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-bg ring-1 ring-metallic-light md:block" />
                    <span
                      className="font-display font-medium leading-none tracking-[-0.04em] select-none"
                      style={{
                        fontSize: "clamp(3rem, 4vw, 4.5rem)",
                        background: METALLIC_GRADIENT,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.id}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-text md:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
