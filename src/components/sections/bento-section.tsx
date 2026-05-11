"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
  refs: Record<string, React.RefObject<HTMLElement | null>>
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

const AVATARS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=128&h=128&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=128&h=128&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=128&h=128&auto=format&fit=crop",
];

const PILLS = ["Sicherheit", "Premium", "Umzug", "Reinigung"];

/* ═══════════════════════════════════════════════════════════════ */

export function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const refs = {
    headline: useRef<HTMLDivElement>(null),
    topRight: useRef<HTMLDivElement>(null),
    leftTall: useRef<HTMLDivElement>(null),
    rightLarge: useRef<HTMLDivElement>(null),
    stat: useRef<HTMLDivElement>(null),
    glass: useRef<HTMLDivElement>(null),
    bottomText: useRef<HTMLDivElement>(null),
  };

  useBentoAnimations(sectionRef, refs);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-[240px] md:auto-rows-[280px]">

          {/* ── ROW 1: Headline ── */}
          <div ref={refs.headline} className="bento-mobile-item col-span-1 lg:col-span-7 row-span-1 flex flex-col justify-center p-4 lg:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl xl:text-6xl text-white font-medium leading-tight tracking-tight mb-4">
              Wir bieten Premium-Lösungen <br className="hidden md:block" />für höchste Ansprüche.
            </h2>
          </div>

          {/* ── ROW 1: Security Card ── */}
          <div ref={refs.topRight} className="bento-mobile-item col-span-1 lg:col-span-5 row-span-1 rounded-[2rem] overflow-hidden relative flex flex-col sm:flex-row group cursor-pointer">
            <div className="w-full sm:w-1/2 h-48 sm:h-full relative">
              <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop" fill className="object-cover" alt="Service" />
            </div>
            <div className="w-full sm:w-1/2 h-full flex flex-col justify-center p-8 relative bg-white/10 backdrop-blur-2xl border-l border-white/10">
              <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <ArrowUpRight className="text-[#0A0A0A] w-5 h-5" />
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-display)] font-medium text-white tracking-tight mt-4 sm:mt-0">Ihre Sicherheit.<br />Garantiert.</h3>
            </div>
          </div>

          {/* ── ROW 2-3: Left Tall Card ── */}
          <div ref={refs.leftTall} className="bento-mobile-item col-span-1 lg:col-span-4 lg:row-span-2 bg-[#1A1A1A] rounded-[2rem] p-8 flex flex-col relative group cursor-pointer border border-white/5">
            <div className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-lg">
              <ArrowUpRight className="text-[#0A0A0A] w-5 h-5" />
            </div>
            <h3 className="text-3xl lg:text-4xl text-white font-[family-name:var(--font-display)] font-medium mb-4 pr-12 tracking-tight">Nutzen Sie unseren Premium-Service</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[85%] mb-8">Beantworten Sie ein paar kurze Fragen, um den perfekten Service für Sie zusammenzustellen.</p>
            <div className="relative flex-grow mt-auto rounded-2xl overflow-hidden min-h-[200px]">
              <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Premium Service" />
            </div>
          </div>

          {/* ── ROW 2-3: Right Large Card with L-shape cutout ── */}
          <div ref={refs.rightLarge} className="bento-mobile-item col-span-1 lg:col-span-8 lg:row-span-2 relative rounded-[2rem] overflow-hidden min-h-[500px] lg:min-h-0">
            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" fill className="object-cover" alt="Office" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-transparent pointer-events-none" />

            {/* L-Shape Cutout (desktop) */}
            <div ref={refs.stat} className="hidden lg:block absolute top-0 left-0 bg-[#0A0A0A] z-10" style={{ width: "calc(45% + 0.625rem)", height: "calc(40% + 0.625rem)", borderBottomRightRadius: "2rem" }}>
              <Scoop className="absolute top-0 -right-8 w-8 h-8" fill="#0A0A0A" path={SCOOP_BR} />
              <Scoop className="absolute -bottom-8 left-0 w-8 h-8" fill="#0A0A0A" path={SCOOP_BR} />
              <div className="absolute inset-0 right-5 bottom-5 bg-[#1A1A1A] rounded-[2rem] p-8 flex flex-col justify-center border border-white/5">
                <h3 className="text-5xl font-[family-name:var(--font-display)] font-semibold text-white tracking-tight mb-3">100%</h3>
                <p className="text-gray-400 text-sm">Zuverlässigkeit und Transparenz bei jedem Serviceeinsatz.</p>
              </div>
            </div>

            {/* Mobile fallback */}
            <div className="block lg:hidden bg-[#1A1A1A] p-8 m-4 rounded-[1.5rem] relative z-20 border border-white/5">
              <h3 className="text-4xl font-[family-name:var(--font-display)] font-semibold text-white mb-2">100%</h3>
              <p className="text-gray-400 text-sm">Zuverlässigkeit und Transparenz bei jedem Serviceeinsatz.</p>
            </div>

            {/* Floating content */}
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between z-20 pointer-events-none">
              {/* 250+ glass card */}
              <div ref={refs.glass} className="self-end bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 w-[calc(100%-2rem)] lg:w-auto max-w-[16rem] pointer-events-auto shadow-2xl">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-3xl font-[family-name:var(--font-display)] font-semibold text-white tracking-tight">250+</h4>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <ArrowUpRight className="text-[#0A0A0A] w-4 h-4" />
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">Zufriedene Kunden vertrauen unserer Expertise.</p>
                <div className="flex -space-x-2">
                  {AVATARS.map((src, i) => (
                    <Image key={i} src={src} width={32} height={32} className="rounded-full border border-white/20 object-cover" alt="User" />
                  ))}
                </div>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 max-w-sm pointer-events-auto mt-auto">
                {PILLS.map((tag) => (
                  <span key={tag} className="bento-pill px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">{tag}</span>
                ))}
              </div>
            </div>

            {/* Bottom-right text with inverted corners */}
            <div ref={refs.bottomText} className="absolute bottom-0 right-0 z-30 bg-[#0A0A0A] rounded-tl-[2rem] pl-6 pt-6 pr-4 pb-4 max-w-xs">
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
