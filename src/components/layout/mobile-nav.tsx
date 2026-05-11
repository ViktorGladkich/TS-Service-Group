"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-[var(--color-bg)] transition-all duration-500 lg:hidden",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <nav className="mt-24 flex flex-1 flex-col gap-2 px-8">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "group flex items-center gap-6 border-b border-[var(--color-border)] py-6 transition-all duration-500",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: isOpen ? `${150 + i * 80}ms` : "0ms" }}
          >
            <span className="font-mono text-xs text-[var(--color-text-subtle)]">
              0{i + 1}
            </span>
            <span className="text-2xl font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
