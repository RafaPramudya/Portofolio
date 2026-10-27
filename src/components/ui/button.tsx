import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[color:var(--accent-contrast)] shadow-[0_10px_40px_-12px_var(--ring)] hover:bg-accent-strong hover:shadow-[0_16px_50px_-12px_var(--ring)] hover:-translate-y-0.5",
  glass:
    "glass-panel text-fg hover:border-line-strong hover:bg-glass hover:-translate-y-0.5",
  ghost:
    "text-muted hover:text-fg hover:bg-glass",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
