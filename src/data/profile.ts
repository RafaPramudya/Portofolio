import type { SocialLink } from "@/types";
import { l } from "../i18n/config.ts";

/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT ME — everything on the site is driven by these files.
 *  Values below are realistic placeholders, not real claims.
 *  Every visitor-facing string is a `l(id, en)` pair.
 * ─────────────────────────────────────────────────────────────
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://rafapramudya.dev";

const whatsappNumber = "6282111996769";

export const profile = {
  name: "Rafa Pramudya Susanto",
  shortName: "Rafa",
  initials: "RPS",
  headline: {
    lead: "Rafa",
    accent: "Pramudya.",
  },
  roles: l(
    [
      "AI & Visi Komputer",
      "Simulasi Fisika",
      "Pelajar SMA",
      "Programmer Kompetitif",
    ],
    [
      "AI & Computer Vision",
      "3D Physics Simulation",
      "High School Student",
      "Competitive Programmer",
    ],
  ),
  roleSummary: l(
    "AI, Visi Komputer & Simulasi 3D",
    "AI, Computer Vision & 3D Simulation",
  ),
  location: "Bekasi, Jawa Barat, Indonesia",
  city: "Bekasi",
  country: "ID",
  timezone: "GMT+7",
  timeZone: "Asia/Jakarta",
  whatsapp: {
    /** wa.me format: country code, no leading plus. */
    number: whatsappNumber,
    display: "+62 821-1199-6769",
    href: `https://wa.me/${whatsappNumber}`,
  },
  availability: l("Masih bernafas hingga saat ini", "Still breathing to this day"),
  bio: l(
    [
      "Saya membangun sistem visi komputer yang mengubah webcam menjadi antarmuka, serta simulasi fisika 3D tempat gravitasi, tumbukan, dan konstrain bekerja sebagaimana mestinya.",
      "Saya pelajar SMA di Bekasi yang membagi waktu antara Sekolah (TKA & UTBK), OSN Informatika, competitive programming di TLX dan LeetCode, serta merilis eksperimen open-source dengan Python, TypeScript, dan WebGL.",
    ],
    [
      "I build computer-vision systems that turn a webcam into an interface, and 3D physics simulations where gravity, collisions, and constraints behave the way they should.",
      "I'm a high-school student in Bekasi who splits my time between school (TKA & UTBK), the Informatics Olympiad (OSN), competitive programming on TLX and LeetCode, and shipping open-source experiments with Python, TypeScript, and WebGL.",
    ],
  ),
  education: {
    school: "SMA Negeri 9 Bekasi",
    detail: l(
      "XII F5 / Fisika, Kimia, & Informatika",
      "XII F5 / Physics, Chemistry, & Informatics",
    ),
    focus: l("Matematika & Ilmu Komputer", "Mathematics & Computer Science"),
    graduation: l("Angkatan 26", "26th Class"),
  },
  currentFocus: l(
    "Pengenalan gestur & simulasi gravitasi",
    "Gesture recognition & gravity simulation",
  ),
  highlight: l(
    "Buat terlihat dulu, lalu buat cepat.",
    "Make it visible, then make it fast.",
  ),
  stats: [
    {
      label: l("Visi komputer", "Computer vision"),
      value: "AI",
      suffix: "",
    },
    {
      label: l("Simulasi fisika", "Physics simulation"),
      value: "3D",
      suffix: "",
    },
    {
      label: l("Olimpiade informatika", "Informatics olympiad"),
      value: "OSN",
      suffix: "",
    },
  ],
};

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@RafaPramudya",
    href: "https://github.com/RafaPramudya",
    icon: "github",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    handle: "rafapramudya",
    href: "https://leetcode.com/u/RafaPramudya/",
    icon: "leetcode",
  },
  {
    id: "tlx",
    label: "TLX",
    handle: "rafapramudya",
    href: "https://tlx.toki.id/profiles/Udyaaa",
    icon: "tlx",
    note: l("Belum berperingkat", "Unrated"),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: profile.whatsapp.display,
    href: profile.whatsapp.href,
    icon: "whatsapp",
  },
];

export const navItems = [
  { label: l("Tentang", "About"), href: "#about" },
  { label: l("Perjalanan", "Journey"), href: "#journey" },
  { label: l("Proyek", "Projects"), href: "#projects" },
  { label: l("Sertifikat", "Certificates"), href: "#certificates" },
  { label: l("Kontak", "Contact"), href: "#contact" },
];
