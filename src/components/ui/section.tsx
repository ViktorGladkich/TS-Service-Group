import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const sectionVariants = cva("relative w-full", {
  variants: {
    padding: {
      default: "py-20 md:py-24 lg:py-30",
      compact: "py-14 md:py-16 lg:py-20",
      hero: "py-24 md:py-32 lg:py-40",
      none: "",
    },
    background: {
      transparent: "",
      surface: "bg-[var(--color-surface)]",
      elevated: "bg-[var(--color-elevated)]",
    },
  },
  defaultVariants: {
    padding: "default",
    background: "transparent",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** HTML element to render — defaults to <section> */
  as?: "section" | "div" | "article" | "aside";
  /** Whether to wrap children in a Container */
  container?: boolean;
  /** Container size variant */
  containerSize?: "default" | "narrow" | "wide";
}

/**
 * Section — consistent vertical padding with optional container wrapping.
 * Handles the 120px desktop / 80px tablet / 56px mobile spacing from the brief.
 */
export function Section({
  as: Tag = "section",
  className,
  padding,
  background,
  container = true,
  containerSize = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(sectionVariants({ padding, background, className }))}
      {...props}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
