"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import type { Certificate } from "@/types";
import { cn } from "@/lib/utils";
import { FilterChips } from "@/components/ui/filter-chips";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const accents = {
  emerald: {
    text: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
    stroke: "#34d399",
  },
  sky: {
    text: "text-accent-2",
    border: "border-accent-2/30",
    bg: "bg-accent-2/10",
    stroke: "#38bdf8",
  },
  violet: {
    text: "text-accent-3",
    border: "border-accent-3/30",
    bg: "bg-accent-3/10",
    stroke: "#a78bfa",
  },
  amber: {
    text: "text-amber-500 dark:text-amber-300",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
    stroke: "#f59e0b",
  },
} as const;

export function CertificateArt({
  certificate,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  certificate: Certificate;
  className?: string;
  sizes?: string;
}) {
  const { certificatesContent } = useContent();
  const { gallery } = certificatesContent;
  const accent = accents[certificate.accent];

  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-line bg-bg/50",
        className,
      )}
    >
      {certificate.image ? (
        <>
          <Image
            src={certificate.image}
            alt=""
            fill
            sizes={sizes}
            style={{ objectPosition: certificate.imagePosition ?? "50% 50%" }}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/35"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/80 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div
        className={cn(
          "pointer-events-none absolute -top-16 -right-10 size-44 rounded-full blur-3xl",
          accent.bg,
        )}
      />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative flex items-start justify-between p-4 sm:p-5">
        <div>
          <p className="font-mono text-[8px] tracking-[0.24em] text-faint uppercase">
            {gallery.certificateOf}{" "}
            {gallery.categoryLabels[certificate.category]}
          </p>
          <p className="mt-1 font-mono text-[7.5px] tracking-[0.14em] text-faint/70 uppercase">
            {certificate.credentialId}
          </p>
        </div>
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border",
            accent.border,
            accent.bg,
            accent.text,
          )}
        >
          <Award className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-4 sm:px-5">
        <h3 className="max-w-[95%] text-[clamp(0.95rem,2.1vw,1.25rem)] leading-tight font-semibold tracking-[-0.02em] text-balance">
          {certificate.title}
        </h3>
        <p className="mt-2 text-[10px] text-muted">{certificate.issuer}</p>
      </div>

      <div className="relative flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[7px] tracking-[0.2em] text-faint uppercase">
            {gallery.issued}
          </p>
          <p className="mt-0.5 font-mono text-[9px] text-muted">
            {certificate.date}
          </p>
        </div>
        <svg
          viewBox="0 0 60 20"
          className={cn("h-5 w-14 opacity-60", accent.text)}
          aria-hidden="true"
        >
          <path
            d="M2 15 C 10 3, 14 17, 21 9 S 32 2, 38 12 S 50 18, 58 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-3 left-3 size-4 border-t border-l border-line-strong/60"
        aria-hidden="true"
      />
      <div
        className="absolute right-3 bottom-3 size-4 border-r border-b border-line-strong/60"
        aria-hidden="true"
      />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const certificate = items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      // Removing the dialog from the top layer happens on unmount. Calling
      // close() here would emit a close event during StrictMode's effect
      // replay and immediately dismiss the lightbox.
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % items.length);
      } else if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + items.length) % items.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onIndexChange]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="certificate-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] m-auto max-h-[92dvh] w-[min(48rem,94vw)] overflow-hidden rounded-3xl border border-line bg-bg p-0 text-fg shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
    >
      <CertificateLightboxContent
        certificate={certificate}
        index={index}
        total={items.length}
        onClose={onClose}
        onStep={(direction) =>
          onIndexChange((index + direction + items.length) % items.length)
        }
      />
    </dialog>
  );
}

