"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Cpu,
  Download,
  MapPin,
} from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { TechMarquee } from "@/components/ui/tech-marquee";

function useJakartaTime() {
  const { locale, profile } = useContent();
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: profile.timeZone,
        }).format(new Date()),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale, profile.timeZone]);

  return time;
}

function RotatingRole() {
  const { profile } = useContent();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;

    const sync = () => {
      window.clearInterval(interval);
      if (media.matches) return;
      interval = setInterval(
        () => setIndex((value) => (value + 1) % profile.roles.length),
        3200,
      );
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      window.clearInterval(interval);
      media.removeEventListener("change", sync);
    };
  }, [profile.roles.length]);

  return (
    <div className="mt-6 flex min-h-8 items-center gap-3">
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      <span className="sr-only">{profile.roles.join(", ")}</span>
      <div className="relative h-6 w-full overflow-hidden" aria-hidden="true">
        <span
          key={profile.roles[index]}
          className="animate-role-in absolute inset-0 block font-mono text-[12px] tracking-[0.18em] whitespace-nowrap text-accent uppercase sm:text-[13px]"
        >
          {profile.roles[index]}
        </span>
      </div>
    </div>
  );
}

function PortraitPanel({ time }: { time: string }) {
  const { heroContent, profile } = useContent();
  const { photo } = heroContent;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_55%_18%,rgba(190,40,40,0.24),transparent_65%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-line-strong bg-bg-soft shadow-[0_40px_110px_-45px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-[1/1] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            fetchPriority="high"
            decoding="sync"
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 42vw"
            className="object-cover"
            style={{ objectPosition: photo.focal }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08060a] via-[#08060a]/15 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08060a]/35 via-transparent to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 ring-1 ring-white/10 ring-inset"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5 sm:p-4">
            <span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] whitespace-nowrap text-white/75 uppercase backdrop-blur">
              {photo.badge}
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-white/75 uppercase backdrop-blur sm:inline-flex">
              <Clock className="size-2.5" aria-hidden="true" />
              {time} · {profile.timezone}
            </span>
          </div>

          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[8.5px] tracking-[0.18em] text-white/60 uppercase">
                  {photo.frameLabel}
                </p>
                <p className="mt-1 text-[13px] leading-snug font-medium text-white sm:text-sm">
                  {photo.caption}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[8px] tracking-[0.1em] text-accent uppercase">
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                {photo.statusOpen}
              </span>
            </div>
            <p className="mt-2.5 hidden border-t border-white/10 pt-2.5 font-mono text-[8.5px] tracking-[0.08em] text-white/60 sm:block">
              {photo.captionNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { profile, heroContent, resumeUrl } = useContent();
  const time = useJakartaTime();
  const { stats } = heroContent;

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(190,40,40,0.16),transparent_65%)] blur-3xl" />
        <div className="absolute top-1/3 left-[-15%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.11),transparent_65%)] blur-3xl" />
      </div>

      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="animate-rise">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-glass px-3 py-1.5 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                  {profile.availability}
                </span>
              </div>
            </div>

            <div className="animate-rise [animation-delay:70ms]">
              <p className="mt-7 font-mono text-[11px] tracking-[0.28em] text-faint uppercase">
                {heroContent.greeting}
              </p>
              <h1 className="mt-3 text-[clamp(3.2rem,10vw,6.4rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
                <span className="block">{profile.headline.lead}</span>
                <span className="text-gradient block pb-1">
                  {profile.headline.accent}
                </span>
              </h1>
            </div>

            <div className="animate-rise [animation-delay:120ms]">
              <RotatingRole />
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                {heroContent.description}
              </p>
            </div>

            <div className="animate-rise [animation-delay:170ms]">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={buttonStyles({ size: "lg" })}>
                  {heroContent.ctas.projects}
                  <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
                <a
                  href={resumeUrl}
                  download
                  className={buttonStyles({ variant: "glass", size: "lg" })}
                >
                  <Download className="size-4" aria-hidden="true" />
                  {heroContent.ctas.resume}
                </a>
                <a
                  href="#contact"
                  className={cn(
                    buttonStyles({ variant: "ghost", size: "lg" }),
                    "gap-1.5 px-1 sm:px-6",
                  )}
                >
                  {heroContent.ctas.contact}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="animate-rise [animation-delay:220ms]">
              <dl className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-glass/70 backdrop-blur">
                <div className="flex flex-col px-3.5 py-3.5 sm:px-4">
                  <dt className="order-2 mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-faint uppercase">
                    {stats.projects.label}
                    <span className="mt-1 block font-mono text-[8.5px] tracking-normal text-accent normal-case">
                      {stats.projects.note}
                    </span>
                  </dt>
                  <dd className="order-1 text-lg font-semibold tracking-tight text-fg">
                    {stats.projects.value}
                  </dd>
                </div>
                <div className="flex flex-col px-3.5 py-3.5 sm:px-4">
                  <dt className="order-2 mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-faint uppercase">
                    {stats.certificates.label}
                    <span className="mt-1 block font-mono text-[8.5px] tracking-normal text-accent normal-case">
                      {stats.certificates.note}
                    </span>
                  </dt>
                  <dd className="order-1 text-lg font-semibold tracking-tight text-fg">
                    {stats.certificates.value}
                  </dd>
                </div>
                <div className="flex flex-col px-3.5 py-3.5 sm:px-4">
                  <dt className="order-2 mt-0.5 font-mono text-[8.5px] tracking-[0.12em] text-faint uppercase">
                    {stats.clock.label}
                    <span className="mt-1 block font-mono text-[8.5px] tracking-normal text-muted normal-case">
                      {stats.clock.note}
                    </span>
                  </dt>
                  <dd className="order-1 text-lg font-semibold tracking-tight text-fg">
                    {time}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-wide text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Cpu className="size-3.5" aria-hidden="true" />
                  {profile.education.school}
                </span>
                <span className="hidden items-center gap-1.5 sm:inline-flex">
                  <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                  {profile.education.graduation}
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <PortraitPanel time={time} />
          </div>
        </div>

        <TechMarquee />
      </div>
    </section>
  );
}
