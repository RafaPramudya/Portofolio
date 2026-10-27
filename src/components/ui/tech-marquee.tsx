"use client";

import { useContent } from "@/components/providers/content-provider";

export function TechMarquee() {
  const { marqueeTech, techStack } = useContent();
  const items = Array.from(
    new Set([...marqueeTech, ...techStack.filter((t) => t.core).map((t) => t.name)]),
  );

  return (
    <div className="mask-fade-x relative mt-16 overflow-hidden border-y border-line py-4">
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-5 px-5 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-muted uppercase"
              >
                <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
