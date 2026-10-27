"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals content once it enters the viewport. The delay is used to stagger
 * sibling blocks that come into view together, such as cards in a grid.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-revealed={revealed ? "" : undefined}
      className={cn("reveal", className)}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