function CertificateLightboxContent({
  certificate,
  index,
  total,
  onClose,
  onStep,
}: {
  certificate: Certificate;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (direction: -1 | 1) => void;
}) {
  const { certificatesContent } = useContent();
  const { gallery } = certificatesContent;
  const accent = accents[certificate.accent];

  return (
    <div className="flex max-h-[92dvh] flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          {gallery.counterLabel} {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={gallery.closeLabel}
          className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-glass text-muted transition-colors hover:text-fg"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        <CertificateArt
          certificate={certificate}
          sizes="(max-width: 768px) 94vw, 48rem"
          className="aspect-[16/11] shadow-2xl"
        />

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <h2
              id="certificate-lightbox-title"
              className="text-lg font-semibold tracking-tight"
            >
              {certificate.title}
            </h2>
            <p className="mt-1 text-[12px] text-muted">{certificate.issuer}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              {certificate.description}
            </p>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="font-mono text-[9px] tracking-[0.16em] text-faint uppercase">
              {gallery.credentialId}
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted">
              {certificate.credentialId}
            </p>
            <span
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase",
                accent.border,
                accent.bg,
                accent.text,
              )}
            >
              <BadgeCheck className="size-3" aria-hidden="true" />
              {gallery.categoryLabels[certificate.category]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-line px-4 py-3">
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-glass px-3.5 py-1.5 text-[11px] text-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          {gallery.previous}
        </button>
        <p className="font-mono text-[9px] text-faint">{gallery.keysHint}</p>
        <button
          type="button"
          onClick={() => onStep(1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-glass px-3.5 py-1.5 text-[11px] text-muted transition-colors hover:text-fg"
        >
          {gallery.next}
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function CertificateGallery() {
  const { certificates, certificatesContent } = useContent();
  const { gallery } = certificatesContent;
  const [selected, setSelected] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const options = gallery.categories.map((value) => ({
    value,
    label: gallery.categoryLabels[value],
  }));

  const visible = useMemo(() => {
    if (!selected.length) return certificates;
    return certificates.filter((item) => selected.includes(item.category));
  }, [selected, certificates]);

  function toggle(value: string) {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <div className="mt-8">
      <Reveal delay={60}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Award className="size-4 text-accent" aria-hidden="true" />
              {gallery.title}
            </h3>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-faint">
              {visible.length}{" "}
              {visible.length === 1 ? gallery.recordSingular : gallery.recordPlural} ·{" "}
              {gallery.enlargeHint}
            </p>
          </div>
          <FilterChips
            label={gallery.filterLabel}
            options={options}
            selected={selected}
            onToggle={toggle}
            onClear={() => setSelected([])}
          />
        </div>
      </Reveal>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((certificate, index) => (
          <Reveal key={certificate.id} delay={index * 70}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-haspopup="dialog"
              className="group block w-full text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <CertificateArt
                certificate={certificate}
                className="transition-all duration-300 group-hover:border-line-strong group-hover:shadow-[0_24px_60px_-40px_var(--shadow-color)]"
              />
              <span className="mt-2 flex items-center justify-between px-1">
                <span className="truncate text-[11.5px] text-muted transition-colors group-hover:text-fg">
                  {certificate.issuer}
                </span>
                <span className="font-mono text-[9px] text-faint">
                  {certificate.date}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
          {gallery.empty}
        </p>
      ) : null}

      {lightboxIndex !== null && visible[lightboxIndex] ? (
        <Lightbox
          items={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}

export function Certificates() {
  const { certificates, certificatesContent } = useContent();
  const { gallery } = certificatesContent;
  const recordLabel =
    certificates.length === 1 ? gallery.recordSingular : gallery.recordPlural;

  return (
    <section id="certificates" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index={certificatesContent.index}
          eyebrow={certificatesContent.eyebrow}
          title={
            <>
              {certificatesContent.titleLead}{" "}
              <span className="text-gradient">{certificatesContent.titleAccent}</span>
            </>
          }
          description={certificatesContent.description}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-glass px-3.5 py-2 font-mono text-[10px] tracking-[0.1em] text-muted">
            <BadgeCheck className="size-3.5 text-accent" aria-hidden="true" />
            {String(certificates.length).padStart(2, "0")} {recordLabel}
          </div>
        </SectionHeading>

        <CertificateGallery />
      </div>
    </section>
  );
}
