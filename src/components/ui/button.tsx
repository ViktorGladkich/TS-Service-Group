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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
