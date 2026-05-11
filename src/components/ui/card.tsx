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
        "rounded-lg border border-border bg-surface p-6",
        interactive && [
          "transition-all duration-300",
          "hover:border-border-hover",
          "hover:bg-elevated",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
