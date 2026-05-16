"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Phone, Mail, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/content/navigation";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open + ESC closes; reset expansion on close
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      setExpandedItem(null);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-bg lg:hidden",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      inert={!isOpen}
    >
      {/* Top metallic hairline + ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic-light/40 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: METALLIC_GRADIENT }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: METALLIC_GRADIENT }}
      />

      {/* HEADER strip — eyebrow / time-stamp / brand mark */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-6 pt-24 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          [ Menü · TS Service Group ]
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-subtle">
          Dresden
        </span>
      </div>

      {/* PRIMARY NAVIGATION */}
      <nav
        aria-label="Hauptnavigation"
        className="relative flex-1 overflow-y-auto px-6 pt-4 pb-6"
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item, i) => {
            const hasChildren = !!item.children?.length;
            const isExpanded = expandedItem === item.href;
            const isActive =
              pathname === item.href ||
              (hasChildren && pathname.startsWith(item.href));

            return (
              <li
                key={item.href}
                className={cn(
                  "border-b border-white/[0.06] transition-all duration-500",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${120 + i * 70}ms` : "0ms",
                }}
              >
                <div className="flex items-stretch">
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (!hasChildren) onClose();
                    }}
                    className="group flex flex-1 items-baseline gap-5 py-5"
                  >
                    <span
                      className="w-7 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle tabular-nums"
                    >
                      0{i + 1}
                    </span>

                    <span className="flex-1 overflow-hidden">
                      <span
                        className={cn(
                          "block font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] transition-colors duration-300 sm:text-4xl",
                          isActive
                            ? "text-text"
                            : "text-text group-hover:text-metallic-light"
                        )}
                      >
                        {item.label}
                      </span>
                    </span>

                    {!hasChildren && (
                      <span
                        className={cn(
                          "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isActive
                            ? "border-metallic-light bg-metallic-light/10 text-metallic-light"
                            : "border-white/10 text-text-muted group-hover:border-text group-hover:text-text"
                        )}
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    )}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedItem(isExpanded ? null : item.href)
                      }
                      aria-expanded={isExpanded}
                      aria-label={
                        isExpanded
                          ? `${item.label} Untermenü schließen`
                          : `${item.label} Untermenü öffnen`
                      }
                      className={cn(
                        "my-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isExpanded
                          ? "rotate-180 border-metallic-light bg-metallic-light/10 text-metallic-light"
                          : "border-white/10 text-text-muted hover:border-text hover:text-text"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Children: smooth grid-rows expand */}
                {hasChildren && (
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-5 pl-12">
                        {item.children!.map((child, ci) => {
                          const childActive = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="group flex items-center justify-between py-2.5"
                              >
                                <span className="flex items-baseline gap-3">
                                  <span
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums"
                                    style={{
                                      background: METALLIC_GRADIENT,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      backgroundClip: "text",
                                    }}
                                  >
                                    0{ci + 1}
                                  </span>
                                  <span
                                    className={cn(
                                      "font-display text-lg leading-tight transition-colors duration-300",
                                      childActive
                                        ? "text-metallic-light"
                                        : "text-text-muted group-hover:text-text"
                                    )}
                                  >
                                    {child.label}
                                  </span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 -translate-x-1 text-text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-text" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CONTACT STRIP */}
      <div
        className={cn(
          "relative border-t border-white/[0.06] px-6 pt-6 pb-8 transition-all duration-500",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
        style={{
          transitionDelay: isOpen
            ? `${120 + NAV_ITEMS.length * 70 + 60}ms`
            : "0ms",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-subtle">
          [ Direkter Draht ]
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            onClick={onClose}
            className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle">
              <Phone className="h-3 w-3" />
              Anruf
            </span>
            <span className="font-display text-sm font-medium leading-tight text-text">
              {siteConfig.contact.phoneDisplay}
            </span>
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={onClose}
            className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle">
              <Mail className="h-3 w-3" />
              E-Mail
            </span>
            <span className="break-all font-display text-sm font-medium leading-tight text-text">
              {siteConfig.contact.email}
            </span>
          </a>
        </div>

        <Link
          href="/kontakt"
          onClick={onClose}
          className="group relative mt-4 flex h-14 items-center justify-between overflow-hidden rounded-full bg-white pl-6 pr-2 text-bg"
        >
          <span className="pointer-events-none absolute inset-0 translate-y-full bg-bg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
          <span className="relative z-10 font-mono text-xs uppercase tracking-[0.25em] transition-colors duration-500 group-hover:text-white">
            Briefing starten
          </span>
          <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg text-white transition-colors duration-500 group-hover:bg-white group-hover:text-bg">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </Link>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.3em] text-text-subtle">
          {siteConfig.contact.address.street} · {siteConfig.contact.address.postalCode}{" "}
          {siteConfig.contact.address.city}
        </p>
      </div>
    </div>
  );
}
