# Product Requirements Document — Personal Portfolio (v2)

**Owner:** Rafa Pramudya Susanto  
**Positioning:** AI, computer vision, and 3D physics simulation  
**Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, IntersectionObserver + CSS transitions  
**Status:** Implemented

---

## 1. Overview

### 1.1 Purpose

A fast, accessible personal portfolio that makes one idea legible in the first ten seconds: Rafa builds systems that **see** the physical world and **simulate** how it moves. The site should feel engineered rather than template-generated, with enough depth for a technical reader and enough clarity for a recruiter or competition organiser.

### 1.2 Audience

- **Technical peers and collaborators** evaluating projects, code quality, and follow-through.
- **Recruiters and programme organisers** scanning focus areas, certificates, and contact details.
- **Competition judges** verifying olympiad and certification records.

### 1.3 Principles

1. One clear identity, not a list of unrelated hobbies.
2. Two strong projects beat ten shallow ones.
3. Every claim on screen is backed by a data file that is easy to edit.
4. Motion supports comprehension and respects `prefers-reduced-motion`.
5. The site stays fast on a mid-range phone.

---

## 2. Experience Requirements

### 2.1 Hero

- Full-width opening section with a portrait panel: right column on desktop, top band on mobile and tablet.
- Source portrait: `public/images/hero-bg.jpg` (optimised from the supplied 1024×1536 image), rendered with `next/image`, priority loading, a blur placeholder, and a focal point that keeps the face clear.
- Dark gradient and glass overlays for contrast; glass caption shows the current focus, location/timezone, and an availability marker.
- Headline: **Rafa Pramudya.** followed by a rotating role line:
  - AI & Computer Vision
  - 3D Physics Simulation
  - High School Student
  - Competitive Programmer
- CTAs: **View projects**, **Download CV**, **Contact me**.
- A compact stats strip shows **featured project count**, **certificate count**, and **live Bekasi time**. Counts are derived from data, never hard-coded in the component.
- A scrolling technology marquee closes the section.

### 2.2 About & Stack

- Short biography centred on computer vision, physics simulation, olympiad mathematics, and competitive programming.
- Qualitative focus strip: **AI / Computer Vision**, **3D / Physics Simulation**, **OSN / Math Olympiad**.
- Three working principles: make it visible, respect the frame budget, keep the physics honest.
- Identity card with location, education, focus, current work, monogram, and status.
- Filterable stack grid grouped as: **Languages**, **AI & Vision**, **Simulation**, **Web**.

### 2.3 Journey

- Horizontally scrollable timeline on desktop, vertical list on mobile.
- Multi-select filters: **Competitions**, **Projects**, **Education**, **Work**.
- Seven entries, newest first, covering the two current projects, OSN-P, the regional chemistry quiz, OSN-K, the CP study group, and the first TLX contest.
- No legacy coursework, culinary, games, video-encoding, or edge-vision entries.

### 2.4 Projects — exactly two

Asymmetric 7/5 bento cards on desktop, stacked on mobile. Each card has a procedural preview, status, year, stack, three metrics, repository link, and an accessible case-study modal.

1. **AI Gesture & Object Detection** — Python, OpenCV, MediaPipe, TensorFlow Lite. Preview: animated hand landmarks, object box, confidence badges, and a performance HUD.
2. **3D Physics Engine & Gravity Simulation** — TypeScript, WebGL, Three.js, GLSL. Preview: a live canvas gravity scene with bouncing bodies, perspective floor grid, contact shadows, and solver readouts.

The modal includes overview, measured results, architecture, and challenges/solutions. No secondary project list.

### 2.5 Certificates

- Section renamed **Certificates** (`#certificates`); no rating dashboards, problem counters, solve cadence, or running metrics.
- Four certificates in a filterable gallery with an accessible lightbox:
  - OSN-K Mathematics — 1st Place (May 2024)
  - OSN-P Mathematics — Finalist (Feb 2026)
  - Regional Chemistry Quiz — 2nd Place (Apr 2025)
  - TOKI CP Certification — Intermediate (Dec 2024)
- Each gallery card and lightbox preview uses its matching local photo (`public/images/<certificate-id>.jpg`) as a full-bleed background, cropped through `next/image` with a per-record focal position and a theme-aware gradient overlay for legibility.
- Filters: **Competition**, **Academic**. Keyboard navigation with ← → and native `<dialog>` focus handling.

### 2.6 Contact & Social Presence

Primary channels only:

| Platform | Handle | Note |
| --- | --- | --- |
| WhatsApp | `+62 821-1199-6769` | Primary contact |
| GitHub | `@RafaPramudya` | — |
| LeetCode | `rafapramudya` | Primary coding platform |
| TLX | `rafapramudya` | **Unrated** |

Retired profiles and feeds are removed everywhere, including metadata, JSON-LD, footer, dock, contact panel, OG image, and resume. Only the four channels above remain.

