/**
 * Shared types exported for cross-component usage.
 * Co-locate component-only types inside their own files.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix: string;
}

export type DeviceType = "mobile" | "tablet" | "desktop";
