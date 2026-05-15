import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all",
    "focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-metallic)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-text)] text-[var(--color-bg)]",
          "hover:bg-[var(--color-metallic)]",
        ],
        secondary: [
          "bg-[var(--color-bg)] text-[var(--color-text)]",
          "border border-[var(--color-border)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-text)]",
          "hover:bg-[var(--color-elevated)]",
          "border border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
        ],
        outline: [
          "bg-transparent text-[var(--color-text)]",
          "border border-[var(--color-text-muted)]",
          "hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]",
        ],
        metallic: [
          "bg-gradient-to-r from-[#EDEDED] via-[#B5B5B5] to-[#8A8A8A]",
          "text-[var(--color-bg)] font-semibold",
          "hover:from-[#F5F5F5] hover:via-[#C5C5C5] hover:to-[#9A9A9A]",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-sm)]",
        md: "h-11 px-6 text-sm rounded-[var(--radius-md)]",
        lg: "h-13 px-8 text-base rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size, ...props }, ref) => {
    // Determine sliding fill bg color and text hover based on variant
    const isDarkVariant = variant === "primary" || variant === "metallic" || variant === "secondary";
    const fillBgClass = isDarkVariant ? "bg-white" : "bg-[var(--color-text)]";
    const textHoverClass = "group-hover:text-[var(--color-bg)]";

    return (
      <button
        className={cn(
          "group relative overflow-hidden",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {/* Sliding background fill */}
        <span className={cn(
          "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none",
          fillBgClass
        )} />
        
        {/* Content wrapper */}
        <span className={cn(
          "relative z-10 flex items-center justify-center gap-2 transition-colors duration-500",
          textHoverClass
        )}>
          {props.children}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
