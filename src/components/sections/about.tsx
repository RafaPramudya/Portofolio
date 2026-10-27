"use client";

import { Cpu, GraduationCap, MapPin, Quote, Zap } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechGrid } from "@/components/sections/tech-grid";

const factIcons = {
  location: MapPin,
  education: GraduationCap,
  focus: Cpu,
  currently: Zap,
} as const;

export function About() {
  const { aboutContent, profile } = useContent();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index={aboutContent.index}
          eyebrow={aboutContent.eyebrow}
          title={
            <>
              {aboutContent.titleLead}
              <br />
              <span className="text-muted">{aboutContent.titleAccent}</span>
            </>
          }
          description={aboutContent.description}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={80}>
            <div className="glass-panel flex h-full flex-col rounded-3xl p-6 sm:p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                {aboutContent.shortVersionLabel}
              </p>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
                {profile.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-bg/25">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="px-4 py-4">
                    <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {stat.value}
                      <span className="text-accent">{stat.suffix}</span>
                    </p>
                    <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-faint uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-2">
                {aboutContent.principles.map((principle, index) => (
                  <li
                    key={principle.title}
                    className="flex items-start gap-3 rounded-xl border border-line/70 bg-bg/20 px-3 py-2.5"
                  >
                    <span className="pt-0.5 font-mono text-[9px] text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-[12px] font-medium text-fg/90">
                        {principle.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-faint">
                        {principle.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <blockquote className="mt-auto flex items-start gap-3 pt-6">
                <Quote className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm font-medium text-fg/90 italic">
                  “{profile.highlight}”
                </p>
              </blockquote>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={160}>
            <div className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-grid">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/16 via-transparent to-accent-2/10" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/40 to-transparent" />

                <span className="relative select-none text-[8rem] leading-none font-semibold tracking-[-0.09em] text-gradient sm:text-[9rem]">
                  {profile.initials}
                </span>

                <span className="absolute top-4 left-4 rounded-full border border-line bg-bg/50 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-muted uppercase backdrop-blur">
                  {aboutContent.card.tag}
                </span>
                <span className="absolute top-4 right-4 rounded-full border border-line bg-bg/50 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-muted uppercase backdrop-blur">
                  {aboutContent.card.id}
                </span>

                <div className="absolute inset-4 rounded-2xl border border-line/70" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[0.18em] text-faint uppercase">
                  {profile.name}
                </span>
                <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-accent uppercase">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {aboutContent.card.status}
                </span>
              </div>

              <ul className="divide-y divide-line">
                {aboutContent.facts.map((fact) => {
                  const Icon = factIcons[fact.icon];
                  return (
                    <li key={fact.label} className="flex items-start gap-3 px-5 py-3.5">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-glass text-muted">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] tracking-[0.16em] text-faint uppercase">
                          {fact.label}
                        </p>
                        <p className="mt-0.5 text-[12.5px] leading-snug text-fg/90">
                          {fact.value}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-5" delay={60}>
          <TechGrid />
        </Reveal>
      </div>
    </section>
  );
}
