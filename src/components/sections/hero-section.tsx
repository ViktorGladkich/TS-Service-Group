"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";
import gsap from "gsap";

const Corner = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute h-8 w-8 fill-current text-[#EDEDED]", className)}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" />
  </svg>
);

const SLIDES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2940&auto=format&fit=crop",
];
const SLIDE_DURATION = 5000; // ms

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Entrance animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Increased delay to ensure preloader is completely gone before animation starts
      const tl = gsap.timeline({ delay: 3.8 });

      // 1. Reveal inner dark container
      tl.fromTo(sectionRef.current,
        { scale: 0.96, borderRadius: "64px" },
        { scale: 1, borderRadius: "0px", duration: 1.8, ease: "power3.inOut" }
      );

      // 2. Main title text - split lines staggering up
      tl.fromTo(".hero-title-line",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.4, stagger: 0.2, ease: "power4.out" },
        "-=0.8"
      );

      // 3. White layout panels sliding from corners
      tl.to(".hero-panel-tl", { opacity: 1, duration: 0.1 }, "-=1.2")
        .fromTo(".hero-panel-tl", { y: -50 }, { y: 0, duration: 1.2, ease: "power3.out" }, "-=1.2")
        
        .to(".hero-panel-tr", { opacity: 1, duration: 0.1 }, "-=1.1")
        .fromTo(".hero-panel-tr", { y: -50 }, { y: 0, duration: 1.2, ease: "power3.out" }, "-=1.1")
        
        .to(".hero-panel-bl", { opacity: 1, duration: 0.1 }, "-=1.1")
        .fromTo(".hero-panel-bl", { x: -50 }, { x: 0, duration: 1.2, ease: "power3.out" }, "-=1.1");

      // 4. Secondary floating elements fade & slide in
      tl.to(".hero-video", { opacity: 1, duration: 0.1 }, "-=1")
        .fromTo(".hero-video", { y: 30 }, { y: 0, duration: 1.2, ease: "power3.out" }, "-=1")
        
        .to(".hero-progress", { opacity: 1, duration: 0.1 }, "-=1")
        .fromTo(".hero-progress", { x: 30 }, { x: 0, duration: 1.2, ease: "power3.out" }, "-=1")
        
        .to(".hero-card-br", { opacity: 1, duration: 0.1 }, "-=1")
        .fromTo(".hero-card-br", { y: 30 }, { y: 0, duration: 1.2, ease: "power3.out" }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slideshow + progress bar
  useEffect(() => {
    setProgress(0);
    const startTime = performance.now();

    const rafId = requestAnimationFrame(function tick(now) {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    });

    const timerId = setTimeout(() => {
      setCurrentSlide((s) => (s + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [currentSlide]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[750px] flex-col overflow-hidden bg-[#EDEDED] p-4 font-sans lg:p-6"
    >
      {/* Inner Dark Container */}
      <div className="relative w-full flex-1 overflow-hidden rounded-[32px] bg-[#0A0A0A]">

        {/* Background Slides */}
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: i === currentSlide ? 0.6 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-[#0A0A0A]/60" />

        {/* Main Content (Center) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 lg:px-24">
          <div className="max-w-[800px]">
            <h1
              className={cn(
                "font-[family-name:var(--font-display)] text-white",
                "text-[clamp(3rem,7vw+1rem,6.5rem)] font-medium leading-[1.05] tracking-[-0.03em]"
              )}
            >
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Sicherheit.</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Sauberkeit.</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Bewegung.</div></div>
            </h1>

            <div className="hero-video mt-10 flex items-center gap-5 opacity-0">
              <button className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-black">
                <Play className="ml-1 h-5 w-5 fill-current" />
              </button>
              <span className="font-mono text-sm uppercase tracking-widest text-white">
                Video ansehen
              </span>
            </div>
          </div>
        </div>

        {/* Right Vertical Progress (Desktop Only) */}
        <div
          className="hero-progress absolute right-10 top-2/5 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 opacity-0 lg:flex"
        >
          <span className="font-mono text-xs text-white/50">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          {/* Progress bar track */}
          <div className="relative h-32 w-px bg-white/20">
            <div
              className="absolute left-0 top-0 w-full bg-white transition-none"
              style={{ height: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-white/50">
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom Right Card (Visible on Desktop) */}
        <div
          className="hero-card-br absolute bottom-8 right-8 z-10 hidden w-[340px] rounded-[24px] border border-white/10 bg-white/5 p-6 opacity-0 backdrop-blur-md lg:block"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-white/50">
            Dresden, Sachsen
          </p>
          <p className="text-sm leading-relaxed text-white/80">
            Drei Geschäftsbereiche, ein Qualitätsanspruch. Verlässlich, diskret und präzise — seit{" "}
            {siteConfig.brand.foundedYear} in Dresden.
          </p>
          <div className="mt-6">
            <Link
              href="/kontakt"
              className="inline-flex w-full justify-center rounded-full border border-white/20 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Leistungen entdecken
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          WHITE OVERLAYS (DESKTOP ONLY)
          ============================================================ */}

      {/* Top-Left Panel (Logo + Nav) */}
      <div className="hero-panel-tl absolute left-6 top-6 z-50 hidden items-center gap-8 rounded-br-[32px] bg-[#EDEDED] pb-5 pr-6 opacity-0 lg:flex">
        <Corner className="-right-8 top-0 rotate-180" />
        <Corner className="-bottom-8 left-0 rotate-180" />

        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src="/images/screen4.png"
            alt="TS Service Group Logo"
            width={200}
            height={60}
            priority
            className="h-14 w-auto rounded-xl object-contain"
          />
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium text-[#0A0A0A]">
          <Link
            href="/"
            className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Startseite
          </Link>
          <Link href="/leistungen" className="text-black/60 transition-colors hover:text-black">
            Leistungen
          </Link>
          <Link href="/ueber-uns" className="text-black/60 transition-colors hover:text-black">
            Über uns
          </Link>
          <Link href="/referenzen" className="text-black/60 transition-colors hover:text-black">
            Referenzen
          </Link>
        </nav>
      </div>

      {/* Top-Right Panel (Socials + CTA) */}
      <div className="hero-panel-tr absolute right-6 top-6 z-50 hidden items-center gap-6 rounded-bl-[32px] bg-[#EDEDED] pb-5 pl-6 opacity-0 lg:flex">
        {/* Left concave corner — sits at the outer-left edge of this panel */}
        <Corner className="-left-8 top-0 -rotate-90" />
        {/* Bottom concave corner — sits at the bottom-right */}
        <Corner className="-bottom-8 right-0 -rotate-90" />

        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black">
          <a
            href={siteConfig.social.instagram || "#"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
          >
            Ig
          </a>
          <a
            href={siteConfig.social.linkedin || "#"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
          >
            X
          </a>
          <a
            href={siteConfig.social.facebook || "#"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
          >
            Fb
          </a>
        </div>

        <Link
          href="/kontakt"
          className="flex h-12 items-center gap-3 rounded-full bg-[#0A0A0A] pl-6 pr-2 text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          Anfragen
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      {/* Bottom-Left Panel (Stats) — pill inside a cornered white panel */}
      <div className="hero-panel-bl absolute bottom-6 left-6 z-50 hidden items-center rounded-tr-[32px] bg-[#EDEDED] pb-0 pl-0 pr-4 pt-4 opacity-0 lg:flex">
        <Corner className="-top-8 left-0 rotate-90" />
        <Corner className="-right-8 bottom-0 rotate-90" />

        {/* Pill card */}
        <div className="flex items-center overflow-hidden rounded-full shadow-sm ring-1 ring-black/10">
          {/* Stat item */}
          <div className="flex flex-col px-7 py-4">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#0A0A0A]">
              24/7
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Erreichbar
            </span>
          </div>
          <div className="h-10 w-px bg-black/10" />
          <div className="flex flex-col px-7 py-4">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#0A0A0A]">
              3
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Bereiche
            </span>
          </div>
          <div className="h-10 w-px bg-black/10" />
          <div className="flex flex-col px-7 py-4">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#0A0A0A]">
              100%
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Verlässlich
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
