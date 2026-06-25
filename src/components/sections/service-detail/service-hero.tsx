"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { ServiceMeta } from "./types";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function ServiceHero({ meta }: { meta: ServiceMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".sh-eyebrow", { y: 24, opacity: 0 });
      gsap.set(".sh-title-line", { y: 40, opacity: 0 });
      gsap.set(".sh-intro", { y: 24, opacity: 0 });
      gsap.set(".sh-meta-row", { y: 24, opacity: 0 });
      gsap.set(".sh-scroll", { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(".sh-eyebrow", { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });

      tl.to(
        ".sh-title-line",
        { y: 0, opacity: 1, duration: 1.3, stagger: 0.15, ease: "power4.out" },
        "-=0.7"
      );

      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut" },
        "-=1.1"
      );

      tl.fromTo(
        imageInnerRef.current,
        { scale: 1.18 },
        { scale: 1, duration: 1.6, ease: "power3.out" },
        "-=1.2"
      );

      tl.fromTo(
        numberRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "-=1.0"
      );

      tl.to(
        ".sh-intro",
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.8"
      );

      tl.to(
        ".sh-meta-row",
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

      tl.to(
        ".sh-scroll",
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-44 md:px-12 md:pt-56 lg:pt-64">
        {/* Top breadcrumb-style row */}
        <div className="sh-eyebrow flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
          <Link href="/leistungen" className="transition-colors hover:text-text">
            Leistungen
          </Link>
          <span className="text-text-subtle">/</span>
          <span className="text-text">{meta.label}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-text-subtle">{meta.number} / 03</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* TITLE COLUMN */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-medium leading-[0.92] tracking-tight text-text text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,7.5vw,9rem)]">
              {meta.heroTitleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <span
                    className={
                      "sh-title-line block " +
                      (i === meta.heroTitleLines.length - 1 ? "text-text-muted" : "")
                    }
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="sh-intro mt-10 max-w-xl font-sans text-base leading-relaxed text-text-muted md:text-lg">
              {meta.heroIntro}
            </p>

            <div className="sh-scroll mt-14 flex items-center gap-4 md:mt-20">
              <div className="h-px w-12 bg-metallic-light" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-subtle">
                {meta.tagline}
              </span>
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="lg:col-span-5">
            <div
              ref={imageWrapperRef}
              className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-elevated md:aspect-square lg:aspect-auto lg:h-full"
              style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
              <div ref={imageInnerRef} className="absolute inset-[-6%]">
                <Image
                  src={meta.heroImage}
                  alt={meta.heroImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Dark gradient for legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg via-bg/40 to-transparent" />

              {/* Massive metallic service number */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden">
                <span
                  ref={numberRef}
                  className="block font-display font-medium leading-[0.85] tracking-tighter select-none"
                  style={{
                    fontSize: "clamp(7rem, 18vw, 14rem)",
                    background: METALLIC_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transform: "translateY(12%)",
                    opacity: 0,
                  }}
                >
                  {meta.number}
                </span>
              </div>

              {/* Floating CTA chip */}
              <Link
                href="/kontakt"
                className="group absolute right-5 top-5 flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white pl-5 pr-2 font-mono text-xs uppercase tracking-[0.18em] text-bg shadow-lg transition-colors duration-300 hover:bg-bg hover:text-white"
              >
                Anfragen
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg text-white transition-all duration-300 group-hover:bg-white group-hover:text-bg group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* META FOOTER ROW */}
        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-border pt-10 sm:gap-x-6 md:mt-28 md:grid-cols-4 md:pt-14">
          {meta.heroMeta.map((m) => (
            <div key={m.label} className="sh-meta-row flex flex-col gap-2 sm:gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-subtle">
                {m.label}
              </span>
              <span
                className="font-display text-[clamp(1.15rem,4.5vw,1.75rem)] md:text-3xl font-medium leading-tight tracking-tight break-words hyphens-auto"
                style={{
                  background: METALLIC_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="h-24 md:h-32" />
      </div>
    </section>
  );
}
