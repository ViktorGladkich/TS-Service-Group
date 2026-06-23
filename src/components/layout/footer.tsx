"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { NAV_ITEMS, FOOTER_NAV } from "@/content/navigation";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const revealRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, revealRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={revealRef}
      className="relative z-0 w-full bg-white text-bg overflow-hidden rounded-t-4xl lg:rounded-t-[4rem] mt-2 border-t border-black/10"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-12">
        {/* ============================================================
            1. CALL TO ACTION
            ============================================================ */}
        <div className="footer-reveal pt-16 pb-12 lg:pt-32 lg:pb-24 border-b border-black/10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(3rem,11vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-bg">
              Bereit für <br className="hidden md:block" />
              <span className="text-black/40 italic font-normal">Exzellenz?</span>
            </h2>
          </div>

          <Link
            href="/kontakt"
            className="group relative inline-flex h-12 shrink-0 items-center gap-3 self-start overflow-hidden rounded-full bg-bg pl-6 pr-2 text-white lg:self-end border border-black/10"
          >
            <span className="pointer-events-none absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
            <span className="relative z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-bg">
              Projekt starten
            </span>
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-bg transition-colors duration-500 group-hover:bg-black/10">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </Link>
        </div>

        {/* ============================================================
            2. GRID: CONTACT & LINKS
            ============================================================ */}
        <div className="footer-reveal py-12 lg:py-24 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 border-b border-black/10 lg:border-none">
          
          {/* ---- Left: Contact Info ---- */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col gap-3">
              <span className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2">Direktkontakt</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group w-fit flex items-center gap-3 font-display text-xl sm:text-2xl lg:text-3xl text-bg hover:text-black/60 transition-colors"
              >
                {siteConfig.contact.email}
                <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black/60" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group w-fit flex items-center gap-3 font-display text-xl sm:text-2xl lg:text-3xl text-bg hover:text-black/60 transition-colors"
              >
                {siteConfig.contact.phoneDisplay}
                <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black/60" />
              </a>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-3 pt-6 lg:hidden">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">Navigation</span>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-mono uppercase tracking-[0.2em] text-black/60">
                <Link href="/ueber-uns" className="hover:text-bg transition-colors">Über uns</Link>
                <Link href="/kontakt" className="hover:text-bg transition-colors">Kontakt</Link>
                <Link href="/leistungen" className="hover:text-bg transition-colors">Leistungen</Link>
                <Link href="/datenschutz" className="hover:text-bg transition-colors">Datenschutz</Link>
                <Link href="/impressum" className="hover:text-bg transition-colors">Impressum</Link>
              </div>
            </div>
          </div>

          {/* ---- Right: Navigation (Desktop only) ---- */}
          <div className="hidden lg:grid lg:col-span-6 lg:col-start-7 grid-cols-3 gap-10">
            {/* Leistungen */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">Leistungen</span>
              <ul className="flex flex-col gap-4">
                {siteConfig.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/leistungen/${service.slug}`}
                      className="group relative inline-flex items-center gap-2 text-black/60 hover:text-bg transition-colors font-display text-xl"
                    >
                      <span>{service.title}</span>
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">Unternehmen</span>
              <ul className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative inline-flex items-center gap-2 text-black/60 hover:text-bg transition-colors font-display text-xl"
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">Rechtliches</span>
              <ul className="flex flex-col gap-4">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative inline-flex items-center gap-2 text-black/60 hover:text-bg transition-colors font-display text-xl"
                    >
                      <span>{item.label}</span>
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          3. BIG TEXT & META BAR
          ============================================================ */}
      <div className="footer-reveal border-t-0 lg:border-t border-black/10">
        {/* Giant wordmark */}
        <div className="relative overflow-hidden flex justify-center w-full px-5 py-8 lg:px-6 lg:py-12 select-none pointer-events-none border-b border-black/10">
          <div
            className="w-full text-center font-display font-medium uppercase leading-[0.8] tracking-[-0.03em] whitespace-nowrap text-bg"
            style={{ fontSize: "clamp(3.5rem, 12vw, 15rem)" }}
          >
            TS SERVICE
          </div>
        </div>

        {/* COMPACT BOTTOM META BAR (Like screenshot on mobile) */}
        <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-12 py-6 lg:border-t lg:border-black/10">
          
          {/* Mobile minimal layout */}
          <div className="flex flex-col gap-4 lg:hidden">
            <div className="h-px flex-1 bg-black/10 lg:hidden" />
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/40">
              ©{currentYear} {siteConfig.brand.legalName}
            </div>
          </div>

          {/* Desktop expanded layout */}
          <div className="hidden lg:flex flex-row items-center justify-between">
            <div className="flex flex-wrap items-center gap-x-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">
              <span>© {currentYear} {siteConfig.brand.legalName}</span>
              <span>/</span>
              <span>Alle Rechte vorbehalten</span>
              <span>/</span>
              <span>
                Design by{" "}
                <a
                  href="https://invertadigital.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bg hover:text-black/60 transition-colors underline underline-offset-4 decoration-black/10 hover:decoration-black/40"
                >
                  INVERTA
                </a>
              </span>
            </div>

            <button
              type="button"
              onClick={handleScrollTop}
              className="group flex cursor-pointer items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60 hover:text-bg transition-colors"
              aria-label="Nach oben scrollen"
            >
              Zurück nach oben
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 group-hover:border-black/40 transition-colors bg-white">
                <ArrowUp className="h-3 w-3" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
