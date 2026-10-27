# Personal Portfolio

A high-performance personal portfolio for an AI and computer-vision developer, focused on real-time gesture detection, 3D physics simulation, olympiad mathematics, and competitive programming. Built with Next.js App Router, TypeScript, Tailwind CSS v4, and IntersectionObserver-driven CSS reveals.

> **Placeholder content:** the projects, metrics, links, and certificates are realistic samples, not verified claims. Everything editable lives in `src/data/*` — see [Editing content](#editing-content).

## Features

- Bilingual Indonesian (default) and English site with locale-prefixed routes (`/id`, `/en`), localized metadata, OG images, and per-language CVs.
- Photo-backed hero with a local portrait, glass caption, rotating roles, derived project/certificate counts, live Bekasi time, and downloadable CV.
- Category-filtered tech stack centred on computer vision, simulation, and web tooling.
- Dual-orientation journey timeline with multi-select filters.
- Staggered scroll reveals: section headings, panels, and cards fade and lift into view with per-item delays, disabled under reduced motion and with JavaScript off.
- Exactly two featured projects with procedural previews:
  - gesture tracking and object detection (`src/components/projects/project-preview.tsx`);
  - a live canvas gravity sandbox with bouncing rigid bodies.
- Accessible case-study modals with architecture and challenge notes.
- Photo-backed certificate-only gallery with category filters, keyboard navigation, and a native `<dialog>` lightbox.
- WhatsApp contact panel with an editable opening message and a direct `wa.me` link.
- Dark-first theme engine with light mode, persistent social dock (GitHub, LeetCode, TLX, WhatsApp), generated OG image, JSON-LD, sitemap, and manifest.
- Accessibility: semantic landmarks, skip link, focus-visible rings, native dialog focus trapping, reduced-motion support.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Motion | IntersectionObserver reveals + CSS transitions, plus a small canvas simulation |
| Icons | Lucide + hand-built brand marks |
| Contact | WhatsApp click-to-chat via `wa.me` |
| Fonts | Geist Sans / Geist Mono via `next/font`, Latin-subset and self-hosted |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # production build
npm run resume      # regenerate the placeholder PDF
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata, OG, sitemap, robots |

The WhatsApp number and opening message are content, not environment variables.

## Editing content

| File | Drives |
| --- | --- |
| `src/data/profile.ts` | Name, headline, roles, bio, focus strip, availability, education, location, socials, nav, site URL |
| `src/data/site.ts` | Page metadata + JSON-LD, header/footer chrome, skip link, 404 copy, OG card, web manifest |
| `src/data/hero.ts` | Hero greeting, intro, CTAs, portrait path/focal point/blur, derived stats |
| `src/data/about.ts` | About heading, facts, principles, monogram card labels |
| `src/data/tech-stack.ts` | Tech grid categories, proficiency meters, notes, marquee, filter/counter labels |
| `src/data/journey.ts` | Journey heading, filter categories, entry counts, scroll and empty-state labels |
| `src/data/timeline.ts` | Journey entries |
| `src/data/projects.ts` | The two case studies, preview type, metrics, architecture, challenges, card/modal labels |
| `src/data/previews.ts` | Every caption and readout drawn inside the procedural previews |
| `src/data/certificates.ts` | Certificate records, background photo paths and focal positions, gallery filters, lightbox labels |
| `src/data/contact.ts` | Contact heading, WhatsApp composer labels, default opening message, good-fit tags |
| `src/data/resume.ts` | Copy for the generated CV: section titles, profile paragraphs, skill rows, counts, footer note |
| `src/data/ui.ts` | Shared control labels such as “All” and “clear” |

Every user-visible string — headings, eyebrows, button labels, placeholders, aria labels, empty states, metadata, 404 copy, footer text, and preview annotations — is defined in these files. Components only hold layout, class names, and icon choices.

### WhatsApp contact

The number and display label live in `profile.whatsapp` in `src/data/profile.ts`; the prefilled opening message lives in `contactContent.composer.defaultMessage` in `src/data/contact.ts`. Visitors can edit that message in the composer before the chat opens. `src/lib/whatsapp.ts` builds the `wa.me` URL, so changing the number or message needs no component edits.

### Localization

Locales live in `src/i18n/config.ts` (`id` is the default, `en` is secondary). Translation pairs use `l(id, en)` in the data files; `src/i18n/content.ts` resolves one locale into the shape components render, so the browser never downloads the other language. `src/proxy.ts` sends the bare root to `/id` and redirects unknown top-level paths into the default locale. The language switcher swaps the locale prefix while preserving the current section hash.

Design tokens (colors, accents, radii, animations) are CSS variables at the top of `src/app/globals.css`. Change `--accent`, `--accent-2`, `--accent-3` to re-skin the whole site.

### Scroll reveals

Sections appear as they enter the viewport. The `Reveal` wrapper (`src/components/ui/reveal.tsx`) marks its element with `data-revealed` the first time an IntersectionObserver sees it; the fade-and-lift transition lives in `.reveal` in `src/app/globals.css`, so content stays in the document and runs on the compositor. Section headings reveal automatically through `SectionHeading`; About panels, project cards, timeline cards, certificate cards, and contact panels pass a `delay` to stagger siblings that enter together.

Reveals are one-shot, so scrolling back up does not replay them. `prefers-reduced-motion` removes the transition and shows all content immediately, while `@media (scripting: none)` plus a `<noscript>` style block in the locale layout keep everything visible without JavaScript. Offscreen sections still use `content-visibility: auto`; the observer fires when they approach the viewport.

### Replacing the portrait

The hero uses `public/images/hero-bg.jpg` (1024×1536) with a focal point of `50% 24%`. To use another photo:

1. Export a portrait JPEG/WebP at roughly 1000 px wide.
2. Replace `public/images/hero-bg.jpg`.
3. Update `heroContent.photo` in `src/data/hero.ts` — `src`, `width`, `height`, `alt`, `focal`, and a small `blurDataURL`.
4. Adjust the panel aspect ratios in `src/components/sections/hero.tsx` if the new photo needs a different crop.

### Replacing the resumes

`public/resume-id.pdf` and `public/resume-en.pdf` are valid one-page placeholders. Run `npm run resume` to regenerate both from the data layer: identity, education, featured projects, profiles, and certificates all come from `src/data/profile.ts`, `projects.ts`, and `certificates.ts`, while the resume-only wording (section titles, profile paragraphs, skill rows) lives in `src/data/resume.ts`.

To ship designed CVs instead, overwrite the two files and delete `scripts/generate-resume.mjs` plus the `resume` script if you no longer need it. The active download link is selected by locale in `src/i18n/config.ts` (`resumeUrls`).

### Project previews

The two thumbnails are hand-built in `src/components/projects/project-preview.tsx`:

- `GesturePreview` is an SVG scene with 21 landmarks, an object box, and a performance HUD.
- `GravityPreview` is a dependency-free 2D canvas simulating perspective-projected rigid bodies with gravity, restitution, contact shadows, and a floor grid.

Reduced motion draws a static gravity frame and disables the gesture scan. All readable captions live in `src/data/previews.ts`. Add a new `PreviewKind` in `src/types/index.ts` if you want another scene.

### Static assets

Two files are designed rather than data-driven and can simply be replaced: `src/app/icon.svg` (favicon, served at `/icon.svg`) and the generated `public/resume-id.pdf` / `public/resume-en.pdf`. The hero portrait is described above.

Certificate photos live in `public/images` and are referenced per record by `image` in `src/data/certificates.ts`. Each image fills its card and lightbox preview through `next/image` with `object-cover`; use the optional `imagePosition` value (for example `"50% 70%"`) to choose which part of a portrait photo stays in frame. A theme-aware gradient over the photo keeps the certificate text readable in both themes.

## Deployment

The project is Vercel-ready:

```bash
git init
git add .
git commit -m "feat: portfolio"
```

Push to a GitHub remote, import the repository on Vercel, and set the environment variables. No custom build settings are needed.

Lighthouse notes: the page is statically rendered, motion is confined to client islands, fonts are self-hosted, and the only raster asset is the prioritised hero portrait (155 KB source). The gravity preview pauses its animation when offscreen.

## Roadmap

- **Phase 1** — Web-CLI mode (`cat bio.txt`, `ls projects/`) for keyboard users.
- **Phase 2** — MDX blog with syntax highlighting, KaTeX, and experiment write-ups.

Both are intentionally out of scope for this build.

## Structure

```
src/app/          routes, metadata routes, OG image
src/components/   layout, sections, projects, forms, ui primitives
src/data/         all portfolio content
src/lib/          cn helper + WhatsApp link builder
scripts/          data-driven resume PDF generator
public/           static assets (hero and certificate photos, generated resume PDF)
```
