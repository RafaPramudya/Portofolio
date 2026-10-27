"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/providers/content-provider";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Spotlight } from "@/components/ui/spotlight";
import { Reveal } from "@/components/ui/reveal";
import { ProjectPreview } from "@/components/projects/project-preview";
import { ProjectModal } from "@/components/projects/project-modal";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-accent/30 bg-accent/10 text-accent",
  "In progress": "border-accent-2/30 bg-accent-2/10 text-accent-2",
  Research: "border-accent-3/30 bg-accent-3/10 text-accent-3",
  Archived: "border-line-strong bg-glass text-muted",
};

const spans = ["lg:col-span-7", "lg:col-span-5"];

function ProjectCard({
  project,
  index,
  className,
  onOpen,
}: {
  project: Project;
  index: number;
  className?: string;
  onOpen: (project: Project) => void;
}) {
  const { projectsContent } = useContent();

  return (
    <article className={cn("group h-full", className)}>
      <Spotlight className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 group-hover:border-line-strong">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`${projectsContent.card.openPrefix} ${project.name} ${projectsContent.card.openSuffix} — ${String(index + 1).padStart(2, "0")}, ${projectsContent.statuses[project.status]}, ${project.year}`}
          className="relative block aspect-[16/9] w-full overflow-hidden text-left"
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ProjectPreview kind={project.preview} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b]/80 via-transparent to-transparent" />

          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-black/35 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/60 uppercase backdrop-blur">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase backdrop-blur",
                statusStyles[project.status],
              )}
            >
              {projectsContent.statuses[project.status]}
            </span>
          </div>

          <span className="absolute top-3.5 right-3.5 rounded-full border border-white/10 bg-black/35 px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] text-white/60 uppercase backdrop-blur">
            {project.year}
          </span>
        </button>

        <div className="relative z-[1] flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-balance sm:text-xl">
              {project.name}
            </h3>
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-bg/40 px-1.5 py-0.5 font-mono text-[9px] text-faint"
              >
                {tech}
              </li>
            ))}
            {project.stack.length > 4 ? (
              <li className="rounded-md border border-line bg-bg/40 px-1.5 py-0.5 font-mono text-[9px] text-faint">
                +{project.stack.length - 4}
              </li>
            ) : null}
          </ul>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <p className="text-sm font-semibold tracking-tight text-fg">
                  {metric.value}
                </p>
                <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.1em] text-faint uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-3">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted transition-colors hover:text-fg"
                >
                  <GithubIcon className="size-3.5" aria-hidden="true" />
                  {projectsContent.card.code}
                </a>
              ) : null}
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted transition-colors hover:text-fg"
                >
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  {projectsContent.card.demo}
                </a>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {projectsContent.card.caseStudy}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Spotlight>
    </article>
  );
}

export function Projects() {
  const { featuredProjects, projectsContent } = useContent();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index={projectsContent.index}
          eyebrow={projectsContent.eyebrow}
          title={
            <>
              {projectsContent.titleLead}{" "}
              <span className="text-gradient">{projectsContent.titleAccent}</span>
            </>
          }
          description={projectsContent.description}
        >
          <a
            href={projectsContent.repositories.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-glass px-4 text-[12px] text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <GithubIcon className="size-3.5" aria-hidden="true" />
            {projectsContent.repositories.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              className={cn("md:col-span-1", spans[index])}
              delay={index * 120}
            >
              <ProjectCard
                project={project}
                index={index}
                onOpen={setActive}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {active ? (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      ) : null}
    </section>
  );
}
