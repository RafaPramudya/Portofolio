import type { ProjectSource } from "@/types";
import { socials } from "./profile.ts";
import { l } from "../i18n/config.ts";

const githubProfile =
  socials.find((social) => social.id === "github")?.href ?? "#";

/**
 * EDIT ME — the two featured case studies. Swap links for real repositories
 * when available. Everything else on the page is derived from these entries.
 */
export const projects: ProjectSource[] = [
  {
    slug: "ai-gesture-object-detection",
    name: l("Deteksi Gestur & Objek AI", "AI Gesture & Object Detection"),
    tagline: l(
      "Webcam menjadi antarmuka — tangan dan objek, dibaca secara real-time.",
      "A webcam becomes an interface — hands and objects, read in real time.",
    ),
    description: l(
      "Pipeline visi komputer yang melacak landmark tangan dan mendeteksi objek sehari-hari dari feed kamera langsung, lalu memetakan hasilnya ke gestur. Semuanya berjalan on-device pada 31 FPS.",
      "A computer-vision pipeline that tracks hand landmarks and detects everyday objects from a live camera feed, then maps the result to gestures. Everything runs on-device at 31 FPS.",
    ),
    year: "2026",
    status: "Live",
    stack: ["Python", "OpenCV", "MediaPipe", "TensorFlow Lite"],
    links: {
      github: "https://github.com/RafaPramudya/gesture-object-detection",
    },
    overview: l(
      "Sebagian besar demo gestur berhenti di kotak pembatas yang digambar di frame webcam. Saya ingin loop lengkapnya: capture, landmark, klasifikasi, dan UI yang bereaksi tanpa jeda terasa. Pipeline menjaga jalur kamera tetap zero-copy, menghaluskan jitter landmark dengan jendela temporal pendek, dan menjalankan detektor on-device sehingga tidak ada frame yang meninggalkan mesin.",
      "Most gesture demos stop at a bounding box drawn on a webcam frame. I wanted the full loop: capture, landmarks, classification, and a UI that reacts without a noticeable delay. The pipeline keeps the camera path zero-copy, smooths landmark jitter with a short temporal window, and runs the detector on-device so no frame leaves the machine.",
    ),
    preview: "gesture",
    role: l(
      "Solo — pipeline, integrasi model, antarmuka",
      "Solo — pipeline, model integration, interface",
    ),
    metrics: [
      { label: l("Laju", "Throughput"), value: "31 FPS" },
      { label: l("Ujung ke ujung", "End-to-end"), value: "42 ms" },
      { label: l("Gestur", "Gestures"), value: "12" },
      { label: l("Panggilan cloud", "Cloud calls"), value: "0" },
    ],
    architecture: [
      {
        label: l("Capture & pra-pemrosesan", "Capture & pre-processing"),
        detail: l(
          "OpenCV memegang loop kamera dengan antrean frame terbatas. Frame diubah ukurannya dan dinormalisasi sekali, lalu dibagi ke jalur landmark dan objek.",
          "OpenCV owns the camera loop with a bounded frame queue. Frames are resized and normalized once, then shared with both the landmark and object paths.",
        ),
      },
      {
        label: l("Landmark tangan", "Hand landmarks"),
        detail: l(
          "MediaPipe mengembalikan 21 landmark per tangan. Jendela penghalusan eksponensial pendek menghapus jitter tanpa menambah lag yang terlihat pada gestur cepat.",
          "MediaPipe returns 21 landmarks per hand. A short exponential smoothing window removes jitter without adding visible lag to fast gestures.",
        ),
      },
      {
        label: l("Klasifikasi gestur", "Gesture classifier"),
        detail: l(
          "Model TensorFlow Lite kecil mengklasifikasikan urutan landmark menjadi dua belas gestur. Batas keyakinan dan debounce mencegah pose sesaat ikut terpicu.",
          "A small TensorFlow Lite model classifies landmark sequences into twelve gestures. A confidence floor and debounce keep transient poses from firing.",
        ),
      },
      {
        label: l("Deteksi objek & UI", "Object detection & UI"),
        detail: l(
          "Detektor ringan memberi label objek umum di frame yang sama. Antarmuka menggambar kedua lapisan dan menyediakan aliran event gestur untuk aplikasi lain.",
          "A lightweight detector labels common objects in the same frame. The interface draws both layers and exposes a gesture event stream for other apps.",
        ),
      },
    ],
    challenges: [
      {
        challenge: l(
          "Landmark bergetar beberapa piksel meskipun tangan diam.",
          "Landmarks jittered by a few pixels even when the hand was still.",
        ),
        solution: l(
          "Menerapkan exponential moving average per landmark dan menyaring event gestur dengan batas keyakinan plus jendela debounce pendek.",
          "Applied an exponential moving average per landmark and gated gesture events with a confidence floor plus a short debounce window.",
        ),
      },
      {
        challenge: l(
          "Pengenalan anjlok di bawah pencahayaan ruangan yang hangat dan berkontras rendah.",
          "Recognition collapsed under warm, low-contrast room lighting.",
        ),
        solution: l(
          "Menambahkan adaptive histogram equalization sebelum inferensi dan mengumpulkan dataset lokal kecil di kondisi pencahayaan yang sama.",
          "Added adaptive histogram equalization before inference and collected a small local dataset under the same lighting conditions.",
        ),
      },
      {
        challenge: l(
          "Versi pertama tertinggal hampir 200 ms di belakang kamera.",
          "The first version lagged behind the camera by almost 200 ms.",
        ),
        solution: l(
          "Memisahkan capture dari inferensi dengan antrean drop-oldest dan memindahkan pasca-pemrosesan keluar dari main thread, menurunkan latensi ke 42 ms.",
          "Decoupled capture from inference with a drop-oldest queue and moved post-processing off the main thread, bringing latency down to 42 ms.",
        ),
      },
    ],
    featured: true,
  },
  {
    slug: "3d-physics-gravity-simulation",
    name: l(
      "Mesin Fisika 3D & Simulasi Gravitasi",
      "3D Physics Engine & Gravity Simulation",
    ),
    tagline: l(
      "Gravitasi, kontak, dan konstrain — diselesaikan frame demi frame di browser.",
      "Gravity, contacts, and constraints — solved frame by frame in the browser.",
    ),
    description: l(
      "Sandbox rigid-body 3D dengan integrator buatan sendiri, respons tumbukan berbasis impuls, dan inspector parameter langsung. Dirancang tetap stabil di 60 FPS saat adegan makin ramai.",
      "A 3D rigid-body sandbox with a from-scratch integrator, impulse-based collision response, and a live parameter inspector. Built to stay stable at 60 FPS while the scene gets crowded.",
    ),
    year: "2026",
    status: "In progress",
    stack: ["TypeScript", "WebGL", "Three.js", "GLSL"],
    links: {
      github: "https://github.com/RafaPramudya/gravity-sandbox",
    },
    overview: l(
      "Saya ingin memahami kenapa mesin fisika terasa nyata, bukan sekadar meminjamnya. Sandbox ini mengimplementasikan loop-nya sendiri: integrasi Euler semi-implisit, broad-phase culling, kontak impuls sekuensial, dan koreksi posisi. Sebuah worker memegang simulasi sementara renderer menginterpolasi antar langkah tetap, jadi gerakan tetap mulus meski satu frame berjalan lama.",
      "I wanted to understand why physics engines feel real, not just borrow one. The sandbox implements the loop myself: semi-implicit Euler integration, broad-phase culling, sequential impulse contacts, and positional correction. A worker owns the simulation while the renderer interpolates between fixed steps, so motion stays smooth even when a frame runs long.",
    ),
    preview: "gravity",
    role: l("Solo — solver, renderer, tooling", "Solo — solver, renderer, tooling"),
    metrics: [
      { label: l("Frame rate", "Frame rate"), value: "60 FPS" },
      { label: l("Benda tegar", "Rigid bodies"), value: "512" },
      { label: l("Langkah solver", "Solver step"), value: "1.2 ms" },
      { label: l("Restitusi", "Restitution"), value: "0.62" },
    ],
    architecture: [
      {
        label: l("Integrator", "Integrator"),
        detail: l(
          "Euler semi-implisit dengan substep tetap 120 Hz. Gravitasi diterapkan lebih dulu, lalu kecepatan diintegrasikan dan dibatasi pada kecepatan terminal.",
          "Semi-implicit Euler with a fixed 120 Hz substep. Gravity is applied first, then velocity is integrated and clamped against a terminal speed.",
        ),
      },
      {
        label: l("Broad phase", "Broad phase"),
        detail: l(
          "Spatial hash seragam menjaga kandidat pasangan tetap sedikit. AABB tiap benda diperbarui sekali per langkah dan dipakai ulang oleh narrow phase.",
          "A uniform spatial hash keeps candidate pairs small. Each body's AABB is refreshed once per step and reused by the narrow phase.",
        ),
      },
      {
        label: l("Solver kontak", "Contact solver"),
        detail: l(
          "Impuls sekuensial menyelesaikan kontak normal dan gesekan dalam jumlah iterasi tetap, dilanjutkan koreksi posisi Baumgarte agar benda tidak tenggelam.",
          "Sequential impulses resolve normal and friction contacts over a fixed iteration count, followed by Baumgarte positional correction to stop sinking.",
        ),
      },
      {
        label: l("Renderer & inspector", "Renderer & inspector"),
        detail: l(
          "Three.js menggambar benda terinstansiasi dengan shader kustom untuk kedalaman dan bayangan kontak. Slider mengekspos gravitasi, restitusi, dan iterasi solver secara langsung.",
          "Three.js draws instanced bodies with a custom shader for depth and contact shadows. Sliders expose gravity, restitution, and solver iterations live.",
        ),
      },
    ],
    challenges: [
      {
        challenge: l(
          "Benda cepat menembus bidang tanah pada gravitasi tinggi.",
          "Fast bodies tunnelled through the ground plane at high gravity.",
        ),
        solution: l(
          "Menambahkan kontak spekulatif dan pemeriksaan AABB tersapu untuk tanah, lalu membatasi perpindahan maksimum per substep.",
          "Added speculative contacts and swept AABB checks for the ground, then capped the maximum displacement per substep.",
        ),
      },
      {
        challenge: l(
          "Kotak bertumpuk bergetar bahkan setelah seharusnya diam.",
          "Stacked boxes jittered even after they should have settled.",
        ),
        solution: l(
          "Memperkenalkan ambang tidur berdasarkan kecepatan linear dan angular, plus slop penetrasi kecil sebelum koreksi posisi bekerja.",
          "Introduced a sleep threshold based on linear and angular velocity, plus a small penetration slop before positional correction kicks in.",
        ),
      },
      {
        challenge: l(
          "Waktu frame yang bervariasi membuat kecepatan simulasi bergantung pada monitor.",
          "Variable frame times made the simulation speed depend on the monitor.",
        ),
        solution: l(
          "Memindahkan solver ke timestep tetap di dalam worker dan menginterpolasi transform render di antara dua state fisika terakhir.",
          "Moved the solver to a fixed timestep in a worker and interpolated render transforms between the last two physics states.",
        ),
      },
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

/** Projects section, card, and case-study modal labels. */
export const projectsContent = {
  index: "03",
  eyebrow: l("Karya pilihan", "Selected work"),
  titleLead: l("Dua sistem yang dibangun untuk", "Two systems built to"),
  titleAccent: l("melihat dan bergerak.", "see and move."),
  statuses: l<Record<ProjectSource["status"], string>>(
    {
      Live: "Aktif",
      "In progress": "Dikerjakan",
      Research: "Riset",
      Archived: "Arsip",
    },
    {
      Live: "Live",
      "In progress": "In progress",
      Research: "Research",
      Archived: "Archived",
    },
  ),
  description: l(
    "Satu membaca ruangan lewat kamera. Satunya lagi memberinya bobot. Keduanya latihan menjaga komputasi tetap jujur pada kecepatan real-time.",
    "One reads a room through a camera. The other gives it weight. Both are exercises in keeping computation honest at real-time speed.",
  ),
  repositories: {
    label: l("Semua repositori", "All repositories"),
    href: githubProfile,
  },
  card: {
    openPrefix: l("Buka", "Open"),
    openSuffix: l("studi kasus", "case study"),
    code: l("Kode", "Code"),
    demo: l("Demo", "Demo"),
    caseStudy: l("Studi kasus", "Case study"),
  },
  modal: {
    eyebrow: l("Studi kasus", "Case study"),
    closeLabel: l("Tutup studi kasus", "Close case study"),
    repository: l("Repositori", "Repository"),
    liveDemo: l("Demo langsung", "Live demo"),
    overview: l("Ikhtisar", "Overview"),
    metrics: l("Hasil terukur", "Measured results"),
    architecture: l("Arsitektur", "Architecture"),
    challenges: l("Tantangan & solusi", "Challenges & solutions"),
    escHint: l("ESC untuk menutup", "ESC to close"),
    back: l("Kembali ke proyek", "Back to projects"),
  },
};
