"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";

/**
 * Compact ID / EN switch. The full language name lives in an `sr-only` span so
 * the accessible name still contains the visible label.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, locales, localeMeta, shellContent } = useContent();
  const pathname = usePathname();
  const router = useRouter();

  function hrefFor(target: string) {
    if (!pathname) return `/${target}`;
    const swapped = pathname.replace(
      new RegExp(`^/${locale}(?=/|$)`),
      `/${target}`,
    );
    return swapped === pathname ? `/${target}` : swapped;
  }

  return (
    <nav
      aria-label={shellContent.languageLabel}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-glass p-0.5",
        className,
      )}
    >
      {locales.map((item) => {
        const active = item === locale;
        const label = localeMeta[item].label;
        const name = localeMeta[item].name;

        if (active) {
          return (
            <span
              key={item}
              lang={localeMeta[item].htmlLang}
              aria-current="true"
              className="rounded-full bg-accent/10 px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.08em] text-accent uppercase"
            >
              {label}
              <span className="sr-only"> — {name}</span>
            </span>
          );
        }

        const href = hrefFor(item);

        return (
          <Link
            key={item}
            href={href}
            hrefLang={localeMeta[item].htmlLang}
            onClick={(event) => {
              const hash = window.location.hash;
              if (!hash) return;
              event.preventDefault();
              router.push(`${href}${hash}`);
            }}
            className="rounded-full px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-muted uppercase transition-colors hover:text-fg"
          >
            <span aria-hidden="true">{label}</span>
            <span className="sr-only"> — {name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
