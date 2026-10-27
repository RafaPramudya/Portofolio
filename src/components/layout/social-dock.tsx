"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/ui/brand-icon";

/**
 * The dock only mounts after the hero so it never covers the opening copy or
 * the primary calls to action on small screens.
 */
export function SocialDock() {
  const { socials, shellContent } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 420);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <div className="animate-rise pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 sm:bottom-5">
      <nav
        aria-label={shellContent.socialDockLabel}
        className="glass-panel pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5 shadow-[0_20px_60px_-25px_var(--shadow-color)]"
      >
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
            aria-label={[social.label, social.handle, social.note]
              .filter(Boolean)
              .join(" — ")}
            className="group relative inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-glass hover:text-fg sm:size-10"
          >
            <BrandIcon name={social.icon} className="size-[17px]" />
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-md border border-line bg-bg-soft px-2 py-1 font-mono text-[10px] whitespace-nowrap text-fg opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {social.label}
              {social.note ? (
                <span className="ml-1 text-faint">· {social.note}</span>
              ) : null}
            </span>
          </a>
        ))}
        <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
          aria-label={shellContent.backToTopLabel}
          className={cn(
            "group relative inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-glass hover:text-fg sm:size-10",
          )}
        >
          <ArrowUp className="size-[17px] transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
