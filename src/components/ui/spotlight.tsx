"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    if (event.pointerType !== "mouse") return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={handlePointerMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
