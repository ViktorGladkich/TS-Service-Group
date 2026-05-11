import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to add hover effects */
  interactive?: boolean;
}

/**
 * Card — base primitive for content cards.
 * Specialized cards (ServiceCard, StatCard, ProjectCard) compose this.
 */
export function Card({
  className,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6",
        interactive && [
          "transition-all duration-[var(--duration-base)]",
          "hover:border-[var(--color-border-hover)]",
          "hover:bg-[var(--color-elevated)]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
