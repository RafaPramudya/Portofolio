import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans, GeistMono } from "@/lib/fonts";
import "../globals.css";

import {
  defaultLocale,
  isLocale,
  locales,
  localeMeta,
  type Locale,
} from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { siteMeta } from "@/data/site";
import { siteUrl } from "@/data/profile";
import { ContentProvider } from "@/components/providers/content-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Backdrop } from "@/components/layout/backdrop";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialDock } from "@/components/layout/social-dock";
import { Footer } from "@/components/layout/footer";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const { profile, siteMeta: copy } = getContent(locale);
  const languages = Object.fromEntries(
    locales.map((item) => [item, `${siteUrl}/${item}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: copy.titleTemplate,
    },
    description: copy.description,
    applicationName: copy.applicationName,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: copy.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `${siteUrl}/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeMeta[item].ogLocale),
      url: `${siteUrl}/${locale}`,
      siteName: copy.applicationName,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteMeta.themeColors,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LocaleParams>) {
  const { locale: raw } = await params;

  if (!isLocale(raw)) notFound();

  const locale = raw;
  const content = getContent(locale);
  const { profile, shellContent, siteMeta: copy, socials } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${siteUrl}/${locale}`,
    telephone: `+${profile.whatsapp.number}`,
    jobTitle: profile.roleSummary,
    description: copy.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: copy.jsonLd.locality,
      addressCountry: copy.jsonLd.country,
    },
    sameAs: socials
      .filter(
        (social) => social.id !== "whatsapp" && social.href.startsWith("http"),
      )
      .map((social) => social.href),
    knowsAbout: copy.jsonLd.knowsAbout,
    inLanguage: localeMeta[locale].htmlLang,
  };

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ContentProvider value={content}>
          <ThemeProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[color:var(--accent-contrast)]"
            >
              {shellContent.skipToContent}
            </a>

            <Backdrop />
            <SiteHeader />

            <main id="main" className="relative">
              {children}
            </main>

            <Footer />
            <SocialDock />
          </ThemeProvider>
        </ContentProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
