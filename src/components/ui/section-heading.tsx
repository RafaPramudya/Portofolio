import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
          align === "center" && "md:flex-col md:items-center",
          className,
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "text-center")}>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            <span className="inline-flex size-6 items-center justify-center rounded-full border border-line bg-glass text-[10px] text-fg">
              {index}
            </span>
            {eyebrow}
            <span className="h-px w-10 bg-gradient-to-r from-line-strong to-transparent" />
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {children ? (
          <div className={cn("shrink-0", align === "center" && "mt-2")}>
            {children}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
