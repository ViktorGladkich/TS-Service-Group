"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/content/navigation";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-bg lg:hidden",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-8 opacity-0"
      )}
      inert={!isOpen}
    >
      {/* HEADER strip */}
      <div className="flex items-center justify-between px-8 pt-28 pb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Navigation
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Menu
        </span>
      </div>

      {/* PRIMARY NAVIGATION */}
      <nav
        aria-label="Hauptnavigation"
        className="flex-1 overflow-y-auto px-8 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex flex-col gap-6 pt-4 pb-12">
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
                  "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : "0ms" }}
              >
                <div className="flex flex-col">
                  {hasChildren ? (
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.href)}
                      className="group flex w-full items-center justify-between text-left"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-2 font-mono text-[10px] text-white/30">0{i + 1}</span>
                        <span className={cn(
                          "font-display text-5xl font-medium tracking-tighter transition-colors sm:text-6xl",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        )}>
                          {item.label}
                        </span>
                      </div>
                      <ChevronDown className={cn(
                        "h-6 w-6 text-white/40 transition-transform duration-500",
                        isExpanded && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-2 font-mono text-[10px] text-white/30">0{i + 1}</span>
                        <span className={cn(
                          "font-display text-5xl font-medium tracking-tighter transition-colors sm:text-6xl",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        )}>
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-6 w-6 -translate-x-4 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  )}

                  {/* Children */}
                  {hasChildren && (
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="ml-12 flex flex-col gap-4 pt-6 pb-2">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="group flex w-fit items-center gap-3 text-2xl font-medium tracking-tight text-white/60 transition-colors hover:text-white"
                              >
                                {child.label}
                                <ArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FOOTER STRIP */}
      <div
        className={cn(
          "px-8 pb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: isOpen ? `${100 + NAV_ITEMS.length * 50 + 100}ms` : "0ms" }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            <a href={`tel:${siteConfig.contact.phone}`} className="group flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                Anruf
              </span>
              <span className="font-display text-sm text-white transition-colors group-hover:text-white/70">
                {siteConfig.contact.phoneDisplay}
              </span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="group flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                E-Mail
              </span>
              <span className="font-display text-sm text-white transition-colors group-hover:text-white/70">
                {siteConfig.contact.email}
              </span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              {siteConfig.contact.address.street} · {siteConfig.contact.address.city}
            </span>
            <Link
              href="/kontakt"
              onClick={onClose}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
            >
              Briefing <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
