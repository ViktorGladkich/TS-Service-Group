"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";
import gsap from "gsap";

const Corner = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute h-8 w-8 fill-current text-metallic-light", className)}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" />
  </svg>
);

const SLIDES = [
  { src: "/images/hero-01.jpg", alt: "Professioneller Sicherheitsdienst – modernes Gebäude Dresden", objectPosition: "75% center" },
  { src: "/images/hero-02.jpg", alt: "Umzugservice – sorgfältig geplanter Privatumzug", objectPosition: "60% center" },
  { src: "/images/hero-03.jpg", alt: "Gebäudereinigung – makellose Büroflächen Dresden", objectPosition: "62% center" },
];
const SLIDE_DURATION = 5000; // ms
const SHOWREEL_SRC = "/videos/hero-showreel-opt.mp4";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Only the first slide is mounted on load — it's the LCP candidate. Slides
  // 2 & 3 are mounted just before they're needed so they don't compete for
  // bandwidth during the critical initial render.
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));
  const [progress, setProgress] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Entrance animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroDelay = 0.1;
      const tl = gsap.timeline({ delay: heroDelay });

      // 1. Reveal inner dark container
      tl.fromTo(sectionRef.current,
        { scale: 0.96, borderRadius: "64px" },
        { scale: 1, borderRadius: "0px", duration: 1.1, ease: "power3.inOut" }
      );

      // 2. Main title text - split lines staggering up
      tl.fromTo(".hero-title-line",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" },
        "-=0.7"
      );

      // 3. White layout panels sliding from corners (run in parallel)
      tl.to(".hero-panel-tl", { opacity: 1, duration: 0.05 }, "-=0.8")
        .fromTo(".hero-panel-tl", { y: -50 }, { y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")

        .to(".hero-panel-tc", { opacity: 1, duration: 0.05 }, "-=0.8")
        .fromTo(".hero-panel-tc", { y: -50 }, { y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")

        .to(".hero-panel-tr", { opacity: 1, duration: 0.05 }, "-=0.75")
        .fromTo(".hero-panel-tr", { y: -50 }, { y: 0, duration: 0.8, ease: "power3.out" }, "-=0.75")

        .to(".hero-panel-bl", { opacity: 1, duration: 0.05 }, "-=0.75")
        .fromTo(".hero-panel-bl", { x: -50 }, { x: 0, duration: 0.8, ease: "power3.out" }, "-=0.75");

      // 4. Secondary floating elements fade & slide in (overlap heavily)
      tl.to(".hero-video", { opacity: 1, duration: 0.05 }, "-=0.7")
        .fromTo(".hero-video", { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, "-=0.7")

        .to(".hero-progress", { opacity: 1, duration: 0.05 }, "-=0.7")
        .fromTo(".hero-progress", { x: 30 }, { x: 0, duration: 0.7, ease: "power3.out" }, "-=0.7")

        .to(".hero-card-br", { opacity: 1, duration: 0.05 }, "-=0.7")
        .fromTo(".hero-card-br", { y: 30 }, { y: 0, duration: 0.7, ease: "power3.out" }, "-=0.7");

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

    // Mount the upcoming slide ~1.2s before the transition so its image is
    // decoded and ready, without eagerly loading it at initial paint.
    const next = (currentSlide + 1) % SLIDES.length;
    const preloadId = setTimeout(() => {
      setLoadedSlides((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
    }, SLIDE_DURATION - 1200);

    const timerId = setTimeout(() => {
      setCurrentSlide((s) => (s + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(preloadId);
      clearTimeout(timerId);
    };
  }, [currentSlide]);

  // Video modal: ESC to close, lock body scroll, autoplay on open
  useEffect(() => {
    if (!videoOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Best-effort autoplay
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }

    const currentVideo = videoRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (currentVideo) currentVideo.pause();
    };
  }, [videoOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh min-h-[580px] flex-col overflow-hidden bg-metallic-light font-sans lg:min-h-0 lg:p-4 xl:p-6"
    >
      {/* Inner Dark Container — full-bleed on mobile, framed on desktop */}
      <div className="relative w-full flex-1 overflow-hidden bg-bg lg:rounded-[32px]">

        {/* Background Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 0.6 : 0 }}
          >
            {loadedSlides.has(i) && (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                // Only the first slide is the LCP candidate and gets priority.
                // Slides 2 & 3 are mounted lazily (see loadedSlides) shortly
                // before they animate in, so they never compete for bandwidth
                // during the critical initial render.
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.objectPosition }}
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-black/40 to-bg/60" />

        {/* Main Content (Center) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 lg:px-20 xl:px-24 pb-4 lg:pb-14 xl:pb-18">
          <div className="max-w-[800px]">
            <h1
              className={cn(
                "font-display text-white",
                "text-[clamp(2.5rem,5.5vw+1.5vh,5rem)] xl:text-[clamp(3.5rem,7vw+1rem,6.5rem)] font-medium leading-[1.05] tracking-[-0.03em]"
              )}
            >
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Sicherheit.</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Sauberkeit.</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Bewegung.</div></div>
            </h1>

            <Link
              href="/kontakt"
              className="hero-video group mt-5 xl:mt-8 relative inline-flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-2 text-sm font-medium text-bg overflow-hidden border border-white/10 opacity-0 pointer-events-auto shadow-md"
            >
              <span className="pointer-events-none absolute inset-0 translate-y-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Jetzt kontaktieren
              </span>
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-bg text-white group-hover:bg-white group-hover:text-bg transition-colors duration-500">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Vertical Progress (Desktop Only) */}
        <div
          className="hero-progress absolute right-6 top-1/2 xl:right-10 xl:top-2/5 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 opacity-0 lg:flex"
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
          className="hero-card-br absolute bottom-6 right-6 xl:bottom-8 xl:right-8 z-10 hidden w-[320px] xl:w-[360px] rounded-[2.5rem] border border-white/20 bg-white/10 p-6 xl:p-8 opacity-0 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] lg:block pointer-events-auto"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-metallic-light font-medium">
            [ Dresden, Sachsen ]
          </p>
          <p className="text-sm leading-relaxed text-white/80">
            Drei Geschäftsbereiche, ein Qualitätsanspruch. Verlässlich, diskret und präzise — seit{" "}
            {siteConfig.brand.foundedYear} in Dresden.
          </p>
          <div className="mt-6 pt-1">
            <Link
              href="/kontakt"
              className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-full border border-black/20 bg-metallic-light font-mono text-xs font-medium uppercase tracking-wider text-bg shadow-lg transition-colors duration-500 hover:text-white"
            >
              <span className="pointer-events-none absolute inset-0 translate-y-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
              <span className="relative z-10">Leistungen entdecken</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          WHITE OVERLAYS (DESKTOP ONLY)
          ============================================================ */}

      {/* Top-Left Panel (Nav) */}
      <div className="hero-panel-tl absolute left-4 top-4 xl:left-6 xl:top-6 z-50 hidden items-center gap-8 rounded-br-[32px] bg-metallic-light pb-5 pr-8 pl-8 pt-5 opacity-0 lg:flex">
        <Corner className="-right-8 top-0 rotate-180" />
        <Corner className="-bottom-8 left-0 rotate-180" />

        <nav className="flex items-center gap-8 text-sm font-medium text-bg">
          <Link
            href="/"
            className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Startseite
          </Link>
          <Link
            href="/leistungen"
            className="relative text-black/60 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Leistungen
          </Link>
          <Link
            href="/ueber-uns"
            className="relative text-black/60 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Über uns
          </Link>
          <Link
            href="/kontakt"
            className="relative text-black/60 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Kontakt
          </Link>
        </nav>
      </div>

      {/* Top-Center Logo (Clean, transparent, no white box) */}
      <div className="hero-panel-tc absolute left-1/2 top-6 xl:top-8 z-50 hidden -translate-x-1/2 items-center justify-center opacity-0 lg:flex pointer-events-auto">
        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src="/images/logo-white.png"
            alt="TS Service Group Logo"
            width={320}
            height={80}
            priority
            className="h-8 md:h-10 xl:h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Top-Right Panel (Socials + CTA) */}
      <div className="hero-panel-tr absolute right-4 top-4 xl:right-6 xl:top-6 z-50 hidden items-center gap-3 rounded-bl-[32px] bg-metallic-light pb-5 pl-6 opacity-0 lg:flex">
        {/* Left concave corner — sits at the outer-left edge of this panel */}
        <Corner className="-left-8 top-0 -rotate-90" />
        {/* Bottom concave corner — sits at the bottom-right */}
        <Corner className="-bottom-8 right-0 -rotate-90" />

        <a
          href={`tel:${siteConfig.contact.phone}`}
          aria-label="Telefonisch kontaktieren"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-bg text-white overflow-hidden border border-white/10 pointer-events-auto transition-transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
          <Phone className="relative z-10 h-4 w-4 text-white group-hover:text-bg transition-colors duration-500" />
        </a>

        <Link
          href="/kontakt"
          className="group relative flex h-12 items-center gap-3 rounded-full bg-bg pl-6 pr-2 text-sm font-medium text-white overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
          
          <span className="relative z-10 group-hover:text-bg transition-colors duration-500">
            Anfragen
          </span>
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black group-hover:bg-bg group-hover:text-white transition-colors duration-500">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </div>
        </Link>
      </div>

      {/* Bottom-Left Panel (Stats) — pill inside a cornered white panel */}
      <div className="hero-panel-bl absolute bottom-4 left-4 xl:bottom-6 xl:left-6 z-50 hidden items-center rounded-tr-[32px] bg-metallic-light pb-0 pl-0 pr-4 pt-4 opacity-0 lg:flex">
        <Corner className="-top-8 left-0 rotate-90" />
        <Corner className="-right-8 bottom-0 rotate-90" />

        {/* Pill card */}
        <div className="flex items-center overflow-hidden rounded-full shadow-sm ring-1 ring-black/10">
          {/* Stat item */}
          <div className="flex flex-col px-7 py-4">
            <span className="font-display text-2xl font-semibold text-bg">
              24/7
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Erreichbar
            </span>
          </div>
          <div className="h-10 w-px bg-black/10" />
          <div className="flex flex-col px-7 py-4">
            <span className="font-display text-2xl font-semibold text-bg">
              3
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Bereiche
            </span>
          </div>
          <div className="h-10 w-px bg-black/10" />
          <div className="flex flex-col px-7 py-4">
            <span className="font-display text-2xl font-semibold text-bg">
              100%
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-black/40">
              Verlässlich
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          VIDEO LIGHTBOX MODAL
          ============================================================ */}
      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          className="hero-modal-backdrop fixed inset-0 z-100 flex items-center justify-center bg-black/85 px-4 py-10 backdrop-blur-xl sm:px-8 lg:px-16"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel Video"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Video schließen"
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black lg:right-8 lg:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="hero-modal-frame relative w-full max-w-[1400px] overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              ref={videoRef}
              src={SHOWREEL_SRC}
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 lg:text-xs">
            ESC zum Schließen
          </p>
        </div>
      )}
    </section>
  );
}
