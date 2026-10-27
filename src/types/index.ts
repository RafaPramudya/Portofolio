import type { Localized } from "@/i18n/config";
import type { Resolved } from "@/i18n/resolve";

export type IconName =
  | "trophy"
  | "code"
  | "graduation"
  | "briefcase"
  | "cpu"
  | "flask"
  | "rocket"
  | "pen"
  | "terminal"
  | "layers"
  | "zap"
  | "book";

export type TechCategory = "Languages" | "AI & Vision" | "Simulation" | "Web";

export interface TechItemSource {
  name: string;
  category: TechCategory;
  /** Self-assessed proficiency, 0-100. Used for the visual meter only. */
  level: number;
  note: Localized;
  core?: boolean;
}

export type TimelineCategory =
  | "Competitions"
  | "Projects"
  | "Education"
  | "Work";

export interface TimelineItemSource {
  id: string;
  date: Localized;
  sortDate: string;
  title: Localized;
  org: Localized;
  summary: Localized;
  category: TimelineCategory;
  tags: Localized<string[]>;
  icon: IconName;
  href?: string;
}

export type ProjectStatus = "Live" | "In progress" | "Archived" | "Research";

export type PreviewKind = "gesture" | "gravity";

export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface ProjectSource {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  year: string;
  status: ProjectStatus;
  stack: string[];
  links: ProjectLink;
  overview: Localized;
  preview: PreviewKind;
  role: Localized;
  metrics: { label: Localized; value: string }[];
  architecture: { label: Localized; detail: Localized }[];
  challenges: { challenge: Localized; solution: Localized }[];
  featured?: boolean;
}

export type CertificateCategory = "Academic" | "Competition" | "Award";

export interface CertificateSource {
  id: string;
  title: Localized;
  issuer: Localized;
  date: Localized;
  category: CertificateCategory;
  description: Localized;
  credentialId: string;
  accent: "emerald" | "sky" | "violet" | "amber";
  image?: string;
  imagePosition?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: "github" | "leetcode" | "tlx" | "whatsapp";
  note?: Localized | string;
}

/** Rendered shapes, with every translation pair already collapsed. */
export type TechItem = Resolved<TechItemSource>;
export type TimelineItem = Resolved<TimelineItemSource>;
export type Project = Resolved<ProjectSource>;
export type Certificate = Resolved<CertificateSource>;
