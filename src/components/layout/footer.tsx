"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { NAV_ITEMS, FOOTER_NAV } from "@/content/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply the shift animation on desktop devices
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: -150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top bottom", // when top of spacer enters bottom of screen
            end: "bottom bottom", // when bottom of spacer reaches bottom of screen
            scrub: true,
          },
        }
      );
    }, spacerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative md:fixed md:bottom-0 md:left-0 md:w-full z-0 bg-metallic-light text-bg border-t border-black/10 overflow-hidden"
      >
        {/* Inner wrapper for parallax translation */}
        <div ref={innerRef} className="w-full h-full will-change-transform">
          
          {/* Upper Footer: 4-Column Responsive Grid */}
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-12">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              
              {/* Column 1: Brand & Identity */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  {/* Logo / Title */}
                  <Link href="/" className="inline-block group">
                    <span className="font-display text-2xl font-bold tracking-tight text-bg group-hover:text-bg/80 transition-colors duration-300">
                      TS SERVICE GROUP
                    </span>
                    <span className="block mt-1 font-mono text-[10px] tracking-[0.2em] text-bg/50 uppercase">
                      Sicherheit. Sauberkeit. Bewegung.
                    </span>
                  </Link>
                  <p className="mt-6 text-sm leading-relaxed text-bg/70 max-w-xs">
                    {siteConfig.brand.shortDescription}
                  </p>
                </div>
                
                <div className="font-mono text-xs text-bg/40">
                  © {currentYear} {siteConfig.brand.legalName}.<br />
                  Alle Rechte vorbehalten.
                </div>
              </div>

              {/* Column 2: Primary Services */}
              <div>
                <span className="block font-display text-xs font-semibold uppercase tracking-wider text-bg/80">
                  Dienstleistungen
                </span>
                <ul className="mt-6 space-y-4 text-sm font-sans">
                  {siteConfig.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/leistungen/${service.slug}`}
                        className="text-bg/70 hover:text-bg transition-colors duration-300 flex items-center group"
                      >
                        <span>{service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-bg" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Sitemaps */}
              <div>
                <span className="block font-display text-xs font-semibold uppercase tracking-wider text-bg/80">
                  Unternehmen
                </span>
                <ul className="mt-6 space-y-4 text-sm font-sans">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-bg/70 hover:text-bg transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Main Contact Information */}
              <div>
                <span className="block font-display text-xs font-semibold uppercase tracking-wider text-bg/80">
                  Kontakt Dresden
                </span>
                <div className="mt-6 space-y-4 text-sm font-sans text-bg/70">
                  <p className="leading-relaxed">
                    {siteConfig.contact.address.street}<br />
                    {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
                  </p>
                  
                  <div className="pt-2 space-y-3">
                    <div>
                      <span className="block font-mono text-[10px] text-bg/40 uppercase tracking-wider">E-Mail</span>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="block mt-1 text-bg hover:text-bg/70 transition-colors font-medium"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                    
                    <div>
                      <span className="block font-mono text-[10px] text-bg/40 uppercase tracking-wider">Anfragen</span>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="block mt-1 text-bg hover:text-bg/70 transition-colors font-medium"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Legal Pages Secondary Nav */}
                  <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
                    {FOOTER_NAV.map((legalItem) => (
                      <Link
                        key={legalItem.href}
                        href={legalItem.href}
                        className="text-bg/40 hover:text-bg transition-colors duration-300 underline underline-offset-4 decoration-black/10 hover:decoration-bg"
                      >
                        {legalItem.label}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Giant Branding Display Typography Backdrop */}
          <div className="relative select-none pointer-events-none mt-8 border-t border-black/5">
            <div 
              className={cn(
                "w-full text-center font-display font-black text-bg/[0.03] uppercase leading-none tracking-tighter whitespace-nowrap overflow-hidden py-4",
                "text-[12vw] lg:text-[14vw]"
              )}
            >
              TS Service Group
            </div>
          </div>

        </div>
      </footer>
      {/* Spacer to reserve the height in normal document flow on desktop */}
      <div 
        ref={spacerRef} 
        className="hidden md:block h-[580px] lg:h-[480px] bg-transparent pointer-events-none" 
      />
    </>
  );
}
