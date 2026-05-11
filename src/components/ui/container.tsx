import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width variant */
  size?: "default" | "narrow" | "wide";
}

/**
 * Container — wraps content in a max-width centered container.
 * Default: 1440px. Narrow: 960px. Wide: full bleed.
 */
export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        {
          "max-w-[1440px]": size === "default",
          "max-w-[960px]": size === "narrow",
          "max-w-none": size === "wide",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
