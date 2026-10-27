"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  X,
} from "lucide-react";
import type { Project } from "@/types";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/brand-icon";
import { ProjectPreview } from "@/components/projects/project-preview";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-accent/30 bg-accent/10 text-accent",
  "In progress": "border-accent-2/30 bg-accent-2/10 text-accent-2",
  Research: "border-accent-3/30 bg-accent-3/10 text-accent-3",
  Archived: "border-line-strong bg-glass text-muted",
};

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { projectsContent } = useContent();
  const modalContent = projectsContent.modal;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      // Unmounting removes the dialog from the top layer. Calling close() here
      // would emit a close event that StrictMode's setup/cleanup cycle turns
      // into an immediate dismissal.
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      aria-labelledby={`case-study-${project.slug}`}
      className="fixed inset-0 z-[60] m-auto max-h-[92dvh] w-[min(62rem,94vw)] overflow-hidden rounded-3xl border border-line bg-bg p-0 text-fg shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="animate-modal-in flex max-h-[92dvh] flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            {modalContent.eyebrow} <span className="text-line-strong">/</span>{" "}
            {project.year}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={modalContent.closeLabel}
            className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-glass text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid gap-6 border-b border-line px-5 py-6 sm:px-8 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] uppercase",
                    statusStyles[project.status],
                  )}
                >
                  {projectsContent.statuses[project.status]}
                </span>
                <span className="rounded-full border border-line bg-glass px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-muted uppercase">
                  {project.year}
                </span>
              </div>

              <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                {project.role}
              </p>
              <h2
                id={`case-study-${project.slug}`}
                className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                {project.name}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                {project.tagline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line bg-glass px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-glass px-4 text-[12px] font-medium text-fg transition-colors hover:border-line-strong"
                  >
                    <GithubIcon className="size-3.5" aria-hidden="true" />
                    {modalContent.repository}
                  </a>
                ) : null}
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[12px] font-medium text-[color:var(--accent-contrast)] transition-colors hover:bg-accent-strong"
                  >
                    {modalContent.liveDemo}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="order-first overflow-hidden rounded-2xl border border-line lg:order-last">
              <div className="aspect-[5/3]">
                <ProjectPreview kind={project.preview} />
              </div>
            </div>
          </div>

          <div className="space-y-8 px-5 py-6 sm:px-8">
            <section aria-labelledby="overview-heading">
              <h3
                id="overview-heading"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              >
                <Layers className="size-3.5 text-accent" aria-hidden="true" />
                {modalContent.overview}
              </h3>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted">
                {project.overview}
              </p>
            </section>

            <section aria-labelledby="metrics-heading">
              <h3
                id="metrics-heading"
                className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              >
                {modalContent.metrics}
              </h3>
              <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-line bg-glass px-4 py-3"
                  >
                    <dt className="font-mono text-[9px] tracking-[0.1em] text-faint uppercase">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-base font-semibold tracking-tight text-fg">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="architecture-heading">
              <h3
                id="architecture-heading"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              >
                <Cpu className="size-3.5 text-accent-2" aria-hidden="true" />
                {modalContent.architecture}
              </h3>
              <ol className="mt-4 space-y-3">
                {project.architecture.map((layer, index) => (
                  <li
                    key={layer.label}
                    className="relative flex gap-4 rounded-2xl border border-line bg-bg/35 p-4"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-glass font-mono text-[10px] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-fg">
                        {layer.label}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                        {layer.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="challenges-heading">
              <h3
                id="challenges-heading"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              >
                <CheckCircle2 className="size-3.5 text-accent-3" aria-hidden="true" />
                {modalContent.challenges}
              </h3>
              <ul className="mt-4 space-y-3">
                {project.challenges.map((item) => (
                  <li
                    key={item.challenge}
                    className="rounded-2xl border border-line bg-bg/35 p-4"
                  >
                    <p className="flex gap-2 text-[13px] text-fg">
                      <span className="font-mono text-[10px] text-red-400" aria-hidden="true">
                        →
                      </span>
                      {item.challenge}
                    </p>
                    <p className="mt-2 flex gap-2 text-[12.5px] leading-relaxed text-muted">
                      <span className="font-mono text-[10px] text-accent" aria-hidden="true">
                        ✓
                      </span>
                      {item.solution}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-8">
            <p className="font-mono text-[9.5px] text-faint">
              {modalContent.escHint} · {project.year}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full border border-line bg-glass px-4 py-1.5 text-[11px] text-muted transition-colors hover:text-fg"
            >
              {modalContent.back}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
