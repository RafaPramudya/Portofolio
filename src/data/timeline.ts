import type { TimelineItemSource } from "@/types";
import { l } from "@/i18n/config.ts";

/** Newest first. `sortDate` is ISO-ish and only used for ordering. */
export const timeline: TimelineItemSource[] = [
  {
    id: "gravity-sandbox",
    date: l("Mar 2026", "Mar 2026"),
    sortDate: "2026-03",
    title: l(
      "Mesin fisika 3D — sandbox gravitasi",
      "3D physics engine — gravity sandbox",
    ),
    org: l("Riset pribadi · WebGL", "Personal research · WebGL"),
    summary: l(
      "Membangun sandbox rigid-body dari nol: integrasi Euler semi-implisit, respons tumbukan berbasis impuls, dan solver yang tetap stabil di 60 FPS saat adegan makin padat.",
      "Built a rigid-body sandbox from scratch: semi-implicit Euler integration, impulse-based collision response, and a solver tuned to stay stable at 60 FPS as the scene fills up.",
    ),
    category: "Projects",
    tags: l(
      ["TypeScript", "WebGL", "Fisika"],
      ["TypeScript", "WebGL", "Physics"],
    ),
    icon: "layers",
  },
  {
    id: "osn-informatics-2026",
    date: l("Sep 2026", "Sep 2026"),
    sortDate: "2026-09",
    title: l("Finalis OSN Informatika", "OSN Informatics finalist"),
    org: l("Puspresnas · Tingkat nasional", "Puspresnas · National level"),
    summary: l(
      "Terpilih untuk mengikuti rangkaian pelatihan informatika dari tingkat provinsi hingga nasional setelah menempati peringkat teratas pada tahap kota. Saya sangat menikmati pemecahan masalah menggunakan algoritma dan struktur data.",
      "Selected for the provincial-to-national informatics training pipeline after placing in the top tier of the city stage. I especially enjoy problem solving with algorithms and data structures.",
    ),
    category: "Competitions",
    tags: l(
      ["Informatika", "Olimpiade", "Nasional"],
      ["Informatics", "Olympiad", "National"],
    ),
    icon: "trophy",
  },
  {
    id: "gesture-detection",
    date: l("Jan 2026", "Jan 2026"),
    sortDate: "2026-01",
    title: l(
      "Pipeline deteksi gestur & objek",
      "Gesture & object detection pipeline",
    ),
    org: l(
      "Visi komputer · proyek pribadi",
      "Computer vision · personal project",
    ),
    summary: l(
      "Pipeline real-time yang melacak 21 landmark tangan dan mendeteksi objek dari feed webcam, dengan klasifikasi gestur dan jalur inferensi on-device pada 31 FPS.",
      "A real-time pipeline that tracks 21 hand landmarks and detects objects from a webcam feed, with gesture classification and an on-device inference path at 31 FPS.",
    ),
    category: "Projects",
    tags: l(
      ["Python", "OpenCV", "MediaPipe"],
      ["Python", "OpenCV", "MediaPipe"],
    ),
    icon: "flask",
  },
  {
    id: "ksn-k",
    date: l("Maret 2020", "March 2020"),
    sortDate: "2020-03",
    title: l("KSN-Kec. Matematika — juara 1", "KSN Sub-district Mathematics — 1st place"),
    org: l("Dinas pendidikan kota", "City education office"),
    summary: l(
      "Juara pertama di tahap kecamatan olimpiade sains nasional, lanjut ke tahap kota.",
      "First place at the sub-district stage of the national science olympiad, advancing to the city stage.",
    ),
    category: "Competitions",
    tags: l(
      ["Matematika", "OSN", "Kota"],
      ["Mathematics", "OSN", "City"],
    ),
    icon: "trophy",
  },
  {
    id: "mentorship",
    date: l("Feb 2024", "Feb 2024"),
    sortDate: "2024-02",
    title: l(
      "Membentuk kelompok belajar CP lokal",
      "Started a local CP study group",
    ),
    org: l("Komunitas", "Community"),
    summary: l(
      "Sesi algoritma mingguan untuk junior di sekolah. Kami merawat set soal bersama dan buku catatan review yang kini dipakai dua sekolah lain.",
      "Weekly algorithm sessions for juniors at school. We maintain a shared problem set and a review notebook that is now used by two other schools.",
    ),
    category: "Work",
    tags: l(
      ["Mentoring", "Komunitas", "Mengajar"],
      ["Mentoring", "Community", "Teaching"],
    ),
    icon: "pen",
  },
  {
    id: "first-cp",
    date: l("Sep 2023", "Sep 2023"),
    sortDate: "2023-09",
    title: l(
      "Kontes competitive programming pertama",
      "First competitive programming contest",
    ),
    org: l("TLX / TOKI", "TLX / TOKI"),
    summary: l(
      "Membuka akun TLX, gagal di soal greedy, dan langsung ketagihan. Awal hubungan panjang dan mahal dengan 1e9+7.",
      "Opened a TLX account, failed a greedy problem, and got hooked. The beginning of a long, expensive relationship with 1e9+7.",
    ),
    category: "Education",
    tags: l(
      ["TLX", "Algoritma"],
      ["TLX", "Algorithms"],
    ),
    icon: "graduation",
  },
];
