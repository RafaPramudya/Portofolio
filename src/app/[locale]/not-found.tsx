"use client";

import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";

export default function NotFound() {
  const { locale, shellContent } = useContent();
  const { notFound } = shellContent;

  return (
    <section className="flex min-h-[70dvh] items-center justify-center py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
            <Terminal className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-6 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            {notFound.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {notFound.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {notFound.description}
          </p>
          <Link
            href={`/${locale}`}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-glass px-5 text-sm text-fg transition-colors hover:border-line-strong"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {notFound.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
