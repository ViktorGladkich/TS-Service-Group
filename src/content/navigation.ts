import type { NavItem } from "@/lib/types";

/**
 * Main navigation items — used in Header and MobileNav.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Leistungen",
    href: "/leistungen",
    children: [
      { label: "Sicherheitsdienst", href: "/leistungen/sicherheitsdienst" },
      { label: "Umzugservice", href: "/leistungen/umzugservice" },
      { label: "Reinigung", href: "/leistungen/reinigung" },
    ],
  },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

/**
 * Footer navigation — secondary links
 */
export const FOOTER_NAV: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
