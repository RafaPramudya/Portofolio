"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { BrandIcon } from "@/components/ui/brand-icon";
import { buttonStyles } from "@/components/ui/button";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-line bg-bg/50 px-3.5 text-sm text-fg placeholder:text-faint transition-colors hover:border-line-strong focus:border-accent/50 focus:ring-2 focus:ring-accent/15 focus:outline-none";

const labelBase =
  "mb-1.5 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-faint uppercase";

export function WhatsAppComposer() {
  const { contactContent, profile } = useContent();
  const composer = contactContent.composer;
  const [message, setMessage] = useState(composer.defaultMessage);
  const href = buildWhatsAppHref(profile.whatsapp.number, message);
  const atLimit = message.length >= composer.message.maxLength;

  return (
    <div className="glass-panel relative h-full overflow-hidden rounded-3xl p-5 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.14),transparent_68%)] blur-2xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
            <BrandIcon name="whatsapp" className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight">
              {composer.title}
            </h3>
            <p className="mt-1 font-mono text-[9.5px] tracking-wide text-faint">
              {composer.subtitle}
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[9px] text-accent sm:inline-flex">
          <span className="size-1.5 rounded-full bg-accent" />
          {composer.badge}
        </span>
      </div>

      <div className="relative mt-6">
        <label htmlFor="contact-whatsapp-message" className={labelBase}>
          <span>{composer.message.label}</span>
          <span
            className={cn(
              "normal-case",
              atLimit ? "text-accent" : "text-faint/70",
            )}
          >
            {message.length}
            {composer.message.counterSuffix}
          </span>
        </label>
        <textarea
          id="contact-whatsapp-message"
          rows={7}
          maxLength={composer.message.maxLength}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={composer.message.placeholder}
          aria-describedby="contact-whatsapp-hint"
          className={cn(fieldBase, "resize-y py-3 leading-relaxed")}
        />
      </div>

      <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          id="contact-whatsapp-hint"
          className="inline-flex items-start gap-1.5 font-mono text-[9.5px] leading-relaxed text-faint"
        >
          <Check className="mt-0.5 size-3 shrink-0 text-accent" aria-hidden="true" />
          {composer.hint}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${composer.send} — WhatsApp ${profile.whatsapp.display}`}
          className={cn(
            buttonStyles({ size: "lg" }),
            "w-full shrink-0 sm:w-auto",
          )}
        >
          <BrandIcon name="whatsapp" className="size-4" />
          {composer.send}
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}
