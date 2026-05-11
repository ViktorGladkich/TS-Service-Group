import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center font-mono text-xs uppercase tracking-[0.12em]",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        default: "text-[var(--color-text-subtle)]",
        muted: "text-[var(--color-text-muted)]",
        metallic: "gradient-metallic",
        outlined:
          "text-[var(--color-text-subtle)] border border-[var(--color-border)] px-3 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge — eyebrow/label component using mono font.
 * Follows the brief's 12px uppercase, +0.12em tracking pattern.
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
