import {
  localeMeta,
  locales,
  otherLocale,
  resumeUrls,
  type Locale,
} from "@/i18n/config";
import { resolve } from "@/i18n/resolve";

import { navItems, profile, siteUrl, socials } from "@/data/profile";
import { shellContent, siteMeta } from "@/data/site";
import { heroContent } from "@/data/hero";
import { aboutContent } from "@/data/about";
import { journeyContent } from "@/data/journey";
import { timeline } from "@/data/timeline";
import {
  featuredProjects,
  projects,
  projectsContent,
} from "@/data/projects";
import { certificates, certificatesContent } from "@/data/certificates";
import { contactContent } from "@/data/contact";
import { previewContent } from "@/data/previews";
import {
  marqueeTech,
  techCategories,
  techCategoryLabels,
  techGridContent,
  techStack,
} from "@/data/tech-stack";
import { uiLabels } from "@/data/ui";

/**
 * One resolved copy tree per locale. Only this locale's strings are handed to
 * the client, so the browser never downloads the other language.
 */
export function getContent(locale: Locale) {
  return {
    locale,
    locales,
    localeMeta,
    other: otherLocale(locale),
    resumeUrl: resumeUrls[locale],
    siteUrl,

    profile: resolve(profile, locale),
    socials: resolve(socials, locale),
    navItems: resolve(navItems, locale),
    siteMeta: resolve(siteMeta, locale),
    shellContent: resolve(shellContent, locale),

    heroContent: resolve(heroContent, locale),
    aboutContent: resolve(aboutContent, locale),

    journeyContent: resolve(journeyContent, locale),
    timeline: resolve(timeline, locale),

    projects: resolve(projects, locale),
    featuredProjects: resolve(featuredProjects, locale),
    projectsContent: resolve(projectsContent, locale),

    certificates: resolve(certificates, locale),
    certificatesContent: resolve(certificatesContent, locale),

    contactContent: resolve(contactContent, locale),
    previewContent: resolve(previewContent, locale),

    techStack: resolve(techStack, locale),
    techCategories,
    techCategoryLabels: resolve(techCategoryLabels, locale),
    marqueeTech,
    techGridContent: resolve(techGridContent, locale),

    uiLabels: resolve(uiLabels, locale),
  };
}

export type Content = ReturnType<typeof getContent>;
