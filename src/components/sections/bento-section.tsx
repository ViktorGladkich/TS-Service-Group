"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Inverted corner SVG (reusable) ── */
const Scoop = ({ className, fill = "#0A0A0A", path }: { className: string; fill?: string; path: string }) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d={path} fill={fill} />
  </svg>
);

/* ── Scroll animation hook ── */
function useBentoAnimations(
  sectionRef: React.RefObject<HTMLElement | null>,
  refs: {
    headline: React.RefObject<HTMLDivElement | null>;
    topRight: React.RefObject<HTMLAnchorElement | null>;
    leftTall: React.RefObject<HTMLAnchorElement | null>;
    rightLarge: React.RefObject<HTMLDivElement | null>;
    stat: React.RefObject<HTMLDivElement | null>;
    glass: React.RefObject<HTMLAnchorElement | null>;
    bottomText: React.RefObject<HTMLDivElement | null>;
  }
) {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: cinematic staggered reveal
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });

        tl.fromTo(refs.headline.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
        tl.fromTo(refs.topRight.current, { x: 80, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.7");
        tl.fromTo(refs.leftTall.current, { y: 100, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.7");
        tl.fromTo(refs.rightLarge.current, { clipPath: "inset(10% 10% 10% 10% round 2rem)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1, duration: 1.2, ease: "power3.inOut" }, "-=0.8");
        tl.fromTo(refs.stat.current, { scale: 0.8, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
        tl.fromTo(refs.glass.current, { y: -40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
        tl.fromTo(".bento-pill", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.4");
        tl.fromTo(refs.bottomText.current, { y: 30, x: 20, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3");
      }, sectionRef);
      return () => ctx.revert();
    });

    // Mobile: simple fade-up for performance
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".bento-mobile-item").forEach((el) => {
          gsap.fromTo(el, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [sectionRef, refs]);
}

/* ── Corner path constants ── */
const SCOOP_BR = "M0 0V32C0 14.3269 14.3269 0 32 0H0Z";
const SCOOP_TL = "M32 0V32H0C14.3269 32 32 14.3269 32 0Z";

const PILLS = ["Sicherheit", "Umzug", "Reinigung", "Inhabergeführt"];

/* ═══════════════════════════════════════════════════════════════ */

export function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const headlineRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLAnchorElement>(null);
  const leftTallRef = useRef<HTMLAnchorElement>(null);
  const rightLargeRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLAnchorElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useBentoAnimations(sectionRef, {
    headline: headlineRef,
    topRight: topRightRef,
    leftTall: leftTallRef,
    rightLarge: rightLargeRef,
    stat: statRef,
    glass: glassRef,
    bottomText: bottomTextRef,
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-bg px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ════════════════════════════════════════════════════════════
            MOBILE LAYOUT (< lg) — clean editorial stack, no rigid grid
            ════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-4 lg:hidden">

          {/* Headline block */}
          <div
            ref={headlineRef}
            className="bento-mobile-item flex flex-col gap-4 px-1 pt-2 pb-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              [ Premium · Inhabergeführt ]
            </span>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-text sm:text-5xl">
              Premium-Lösungen<br />
              <span className="text-text-muted">für höchste Ansprüche.</span>
            </h2>
          </div>

          {/* Security card — image + bottom glass strip */}
          <Link
            href="/leistungen/sicherheitsdienst"
            className="bento-mobile-item group relative block aspect-4/5 overflow-hidden rounded-4xl border border-white/6 sm:aspect-5/4"
          >
            <Image
              src="/images/bento-security.jpg"
              alt="Sicherheitsdienst — Objektschutz"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />

            {/* Eyebrow chip */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-metallic-light" />
              01 · Sicherheit
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
                Ihre Sicherheit.<br />Garantiert.
              </h3>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all group-hover:bg-white group-hover:text-bg">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </span>
            </div>
          </Link>

          {/* Two-up: 100% stat + Direct-to-owner */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-mobile-item flex flex-col justify-between rounded-[1.75rem] border border-black/10 bg-metallic-light p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bg/40">
                [ Anspruch ]
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-bg sm:text-6xl">
                  100%
                </span>
                <span className="text-xs leading-relaxed text-bg/65">
                  Zuverlässig · Transparent
                </span>
              </div>
            </div>

            <Link
              href="/kontakt"
              className="bento-mobile-item group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3 p-5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-subtle">
                [ Direkt zum Inhaber ]
              </span>
              <div className="flex items-end justify-between gap-3">
                <h4 className="font-display text-xl font-medium leading-tight tracking-tight text-text sm:text-2xl">
                  Persönlich.<br />Verbindlich.
                </h4>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg text-white transition-all group-hover:bg-white group-hover:text-bg">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </div>
            </Link>
          </div>

          {/* Premium service card */}
          <Link
            href="/kontakt"
            className="bento-mobile-item group relative block overflow-hidden rounded-4xl border border-black/10 bg-metallic-light p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/40">
                  [ Premium-Service ]
                </span>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-bg sm:text-3xl">
                  Den perfekten<br />Service zusammenstellen.
                </h3>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-bg text-white transition-all group-hover:bg-metallic-light group-hover:text-bg">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-bg/65">
              Beantworten Sie ein paar kurze Fragen — wir melden uns mit einem
              maßgeschneiderten Vorschlag.
            </p>

            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/bento-premium.jpg"
                alt="Premium Service — Werkzeuge und Sorgfalt"
                fill
                sizes="(min-width: 1024px) 1px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Interior signature card */}
          <div className="bento-mobile-item relative overflow-hidden rounded-4xl">
            <div className="relative aspect-4/5 w-full">
              <Image
                src="/images/bento-interior.jpg"
                alt="Saubere, sichere Räume — minimalistisches Interieur"
                fill
                sizes="(min-width: 1024px) 1px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" />
            </div>

            {/* Floating glass label */}
            <div className="absolute inset-x-5 top-5 flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur-md w-fit">
              <span className="h-1 w-1 rounded-full bg-metallic-light" />
              Räume mit Standard
            </div>

            {/* Bottom block with pills + headline */}
            <div className="absolute inset-x-5 bottom-5 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {PILLS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="max-w-[18ch] font-display text-xl font-medium leading-tight tracking-tight text-white sm:text-2xl">
                Wir schaffen sichere und saubere Räume für Sie.
              </h4>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (≥ lg) — original bento, untouched
            ════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-5 lg:auto-rows-[280px]">

          {/* ── ROW 1: Headline ── */}
          <div ref={headlineRef} className="lg:col-span-7 row-span-1 flex flex-col justify-center p-4 lg:p-8">
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-white font-medium leading-tight tracking-tight mb-4">
              Wir bieten Premium-Lösungen <br className="hidden md:block" />für höchste Ansprüche.
            </h2>
          </div>

          {/* ── ROW 1: Security Card ── */}
          <Link
            href="/leistungen/sicherheitsdienst"
            ref={topRightRef}
            className="lg:col-span-5 row-span-1 rounded-4xl overflow-hidden relative group cursor-pointer border border-white/5"
          >
            <Image
              src="/images/bento-security.jpg"
              alt="Sicherheitsdienst — Objektschutz"
              fill
              sizes="(max-width: 1024px) 50vw, 600px"
              className="object-cover scale-135 translate-x-[-20%] translate-y-[15%] transition-transform duration-700"
            />
            {/* Apple Glass Overlay on the right */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 flex flex-col justify-center p-8 bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-4xl">
              <div className="absolute top-6 right-6 w-10 h-10 bg-bg rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg z-10 border border-white/10">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                <ArrowUpRight className="relative z-10 text-white group-hover:text-bg w-5 h-5 transition-all duration-500 group-hover:rotate-45" />
              </div>
              <h3 className="text-2xl font-display font-medium text-white tracking-tight relative z-10">
                Ihre Sicherheit.<br />Garantiert.
              </h3>
            </div>
          </Link>

          {/* ── ROW 2-3: Left Tall Card ── */}
          <Link
            href="/kontakt"
            ref={leftTallRef}
            className="lg:col-span-4 lg:row-span-2 bg-metallic-light border border-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] rounded-4xl p-8 flex flex-col relative group cursor-pointer"
          >
            <div className="absolute top-8 right-8 w-10 h-10 bg-bg rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-lg z-10 border border-white/10">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              <ArrowUpRight className="relative z-10 text-white group-hover:text-bg w-5 h-5 transition-all duration-500 group-hover:rotate-45" />
            </div>
            <h3 className="text-3xl lg:text-4xl text-bg font-display font-medium mb-4 pr-12 tracking-tight">Nutzen Sie unseren Premium-Service</h3>
            <p className="text-bg/65 text-sm leading-relaxed max-w-[85%] mb-8">Beantworten Sie ein paar kurze Fragen, um den perfekten Service für Sie zusammenzustellen.</p>
            <div className="relative grow mt-auto rounded-2xl overflow-hidden min-h-[200px]">
              <Image
                src="/images/bento-premium.jpg"
                alt="Premium Service — Werkzeuge und Sorgfalt"
                fill
                sizes="466px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

          {/* ── ROW 2-3: Right Large Card with L-shape cutout ── */}
          <div ref={rightLargeRef} className="lg:col-span-8 lg:row-span-2 relative rounded-4xl overflow-hidden">
            <Image
              src="/images/bento-interior.jpg"
              alt="Saubere, sichere Räume — minimalistisches Interieur"
              fill
              sizes="933px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg/70 via-bg/20 to-transparent pointer-events-none" />

            {/* L-Shape Cutout (desktop) */}
            <div ref={statRef} className="absolute top-0 left-0 bg-bg z-10" style={{ width: "calc(45% + 0.625rem)", height: "calc(40% + 0.625rem)", borderBottomRightRadius: "2rem" }}>
              <Scoop className="absolute top-0 -right-8 w-8 h-8" fill="#0A0A0A" path={SCOOP_BR} />
              <Scoop className="absolute -bottom-8 left-0 w-8 h-8" fill="#0A0A0A" path={SCOOP_BR} />
              <div className="absolute inset-0 right-5 bottom-5 bg-metallic-light rounded-4xl p-8 flex flex-col justify-center border border-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                <h3 className="text-5xl font-display font-semibold text-bg tracking-tight mb-3">100%</h3>
                <p className="text-bg/65 text-sm">Unser Anspruch an jeden Einsatz — Zuverlässigkeit und Transparenz.</p>
              </div>
            </div>

            {/* Floating content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
              {/* Owner-direct glass card */}
              <Link
                href="/kontakt"
                ref={glassRef}
                className="self-end bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 w-auto max-w-[18rem] pointer-events-auto shadow-2xl group/glass"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-display text-2xl font-semibold text-white tracking-tight leading-tight">Direkt zum<br />Inhaber.</h4>
                  <div className="w-8 h-8 bg-bg rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 group-hover/glass:scale-110 shadow-lg z-10 border border-white/10 relative shrink-0">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/glass:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    <ArrowUpRight className="relative z-10 text-white group-hover/glass:text-bg w-4 h-4 transition-all duration-500 group-hover/glass:rotate-45" />
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Inhabergeführt aus Dresden. Kein Callcenter, kein Ticketsystem —
                  Sie sprechen mit dem Verantwortlichen.
                </p>
              </Link>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 max-w-sm pointer-events-auto mt-auto">
                {PILLS.map((tag) => (
                  <span key={tag} className="bento-pill px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">{tag}</span>
                ))}
              </div>
            </div>

            {/* Bottom-right text with inverted corners */}
            <div ref={bottomTextRef} className="absolute bottom-0 right-0 z-30 bg-bg rounded-tl-4xl pl-6 pt-6 pr-4 pb-4 max-w-xs">
              <Scoop className="absolute -top-8 right-0 w-8 h-8" path={SCOOP_TL} />
              <Scoop className="absolute bottom-0 -left-8 w-8 h-8" path={SCOOP_TL} />
              <h4 className="text-lg lg:text-xl font-medium text-white tracking-tight leading-snug">Wir schaffen sichere und saubere Räume für Sie.</h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
