import { cn } from "@/lib/cn";

// Label + input slot + inline error. Starts at opacity 0 so the parent
// GSAP timeline can stagger the fields in on scroll.
export function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)} style={{ opacity: 0 }}>
      <label className="block font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
