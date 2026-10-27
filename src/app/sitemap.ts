import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { locales, resumeUrls } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );

  return [
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    })),
    ...locales.map((locale) => ({
      url: `${siteUrl}${resumeUrls[locale]}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
