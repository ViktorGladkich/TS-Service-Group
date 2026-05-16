"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { NAV_ITEMS, FOOTER_NAV } from "@/content/navigation";
import { ArrowUpRight, ArrowUp, Mail, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Concave-corner SVG — mirrors the language used in the hero panels.
 * Carves a quarter-circle out of the corner of a surface.
 */
const Corner = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute h-6 w-6 fill-current text-bg", className)}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M40 40V0C40 22.0914 22.0914 40 0 40H40Z" />
  </svg>
);

/**
 * Marquee ribbon. Pure CSS animation via inline keyframes,
 * so we don't depend on the Tailwind animation plugin.
 */
const TICKER_TOKENS = [
  "Sicherheit",
  "·",
  "Sauberkeit",
  "·",
  "Bewegung",
  "·",
  "Dresden",
  "·",
  "Sachsen",
  "·",
  "§34a GewO",
  "·",
  "Seit 2026",
  "·",
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const spacerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Live Dresden clock — refreshes every second
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Berlin",
      });
      setTime(fmt.format(now));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Decide if Dresden office is currently open (Mo–Fr 08–18, Sa 09–14)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const local = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
      );
      const day = local.getDay(); // 0 = Sun
      const hour = local.getHours() + local.getMinutes() / 60;
      if (day >= 1 && day <= 5) setIsOpen(hour >= 8 && hour < 18);
      else if (day === 6) setIsOpen(hour >= 9 && hour < 14);
      else setIsOpen(false);
    };
    check();
    const id = window.setInterval(check, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Parallax reveal: inner shifts up as spacer scrolls into view
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: -180 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Stagger reveal of inner blocks once the footer comes into view
      gsap.fromTo(
        ".footer-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, spacerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <>
      <footer
        ref={revealRef}
        className="relative md:fixed md:bottom-0 md:left-0 md:w-full z-0 bg-metallic-light text-bg overflow-hidden"
      >
        {/* Top metallic hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />

        <div ref={innerRef} className="w-full will-change-transform">
          {/* ============================================================
              1. KINETIC STATEMENT
              ============================================================ */}
          <div className="footer-reveal relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 lg:px-12 lg:pt-28">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/50">
                  [ Lassen Sie uns reden ]
                </p>
                <h2 className="mt-6 font-display text-bg leading-[0.92] tracking-[-0.04em] text-[clamp(3.5rem,9vw+1rem,9rem)] font-medium">
                  Bereit,
                  <br />
                  <span className="italic font-normal">wenn Sie es sind.</span>
                </h2>
              </div>

              <Link
                href="/kontakt"
                className="group relative inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-bg pl-8 pr-2 py-2 text-white lg:self-end"
              >
                <span className="absolute inset-0 rounded-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.25em] py-3 group-hover:text-bg transition-colors duration-500">
                  Briefing starten
                </span>
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-bg group-hover:bg-bg group-hover:text-white transition-colors duration-500">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            </div>
          </div>

          {/* ============================================================
              2. TICKER RIBBON
              ============================================================ */}
          <div className="footer-reveal relative border-y border-bg/10 bg-metallic-light overflow-hidden">
            <div className="flex whitespace-nowrap py-5 animate-[footer-marquee_38s_linear_infinite]">
              {[...Array(4)].map((_, group) => (
                <div key={group} className="flex shrink-0 items-center">
                  {TICKER_TOKENS.map((token, i) => (
                    <span
                      key={`${group}-${i}`}
                      className={cn(
                        "px-6 font-display text-2xl md:text-3xl uppercase tracking-tight",
                        token === "·" ? "text-bg/30" : "text-bg/80"
                      )}
                    >
                      {token}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              3. CONTACT + GRID
              ============================================================ */}
          <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              {/* ---- Direct contact (5 cols) ---- */}
              <div className="footer-reveal lg:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/50">
                  [ Direkter Draht ]
                </p>

                <div className="mt-8 divide-y divide-bg/10 border-y border-bg/10">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center justify-between py-5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Mail className="h-4 w-4 text-bg/40 group-hover:text-bg transition-colors" />
                      <span className="font-display text-xl md:text-2xl text-bg/80 group-hover:text-bg transition-colors">
                        {siteConfig.contact.email}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-bg/40 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-bg transition-all duration-300" />
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="group flex items-center justify-between py-5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Phone className="h-4 w-4 text-bg/40 group-hover:text-bg transition-colors" />
                      <span className="font-display text-xl md:text-2xl text-bg/80 group-hover:text-bg transition-colors">
                        {siteConfig.contact.phoneDisplay}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-bg/40 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-bg transition-all duration-300" />
                  </a>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <MessageCircle className="h-4 w-4 text-bg/40 group-hover:text-bg transition-colors" />
                      <span className="font-display text-xl md:text-2xl text-bg/80 group-hover:text-bg transition-colors">
                        WhatsApp · 24/7 Notdienst
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-bg/40 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-bg transition-all duration-300" />
                  </a>
                </div>

                {/* Live status card */}
                <div className="relative mt-10 rounded-3xl bg-bg p-7 text-white overflow-hidden">
                  <Corner className="-bottom-6 -right-6 rotate-180 text-metallic-light" />

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        [ Standort Dresden ]
                      </p>
                      <p className="mt-3 font-display text-lg leading-snug text-white">
                        {siteConfig.contact.address.street}
                        <br />
                        {siteConfig.contact.address.postalCode}{" "}
                        {siteConfig.contact.address.city}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                        {siteConfig.contact.geo.latitude.toFixed(4)}° N ·{" "}
                        {siteConfig.contact.geo.longitude.toFixed(4)}° E
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span
                            className={cn(
                              "absolute inline-flex h-full w-full rounded-full opacity-75",
                              isOpen ? "bg-green-400 animate-ping" : "bg-white/30"
                            )}
                          />
                          <span
                            className={cn(
                              "relative inline-flex h-2 w-2 rounded-full",
                              isOpen ? "bg-green-400" : "bg-white/40"
                            )}
                          />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                          {isOpen ? "Geöffnet" : "Geschlossen"}
                        </span>
                      </div>
                      <div className="font-mono text-base tabular-nums text-white tracking-wider">
                        {time}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                        MEZ · Europe/Berlin
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---- Links grid (7 cols) ---- */}
              <div className="footer-reveal grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
                {/* Leistungen */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/50">
                    [ Leistungen ]
                  </p>
                  <ul className="mt-8 space-y-4">
                    {siteConfig.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/leistungen/${service.slug}`}
                          className="group inline-flex items-baseline gap-2 text-bg/70 hover:text-bg transition-colors"
                        >
                          <span className="font-mono text-[10px] text-bg/30 tabular-nums">
                            {service.number}
                          </span>
                          <span className="font-display text-lg relative">
                            {service.title}
                            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unternehmen */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/50">
                    [ Unternehmen ]
                  </p>
                  <ul className="mt-8 space-y-4">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-baseline gap-2 text-bg/70 hover:text-bg transition-colors"
                        >
                          <span className="font-display text-lg relative">
                            {item.label}
                            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rechtliches + sozial */}
                <div className="col-span-2 lg:col-span-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bg/50">
                    [ Rechtliches ]
                  </p>
                  <ul className="mt-8 space-y-4">
                    {FOOTER_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-baseline gap-2 text-bg/70 hover:text-bg transition-colors"
                        >
                          <span className="font-display text-lg relative">
                            {item.label}
                            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Credentials chip */}
                  <div className="mt-10 inline-flex flex-col gap-2 rounded-2xl border border-bg/10 px-5 py-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bg/40">
                      Zugelassen
                    </span>
                    <span className="font-display text-sm text-bg">
                      §34a GewO · Allianz Haftpflicht
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              4. WORDMARK + META BAR
              ============================================================ */}
          <div className="footer-reveal relative border-t border-bg/10">
            {/* Giant outlined wordmark */}
            <div className="relative select-none pointer-events-none overflow-hidden">
              <div
                className={cn(
                  "w-full text-center font-display font-medium uppercase leading-[0.85] tracking-[-0.04em] whitespace-nowrap py-6 lg:py-10",
                  "text-[18vw]"
                )}
                style={{
                  WebkitTextStroke: "1px rgba(10,10,10,0.25)",
                  color: "transparent",
                }}
              >
                TS·SERVICE·GROUP
              </div>
            </div>

            {/* Meta bar */}
            <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bg/50">
                <span>© {currentYear} {siteConfig.brand.legalName}</span>
                <span className="hidden sm:inline text-bg/20">/</span>
                <span>Inhaber {siteConfig.brand.owner}</span>
                <span className="hidden sm:inline text-bg/20">/</span>
                <span>Alle Rechte vorbehalten</span>
              </div>

              <button
                type="button"
                onClick={handleScrollTop}
                className="group inline-flex items-center gap-3 self-start rounded-full border border-bg/15 px-4 py-2 hover:border-bg transition-colors lg:self-auto"
                aria-label="Nach oben scrollen"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bg/60 group-hover:text-bg transition-colors">
                  Zurück nach oben
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg text-white group-hover:bg-white group-hover:text-bg group-hover:border group-hover:border-bg transition-colors">
                  <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

      </footer>

      {/* Spacer reserves space in document flow so fixed footer reveals via parallax */}
      <div
        ref={spacerRef}
        className="hidden md:block h-[920px] lg:h-[860px] bg-transparent pointer-events-none"
        aria-hidden
      />
    </>
  );
}
