"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site.config";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function UeberUnsStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        ".stats-eyebrow",
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
        ".stats-title-line",
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

      // Each stat item — number rises + label fades
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");
      items.forEach((item, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          item.querySelector(".stat-value"),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: i * 0.08,
          }
        ).fromTo(
          item.querySelector(".stat-label"),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
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
            className="stats-eyebrow mb-4 font-mono text-sm uppercase tracking-[0.2em] text-text-muted"
            style={{ opacity: 0 }}
          >
            IN ZAHLEN
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span
                className="stats-title-line block"
                style={{ transform: "translateY(100%)" }}
              >
                Vier Anker.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="stats-title-line block text-text-muted"
                style={{ transform: "translateY(100%)" }}
              >
                Eine Realität.
              </span>
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-y-14 border-t border-border pt-16 md:grid-cols-4 md:gap-x-8 md:pt-20">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item flex flex-col items-start"
            >
              <div className="overflow-hidden">
                <span
                  className="stat-value block font-display font-medium leading-[0.85] tracking-[-0.04em] select-none"
                  style={{
                    fontSize: "clamp(4rem, 7vw, 7rem)",
                    background: METALLIC_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
              </div>
              <span
                className="stat-label mt-5 font-mono text-xs uppercase tracking-[0.25em] text-text-muted"
                style={{ opacity: 0 }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
