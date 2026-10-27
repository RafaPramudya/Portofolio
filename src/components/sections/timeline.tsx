"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, MoveHorizontal } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import type { TimelineCategory, TimelineItem } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { FilterChips } from "@/components/ui/filter-chips";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

const categoryStyles: Record<TimelineCategory, string> = {
  Competitions: "border-amber-400/25 bg-amber-400/10 text-amber-500 dark:text-amber-300",
  Projects: "border-accent/25 bg-accent/10 text-accent",
  Education: "border-accent-2/25 bg-accent-2/10 text-accent-2",
  Work: "border-accent-3/25 bg-accent-3/10 text-accent-3",
};

function TimelineCard({ item }: { item: TimelineItem }) {
  const { journeyContent } = useContent();

  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-bg/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-glass">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          {item.date}
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase",
            categoryStyles[item.category],
          )}
        >
          {journeyContent.categoryLabels[item.category]}
        </span>
      </div>

      <div className="mt-5 flex size-10 items-center justify-center rounded-xl border border-line bg-glass text-accent transition-colors group-hover:border-accent/30">
        <Icon name={item.icon} className="size-4" />
      </div>

      <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-tight">
        {item.title}
      </h3>
      <p className="mt-1 font-mono text-[9.5px] tracking-wide text-faint">
        {item.org}
      </p>
      <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
        {item.summary}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-line/80 bg-bg/40 px-1.5 py-0.5 font-mono text-[9px] text-faint"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Timeline() {
  const { journeyContent, timeline } = useContent();
  const [selected, setSelected] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const options = journeyContent.categories.map((value) => ({
    value,
    label: journeyContent.categoryLabels[value],
  }));

  const items = useMemo(() => {
    if (!selected.length) return timeline;
    return timeline.filter((item) => selected.includes(item.category));
  }, [selected, timeline]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const bar = progressRef.current;
    if (!scroller || !bar) return;

    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, scroller.scrollLeft / max)) : 1;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [items]);

  function toggle(category: string) {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function scroll(direction: -1 | 1) {
    scrollRef.current?.scrollBy({
      left: direction * 360,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <section id="journey" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index={journeyContent.index}
          eyebrow={journeyContent.eyebrow}
          title={
            <>
              {journeyContent.titleLead}{" "}
              <span className="text-gradient">{journeyContent.titleAccent}</span>
            </>
          }
          description={journeyContent.description}
        >
          <FilterChips
            label={journeyContent.filterLabel}
            options={options}
            selected={selected}
            onToggle={toggle}
            onClear={() => setSelected([])}
          />
        </SectionHeading>

        <div className="mt-10">
          <Reveal delay={60}>
            <div className="flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                <CalendarClock className="size-3.5" aria-hidden="true" />
                {items.length}{" "}
                {items.length === 1
                  ? journeyContent.entrySingular
                  : journeyContent.entryPlural}{" "}
                · {journeyContent.orderHint}
              </p>
              <div className="hidden items-center gap-2 md:flex">
                <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[9.5px] text-faint">
                  <MoveHorizontal className="size-3.5" aria-hidden="true" />
                  {journeyContent.scrollHint}
                </span>
                <button
                  type="button"
                  onClick={() => scroll(-1)}
                  aria-label={journeyContent.previousLabel}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-glass text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll(1)}
                  aria-label={journeyContent.nextLabel}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-glass text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>

          <div className="relative mt-5 hidden md:block">
            <div className="relative h-px w-full overflow-hidden bg-line">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-2 to-accent-3"
              />
            </div>

            <div
              ref={scrollRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pt-5 pb-3"
            >
              {items.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={Math.min(index, 3) * 60}
                  className="w-[20.5rem] shrink-0 snap-start sm:w-[22rem]"
                >
                  <TimelineCard item={item} />
                </Reveal>
              ))}
              {items.length === 0 ? (
                <p className="py-10 text-sm text-muted">
                  {journeyContent.empty}
                </p>
              ) : null}
            </div>
          </div>

          <ol className="relative mt-6 space-y-3.5 md:hidden">
            <span
              className="absolute top-3 bottom-3 left-[13px] w-px bg-gradient-to-b from-accent/50 via-line to-transparent"
              aria-hidden="true"
            />
            {items.map((item, index) => (
              <li key={item.id} className="relative pl-9">
                <span
                  className="absolute top-6 left-[9px] size-[9px] rounded-full border-2 border-bg bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_16%,transparent)]"
                  aria-hidden="true"
                />
                <Reveal delay={Math.min(index, 3) * 60}>
                  <TimelineCard item={item} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
