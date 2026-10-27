import type { TechCategory, TechItemSource } from "@/types";
import { l } from "@/i18n/config.ts";

export const techCategories: TechCategory[] = [
  "Languages",
  "AI & Vision",
  "Simulation",
  "Web",
];

/** Display labels for the canonical category values. */
export const techCategoryLabels = l<Record<TechCategory, string>>(
  {
    Languages: "Bahasa",
    "AI & Vision": "AI & Visi",
    Simulation: "Simulasi",
    Web: "Web",
  },
  {
    Languages: "Languages",
    "AI & Vision": "AI & Vision",
    Simulation: "Simulation",
    Web: "Web",
  },
);

/** Extra labels shown in the scrolling headline strip under the hero. */
export const marqueeTech = [
  "Python",
  "OpenCV",
  "MediaPipe",
  "TensorFlow Lite",
  "PyTorch",
  "TypeScript",
  "Three.js",
  "WebGL",
  "GLSL",
  "Next.js",
  "React",
  "Git",
];

export const techGridContent = {
  title: l("Stack & alat", "Stack & tools"),
  hint: l(
    "Kedalaman penilaian sendiri · saring per kategori",
    "Self-assessed depth · filter by category",
  ),
  filterLabel: l(
    "Saring tech stack berdasarkan kategori",
    "Filter tech stack by category",
  ),
  coreTitle: l("Stack inti", "Core stack"),
};

export const techStack: TechItemSource[] = [
  {
    name: "Python",
    category: "Languages",
    level: 88,
    note: l("Perkakas · ML · skrip", "Tooling · ML · scripting"),
    core: true,
  },
  {
    name: "TypeScript",
    category: "Languages",
    level: 85,
    note: l("Web · WebGL · perkakas", "Web · WebGL · tooling"),
    core: true,
  },
  {
    name: "C++",
    category: "Languages",
    level: 80,
    note: l("Algoritma · performa", "Algorithms · performance"),
    core: true,
  },
  {
    name: "JavaScript",
    category: "Languages",
    level: 86,
    note: l("API browser · Node", "Browser APIs · Node"),
  },
  {
    name: "GLSL",
    category: "Languages",
    level: 70,
    note: l("Shading · instansiasi", "Shading · instancing"),
  },
  {
    name: "SQL",
    category: "Languages",
    level: 65,
    note: l("Postgres · rencana kueri", "Postgres · query plans"),
  },

  {
    name: "OpenCV",
    category: "AI & Vision",
    level: 86,
    note: l("Capture · filter · pelacakan", "Capture · filters · tracking"),
    core: true,
  },
  {
    name: "MediaPipe",
    category: "AI & Vision",
    level: 82,
    note: l("Landmark · graf gestur", "Landmarks · gesture graphs"),
    core: true,
  },
  {
    name: "TensorFlow Lite",
    category: "AI & Vision",
    level: 74,
    note: l("Inferensi on-device", "On-device inference"),
  },
  {
    name: "PyTorch",
    category: "AI & Vision",
    level: 72,
    note: l("Pelatihan · evaluasi", "Training · evaluation"),
  },
  {
    name: "NumPy",
    category: "AI & Vision",
    level: 84,
    note: l("Array · pra-pemrosesan", "Arrays · preprocessing"),
  },

  {
    name: "Three.js",
    category: "Simulation",
    level: 82,
    note: l("Scene graph · instansiasi", "Scene graph · instancing"),
    core: true,
  },
  {
    name: "WebGL",
    category: "Simulation",
    level: 76,
    note: l("Buffer · render loop", "Buffers · render loop"),
    core: true,
  },
  {
    name: "Rigid-body dynamics",
    category: "Simulation",
    level: 78,
    note: l("Impuls · kontak", "Impulses · contacts"),
  },
  {
    name: "Numerical integration",
    category: "Simulation",
    level: 75,
    note: l("Langkah tetap · stabilitas", "Fixed steps · stability"),
  },
  {
    name: "Web Workers",
    category: "Simulation",
    level: 72,
    note: l("Solver off-main-thread", "Off-main-thread solver"),
  },

  {
    name: "Next.js",
    category: "Web",
    level: 84,
    note: l("App Router · RSC", "App Router · RSC"),
    core: true,
  },
  {
    name: "React",
    category: "Web",
    level: 86,
    note: l("Hooks · UI konkuren", "Hooks · concurrent UI"),
    core: true,
  },
  {
    name: "Tailwind CSS",
    category: "Web",
    level: 89,
    note: l("Sistem desain", "Design systems"),
    core: true,
  },
  {
    name: "Node.js",
    category: "Web",
    level: 78,
    note: l("Tooling · rute API", "Tooling · API routes"),
  },
  {
    name: "Git",
    category: "Web",
    level: 88,
    note: l("Rebase · worktree", "Rebase · worktrees"),
  },
];
