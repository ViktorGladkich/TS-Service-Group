"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const threshold = window.innerHeight * 0.7;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastHero(y > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile sheet on every route change — the Header is persistent
  // across navigations, so the open state would otherwise survive a click on
  // a nav link.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Desktop pill: on the home page, suppress until the user has scrolled
  // past the hero (which has its own embedded navigation). On every other
  // page, show from the start.
  const desktopVisible = !isHome || pastHero;

  return (
    <>
      {/* ============================================================
          MOBILE HEADER — hamburger + logo, all pages
          ============================================================ */}
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 flex transition-all duration-500 lg:hidden",
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6">
          <Link href="/" aria-label="TS Service Group — Startseite">
            <Image
              src="/images/logo-white.png"
              alt="TS Service Group"
              width={200}
              height={50}
              priority
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg"
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
      </header>

      {/* ============================================================
          DESKTOP FLOATING GLASS PILL
          ============================================================ */}
      <div
        className={cn(
          "fixed top-5 left-1/2 z-50 hidden -translate-x-1/2 lg:block",
          "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
          desktopVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-[-160%] opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-1 rounded-full bg-bg/70 pl-2 pr-2 py-2 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Brand chip */}
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-1 transition-opacity hover:opacity-80"
            aria-label="TS Service Group — Startseite"
          >
            <Image
              src="/images/logo-white.png"
              alt="TS Service Group"
              width={120}
              height={30}
              priority
              className="h-6 lg:h-7 w-auto object-contain"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 px-1" aria-label="Hauptnavigation">
            {NAV_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                pathname === item.href ||
                (hasChildren && pathname.startsWith(item.href));

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>

                  {hasChildren && (
                    <div
                      className={cn(
                        "absolute left-0 top-full pt-3",
                        "pointer-events-none -translate-y-2 opacity-0",
                        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                        "transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      )}
                    >
                      <div className="flex min-w-[260px] flex-col gap-0.5 rounded-2xl border border-white/10 bg-bg/90 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                        <span className="px-3 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
                          [ Bereiche ]
                        </span>
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/child flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <span>{child.label}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/child:translate-x-0 group-hover/child:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/kontakt"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white bg-white py-1 pl-4 pr-1 text-xs font-medium text-bg"
          >
            <span className="pointer-events-none absolute inset-0 translate-y-full bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              Anfragen
            </span>
            <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg text-white transition-colors duration-500 group-hover:bg-white group-hover:text-bg">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile slide-out nav */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
