import { profile } from "@/data/profile";
import { l } from "@/i18n/config.ts";

/**
 * Site-wide copy: metadata, navigation chrome, footer, 404, and the OG card.
 * Change text here rather than inside components.
 */
export const siteMeta = {
  title: l(
    `${profile.name} — AI, Visi Komputer & Simulasi 3D`,
    `${profile.name} — AI, Computer Vision & 3D Simulation`,
  ),
  titleTemplate: `%s · ${profile.name}`,
  applicationName: `${profile.name} — Portfolio`,
  description: l(
    "Portofolio pengembang AI dan visi komputer: deteksi gestur dan objek real-time, sandbox gravitasi 3D, olimpiade informatika, serta competitive programming.",
    "Portfolio of an AI and computer-vision developer: real-time gesture and object detection, a 3D gravity sandbox, the informatics olympiad, and competitive programming.",
  ),
  keywords: l(
    [
      "kecerdasan artifisial",
      "visi komputer",
      "pengenalan gestur",
      "deteksi objek",
      "simulasi fisika",
      "grafika 3D",
      "WebGL",
      "Python",
      "OpenCV",
      "portofolio",
      profile.name,
    ],
    [
      "artificial intelligence",
      "computer vision",
      "gesture recognition",
      "object detection",
      "physics simulation",
      "3D graphics",
      "WebGL",
      "Python",
      "OpenCV",
      "portfolio",
      profile.name,
    ],
  ),
  ogAlt: l(
    `${profile.name} — AI, Visi Komputer & Simulasi 3D`,
    `${profile.name} — AI, Computer Vision & 3D Simulation`,
  ),
  jsonLd: {
    locality: profile.city,
    country: profile.country,
    knowsAbout: l(
      [
        "Visi komputer",
        "Kecerdasan artifisial",
        "Pengenalan gestur",
        "Simulasi fisika 3D",
        "WebGL",
        "Competitive programming",
      ],
      [
        "Computer vision",
        "Artificial intelligence",
        "Gesture recognition",
        "3D physics simulation",
        "WebGL",
        "Competitive programming",
      ],
    ),
  },
  themeColors: [
    { media: "(prefers-color-scheme: dark)", color: "#07070a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
  ],
};

export const manifestContent = {
  name: `${profile.name} — Portfolio`,
  shortName: profile.shortName,
  description: "AI, computer vision, and 3D simulation portfolio.",
  startUrl: "/",
  display: "standalone",
  backgroundColor: "#07070a",
  themeColor: "#07070a",
  icon: {
    src: "/icon.svg",
    sizes: "any",
    type: "image/svg+xml",
  },
} as const;

export const shellContent = {
  skipToContent: l("Lewati ke konten", "Skip to content"),
  primaryNavLabel: l("Navigasi utama", "Primary"),
  mobileNavLabel: l("Navigasi seluler", "Mobile"),
  homeLinkSuffix: l("kembali ke atas", "back to top"),
  resumeLabel: l("CV", "Resume"),
  getInTouchLabel: l("Hubungi saya", "Get in touch"),
  openMenuLabel: l("Buka menu navigasi", "Open navigation menu"),
  closeMenuLabel: l("Tutup menu navigasi", "Close navigation menu"),
  themeToggleLabel: l("Ganti tema warna", "Toggle color theme"),
  socialDockLabel: l("Tautan sosial", "Social links"),
  backToTopLabel: l("Kembali ke atas", "Back to top"),
  languageLabel: l("Pilih bahasa", "Choose language"),
  resumeHint: l("Unduh CV dalam PDF", "Download the CV as PDF"),
  footer: {
    eyebrow: l("Akhir transmisi", "End of transmission"),
    headline: l(
      "Mari bangun sesuatu yang bisa melihat — atau sesuatu yang bergerak.",
      "Let's build something that sees — or something that moves.",
    ),
    navigateHeading: l("Navigasi", "Navigate"),
    elsewhereHeading: l("Di tempat lain", "Elsewhere"),
    status: l("Semua sistem normal", "All systems nominal"),
    builtWithLabel: l("Dibangun dengan", "Built with"),
    builtWith: ["Next.js", "Tailwind", "React"],
    rights: l("Hak cipta dilindungi.", "All rights reserved."),
  },
  notFound: {
    eyebrow: l("exit code 404", "exit code 404"),
    title: l("Frame tidak ditemukan.", "Frame not found."),
    description: l(
      "Rute yang kamu minta berada di luar viewport. Coba kembali ke titik masuk.",
      "The route you requested fell outside the viewport. Try the entry point instead.",
    ),
    cta: l("Kembali ke portofolio", "Back to portfolio"),
  },
  og: {
    badge: l("Portofolio / 2026", "Portfolio / 2026"),
    eyebrow: l("AI · Visi · Simulasi", "AI · Vision · Simulation"),
    headline: l("Mesin yang melihat.", "Machines that see."),
    headlineAccent: l("Dunia yang jatuh.", "Worlds that fall."),
  },
};
