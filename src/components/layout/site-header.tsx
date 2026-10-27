"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { buttonStyles } from "@/components/ui/button";

export function SiteHeader() {
  const { navItems, profile, resumeUrl, shellContent } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 140) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-3 sm:pt-4">
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-2xl px-2.5 transition-all duration-500 sm:px-3",
            scrolled
              ? "glass-panel shadow-[0_18px_50px_-30px_var(--shadow-color)]"
              : "border border-transparent",
          )}
        >
          <Link
            href="#top"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 rounded-full pl-1 pr-3"
            aria-label={`${profile.initials} ${profile.name}, ${profile.roleSummary}, ${shellContent.homeLinkSuffix}`}
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl border border-accent/30 bg-accent/10 font-mono text-[12px] font-semibold tracking-tight text-accent">
              <span className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-transparent" />
              <span className="relative">{profile.initials}</span>
            </span>{" "}
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[13px] font-semibold tracking-tight">
                {profile.name}
              </span>{" "}
              <span className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                {profile.roleSummary}
              </span>
            </span>
          </Link>

          <nav
            aria-label={shellContent.primaryNavLabel}
            className="hidden items-center gap-1 lg:flex"
          >
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] transition-colors",
                    isActive
                      ? "text-fg"
                      : "text-muted hover:bg-glass hover:text-fg",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="animate-fade-in absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={resumeUrl}
              download
              title={shellContent.resumeHint}
              className={cn(
                buttonStyles({ variant: "glass", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              <Download className="size-3.5" aria-hidden="true" />
              {shellContent.resumeLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={
                open ? shellContent.closeMenuLabel : shellContent.openMenuLabel
              }
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-glass text-fg transition-colors hover:border-line-strong lg:hidden"
            >
              {open ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label={shellContent.closeMenuLabel}
            onClick={() => setOpen(false)}
            className="animate-fade-in fixed inset-x-0 top-[4.6rem] bottom-0 z-30 bg-bg/60 backdrop-blur-sm lg:hidden"
          />
          <div
            id="mobile-navigation"
            className="animate-menu-in absolute inset-x-4 top-[4.6rem] z-40 lg:hidden"
          >
            <nav
              aria-label={shellContent.mobileNavLabel}
              className="glass-panel overflow-hidden rounded-3xl p-2.5"
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] text-muted transition-colors hover:bg-glass hover:text-fg"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-faint">
                      0{index + 1}
                    </span>
                    {item.label}
                  </span>
                  <ArrowUpRight className="size-4 text-faint" aria-hidden="true" />
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-4">
                <a
                  href={resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className={cn(buttonStyles({ variant: "glass", size: "md" }))}
                >
                  <Download className="size-4" aria-hidden="true" />
                  {shellContent.resumeLabel}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={cn(buttonStyles({ variant: "primary", size: "md" }))}
                >
                  {shellContent.getInTouchLabel}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