The contact section includes a direct WhatsApp line, availability, good-fit tags, and a WhatsApp composer. The composer is prefilled with `contactContent.composer.defaultMessage`, editable by the owner in `src/data/contact.ts`; visitors can also adjust the message before opening the chat. The CTA opens `https://wa.me/6282111996769` in a new tab. No message is posted through the site, so there is no email form, `mailto:` fallback, or Resend dependency.

---

## 3. Content Model

All user-visible copy lives in `src/data/*`; components hold layout and behaviour only.

| File | Drives |
| --- | --- |
| `profile.ts` | Identity, roles, bio, focus strip, education, socials, nav, site URL |
| `hero.ts` | Greeting, intro, CTAs, portrait config, derived hero stats |
| `about.ts` | About heading, facts, principles, identity card labels |
| `tech-stack.ts` | Stack categories, proficiency notes, marquee |
| `journey.ts` / `timeline.ts` | Journey copy and entries |
| `projects.ts` | The two case studies, preview kind, metrics, architecture, challenges, labels |
| `previews.ts` | Readouts drawn inside the gesture and gravity previews |
| `certificates.ts` | Certificate records, background photo paths/focal positions, filters, lightbox labels |
| `contact.ts` | Contact copy, WhatsApp composer labels, default opening message, good-fit tags |
| `site.ts` | Metadata, JSON-LD topics, header/footer/404 chrome, OG copy, manifest |
| `resume.ts` | Resume-only wording; identity, projects, certificates, and profiles are imported |

Editing a project or certificate must update the hero counts, resume, and related surfaces without component changes.

---

## 4. Design System & Accessibility

- **Theme:** dark-first with a complete light theme; CSS variables for background, text, accents, lines, glass, and shadows.
- **Accents:** emerald primary, sky and violet secondary, warm amber for certificate accents. The portrait's deep red is balanced by emerald UI accents.
- **Surfaces:** glass panels with restrained blur, 1px borders, grid backdrop, and a subtle ambient gradient. No noisy gradient text beyond the headline accent.
- **Typography:** Geist Sans for narrative, Geist Mono for labels, metrics, and system chrome.
- **Motion:** IntersectionObserver-driven scroll reveals using CSS `opacity`/`transform` transitions. Each section heading reveals first, then its panels and cards stagger in with per-item delays; timeline cards reveal as they enter horizontally. Role rotation, dialogs, and previews use CSS animations or component state, and the gravity preview uses a 2D canvas loop. Reveals run once, are skipped entirely under `prefers-reduced-motion`, and show immediately without JavaScript; offscreen sections use `content-visibility` without hiding content permanently.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, labelled controls, native dialogs with focus trapping, keyboard certificate navigation, `aria-hidden` on decorative previews, and AA contrast targets.
- **Responsiveness:** verified at 320 px, 390 px, 768 px, 1024 px, and 1440 px. The hero photo changes from a 4:3 mobile band to a 16:10 tablet band to a 4:5 desktop panel.

---

## 5. Technical Requirements

- **Performance:** Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility and best practices, 100 SEO; desktop ≥ 95 performance.
- **Rendering:** static home page; client islands only for motion, previews, gallery, the WhatsApp composer, and theme controls.
- **Assets:** local portrait and certificate photos served through `next/image` (responsive AVIF/WebP at request time); self-hosted fonts; no heavy 3D dependency for thumbnails.
- **SEO:** metadata, canonical URL, OG image, Person JSON-LD with current profiles, sitemap, robots, web manifest, and a 404 page.
- **Resume:** `public/resume.pdf` is generated from data by `npm run resume`; identity, the WhatsApp number, both projects, four certificates, and GitHub/LeetCode/TLX links are included.
- **Delivery:** Vercel-compatible; the only optional environment variable is `NEXT_PUBLIC_SITE_URL`.

---

## 6. Acceptance Criteria

- [x] Hero portrait renders from the local asset with overlay contrast and blur placeholder.
- [x] Hero project and certificate counts match their data files.
- [x] Exactly two projects are shown, each with a matching animated preview.
- [x] Certificates section contains only the four verified records; no counters or running metrics.
- [x] Certificate cards and lightbox previews use their matching photo as a readable background in both themes.
- [x] Socials are limited to WhatsApp, GitHub, LeetCode, and TLX (marked Unrated).
- [x] No retired coursework, culinary, games, video-encoding, edge-vision, or social references remain.
- [x] Journey timeline and resume reflect the new focus.
- [x] Contact opens WhatsApp at `+62 821-1199-6769` with an editable prefilled message.
- [x] No email contact form, `mailto:` fallback, or Resend dependency remains.
- [x] Typecheck, lint, and production build pass.
- [x] Sections reveal once on scroll with staggered headings and cards; reduced-motion and no-JS users see all content immediately.
- [x] Responsive layout, reduced motion, Lightbox, and case-study modal verified.

## 7. Out of Scope

- Ratings dashboards, problem-solving counters, and running statistics.
- A Web-CLI mode, blog, MDX pipeline, or comment system.
- Live GitHub API integration or CMS-backed content.
- Additional case studies beyond the two featured projects.
