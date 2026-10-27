"use client";

import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppComposer } from "@/components/forms/whatsapp-composer";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function Contact() {
  const { contactContent, profile, socials } = useContent();
  const directHref = buildWhatsAppHref(
    profile.whatsapp.number,
    contactContent.composer.defaultMessage,
  );

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index={contactContent.index}
          eyebrow={contactContent.eyebrow}
          title={
            <>
              {contactContent.titleLead}{" "}
              <span className="text-gradient">{contactContent.titleAccent}</span>
            </>
          }
          description={contactContent.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={80}>
            <div className="flex h-full flex-col">
              <div className="glass-panel rounded-3xl p-6 sm:p-7">
                <p className="font-mono text-[9.5px] tracking-[0.2em] text-faint uppercase">
                  {contactContent.directLine}
                </p>
                <a
                  href={directHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`WhatsApp ${profile.whatsapp.display}`}
                  className="group mt-3 flex items-center gap-3 text-xl font-semibold tracking-[-0.03em] text-fg transition-colors hover:text-accent sm:text-2xl"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <BrandIcon name="whatsapp" className="size-4" />
                  </span>
                  <span className="min-w-0 break-all">
                    {profile.whatsapp.display}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-5 font-mono text-[10px] text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {profile.timezone} · {contactContent.replyNote}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[9px] tracking-[0.16em] text-faint uppercase">
                    {contactContent.goodFits.label}
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {contactContent.goodFits.items.map((fit) => (
                      <li
                        key={fit}
                        className="rounded-full border border-line bg-bg/40 px-2.5 py-1 font-mono text-[9.5px] text-muted"
                      >
                        {fit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass-panel mt-3 rounded-3xl p-2">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-colors hover:bg-glass"
                  >
                    <span className="grid size-8 place-items-center rounded-lg border border-line bg-bg/40 text-muted transition-colors group-hover:text-accent">
                      <BrandIcon name={social.icon} className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] text-fg">
                        {social.label}
                      </span>
                      <span className="block truncate font-mono text-[9.5px] text-faint">
                        {social.handle}
                        {social.note ? (
                          <span className="ml-1 text-accent-3">
                            · {social.note}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <ArrowUpRight className="size-3.5 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-[10px] text-muted">
                  {profile.availability}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={160}>
            <WhatsAppComposer />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
