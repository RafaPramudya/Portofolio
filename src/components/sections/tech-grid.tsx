"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import { FilterChips } from "@/components/ui/filter-chips";

export function TechGrid() {
  const { techCategories, techCategoryLabels, techGridContent, techStack } =
    useContent();
  const [selected, setSelected] = useState<string[]>([]);

  const options = techCategories.map((value) => ({
    value,
    label: techCategoryLabels[value],
  }));

  const visible = useMemo(() => {
    const list = selected.length
      ? techStack.filter((tech) =>
          selected.includes(tech.category),
        )
      : techStack;
    return [...list].sort((a, b) => Number(Boolean(b.core)) - Number(Boolean(a.core)));
  }, [selected, techStack]);

  function toggle(value: string) {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <div className="glass-panel overflow-hidden rounded-3xl">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium">
            {techGridContent.title}
            <span className="rounded-full border border-line bg-glass px-2 py-0.5 font-mono text-[9px] text-faint">
              {visible.length}/{techStack.length}
            </span>
          </h3>
          <p className="mt-1 font-mono text-[10px] tracking-wide text-faint">
            {techGridContent.hint}
          </p>
        </div>
        <FilterChips
          label={techGridContent.filterLabel}
          options={options}
          selected={selected}
          onToggle={toggle}
          onClear={() => setSelected([])}
        />
      </div>

      <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((tech) => (
          <li
            key={tech.name}
            className="animate-fade-in group relative bg-bg/45 p-4 transition-colors hover:bg-glass sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-medium tracking-tight text-fg sm:text-sm">
                {tech.name}
              </p>
              {tech.core ? (
                <span
                  className="mt-1 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                  title={techGridContent.coreTitle}
                />
              ) : null}
            </div>
            <p className="mt-1 font-mono text-[9.5px] leading-relaxed text-faint">
              {tech.note}
            </p>
            <div
              className="mt-4 h-1 w-full overflow-hidden rounded-full bg-line"
              role="presentation"
            >
              <span
                className={cn(
                  "block h-full rounded-full bg-gradient-to-r from-accent to-accent-2 opacity-75 transition-all duration-700",
                )}
                style={{ width: `${tech.level}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
