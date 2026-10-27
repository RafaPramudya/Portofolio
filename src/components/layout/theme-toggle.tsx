"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { shellContent } = useContent();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={shellContent.themeToggleLabel}
      title={shellContent.themeToggleLabel}
      className={cn(
        "group relative inline-flex size-9 items-center justify-center rounded-full border border-line bg-glass text-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Sun
        className="hidden size-4 light:block"
        aria-hidden="true"
      />
      <Moon
        className="hidden size-4 dark:block"
        aria-hidden="true"
      />
    </button>
  );
}
