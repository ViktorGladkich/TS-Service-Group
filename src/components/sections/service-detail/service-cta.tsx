"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import type { ServiceMeta } from "./types";

export function ServiceCta({ meta }: { meta: ServiceMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        ".scta-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg px-4 py-12 md:px-8 md:py-20 lg:py-24"
    >
      <div
        ref={cardRef}
        className="relative mx-auto h-[600px] w-full max-w-[1400px] overflow-hidden rounded-[2rem] md:h-[640px] md:rounded-[3rem]"
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={meta.ctaImage}
            alt={meta.ctaImageAlt}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.55]"
          />
        </div>

        {/* gradient & vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-14 lg:p-20">
          {/* top */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {meta.ctaEyebrow && (
              <span className="scta-text font-mono text-[11px] uppercase tracking-[0.3em] text-metallic-light">
                {meta.ctaEyebrow}
              </span>
            )}
            {meta.shortLabel && meta.ctaEyebrow && (
              <span className="scta-text font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                [ {meta.shortLabel} · Dresden · Sachsen ]
              </span>
            )}
          </div>

          {/* bottom block */}
          <div className="space-y-10">
            <h2 className="scta-text max-w-3xl font-display text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
              {meta.ctaTitle.map((line, i) => (
                <span
                  key={i}
                  className={
                    "block " +
                    (i === meta.ctaTitle.length - 1 ? "text-white/70" : "")
                  }
                >
                  {line}
                </span>
              ))}
            </h2>

            <p className="scta-text max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {meta.ctaBody}
            </p>

            <div className="scta-text flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/kontakt"
                className="group relative inline-flex h-12 w-[260px] sm:w-auto items-center justify-between overflow-hidden rounded-full border border-white/15 bg-white pl-5 pr-1.5 text-sm font-medium text-bg"
              >
                <span className="pointer-events-none absolute inset-0 translate-y-full bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Unverbindlich anfragen
                </span>
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg text-white transition-all duration-500 group-hover:bg-white group-hover:text-bg">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group inline-flex h-12 w-[260px] sm:w-auto items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-metallic-light" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
