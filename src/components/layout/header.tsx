"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bg/80 backdrop-blur-xl"
            : "bg-transparent",
          isHome && "max-lg:flex lg:hidden" // Show on mobile, hide on desktop where Hero has custom panels
        )}
      >
        <div className="mx-auto flex h-28 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="group transition-transform duration-300 hover:scale-105"
            aria-label="TS Service Group — Startseite"
          >
            <Image 
              src="/images/logo-white.png" 
              alt="TS Service Group" 
              width={480} 
              height={120} 
              priority 
              className="h-24 w-auto rounded-xl object-contain transition-opacity duration-300" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Hauptnavigation"
          >
            {NAV_ITEMS.filter((item) => item.label !== "Kontakt").map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    "text-text-muted hover:text-text",
                    "hover:bg-elevated"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Link
              href="/kontakt"
              className={cn(
                "group relative hidden rounded-full px-6 py-2.5 text-sm font-medium lg:inline-flex overflow-hidden items-center justify-center",
                "border border-border-hover text-text"
              )}
            >
              <div className="absolute inset-0 bg-text translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
              <span className="relative z-10 group-hover:text-bg transition-colors duration-500">
                Kontakt
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-px w-6 bg-text transition-all duration-300",
                    mobileOpen && "translate-y-[3.5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-6 bg-text transition-all duration-300",
                    mobileOpen && "translate-y-[-3.5px] -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Hairline */}
        <div
          className={cn(
            "h-px w-full transition-opacity duration-500",
            scrolled
              ? "bg-border opacity-100"
              : "opacity-0"
          )}
        />
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
