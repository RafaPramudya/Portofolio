"use client";

import { Fragment } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import { BrandIcon } from "@/components/ui/brand-icon";

export function Footer() {
  const { navItems, profile, shellContent, socials } = useContent();
  const { footer } = shellContent;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line pb-28 pt-16 sm:pb-32">
      <div className="section-shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
              {footer.eyebrow}
            </p>
            <p className="mt-4 max-w-sm text-2xl font-semibold tracking-[-0.02em] text-balance">
              {footer.headline}
            </p>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <BrandIcon
                name="whatsapp"
                className="size-3.5 text-faint transition-colors group-hover:text-accent"
              />
              {profile.whatsapp.display}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              {footer.navigateHeading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              {footer.elsewhereHeading}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <BrandIcon name={social.icon} className="size-3.5 text-faint transition-colors group-hover:text-accent" />
                    {social.label}
                    {social.note ? (
                      <span className="font-mono text-[9px] text-faint">
                        · {social.note}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[10px] tracking-wide text-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {footer.status}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-wide text-faint">
            © {year} {profile.name}. {footer.rights}
          </p>
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] text-faint">
            {footer.builtWithLabel}
            {footer.builtWith.map((item, index) => (
              <Fragment key={item}>
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                {item}
              </Fragment>
            ))}
            <Heart className="size-3 text-accent" aria-hidden="true" />
          </p>
        </div>

        <p
          aria-hidden="true"
          className="mt-10 select-none bg-gradient-to-b from-fg/[0.07] to-transparent bg-clip-text text-center text-[clamp(4rem,18vw,12rem)] leading-none font-semibold tracking-[-0.06em] text-transparent"
        >
          {profile.initials}—{year}
        </p>
      </div>
    </footer>
  );
}
