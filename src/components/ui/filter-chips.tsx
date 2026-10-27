"use client";

import { cn } from "@/lib/utils";
import { useContent } from "@/components/providers/content-provider";

export type FilterOption = {
  value: string;
  label: string;
};

export function FilterChips({
  options,
  selected,
  onToggle,
  onClear,
  label,
  className,
}: {
  options: readonly FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
  label: string;
  className?: string;
}) {
  const { uiLabels } = useContent();
  const allActive = selected.length === 0;

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <button
        type="button"
        onClick={onClear}
        aria-pressed={allActive}
        className={cn(
          "h-8 rounded-full border px-3.5 font-mono text-[11px] tracking-wide uppercase transition-colors",
          allActive
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-line bg-glass text-muted hover:border-line-strong hover:text-fg",
        )}
      >
        {uiLabels.filterAll}
      </button>
      {options.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            aria-pressed={active}
            className={cn(
              "h-8 rounded-full border px-3.5 font-mono text-[11px] tracking-wide uppercase transition-colors",
              active
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-line bg-glass text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
      {selected.length > 0 ? (
        <button
          type="button"
          onClick={onClear}
          className="ml-1 font-mono text-[11px] text-faint underline decoration-line underline-offset-4 transition-colors hover:text-fg"
        >
          {uiLabels.filterClear}
        </button>
      ) : null}
    </div>
  );
}
