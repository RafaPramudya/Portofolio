import type { CertificateCategory, CertificateSource } from "@/types";
import { l } from "../i18n/config.ts";

/** EDIT ME — the paper trail: olympiad placements and certifications. */
export const certificates: CertificateSource[] = [
  {
    id: "ksn-k-2020",
    title: l("Juara 1 KSN-Kec. Matematika 2020", "1st Place — KSN Sub-district Mathematics 2020"),
    issuer: l("Dinas Pendidikan Kota Bekasi", "Bekasi City Education Office"),
    date: l("Maret 2020", "March 2020"),
    category: "Competition",
    description: l(
      "Juara pertama di tahap kecamatan Mustika Jaya olimpiade sains nasional (KSN-K) bidang matematika, lanjut ke babak kota Bekasi.",
      "First place at the Mustika Jaya sub-district stage of the national science olympiad (KSN-K) in mathematics, advancing to the Bekasi city round.",
    ),
    credentialId: "-",
    accent: "emerald",
    image: "/images/ksn-k-2020.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "prf-ui-23",
    title: l("Juara 1 PRF UI' 23 Robotik", "1st Place — PRF UI '23 Robotics"),
    issuer: l("Universitas Indonesia", "Universitas Indonesia"),
    date: l("Okt 2025", "Oct 2025"),
    category: "Competition",
    description: l(
      "Juara pertama dalam lomba debugging arduino tingkat nasional, ajang keterampilan di mana peserta harus menganalisis dan memperbaiki program Arduino yang bermasalah baik error kompilasi maupun error logika dengan menggunakan komponen seperti sensor LDR dan servo motor.",
      "First place in a national Arduino debugging competition, a skills event where participants analyze and fix faulty Arduino programs — both compilation and logic errors — using components such as LDR sensors and servo motors.",
    ),
    credentialId: "-",
    accent: "sky",
    image: "/images/prf-ui-23.jpg",
    imagePosition: "50% 70%",
  },
  {
    id: "tfc-21",
    title: l(
      "Juara 1 TFC' 21 Lomba Cepat Tepat",
      "1st Place — TFC '21 Quiz Bee",
    ),
    issuer: l("SMAN 1 Tambun Selatan", "SMAN 1 Tambun Selatan"),
    date: l("Mei 2026", "May 2026"),
    category: "Competition",
    description: l(
      "Meraih juara pertama dalam Think Fast Competition 21, lomba cepat tepat tingkat SMA yang menguji pengetahuan, ketepatan, dan kecepatan berpikir peserta.",
      "First place in Think Fast Competition 21, a high-school-level quiz competition testing participants' knowledge, accuracy, and speed of thought.",
    ),
    credentialId: "-",
    accent: "violet",
    image: "/images/tfc-21.jpg",
    imagePosition: "50% 45%",
  },
  {
    id: "osn-informatics-2026",
    title: l(
      "Finalis OSN Informatika 2026",
      "OSN Informatics 2026 Finalist",
    ),
    issuer: l("Puspresnas", "Puspresnas"),
    date: l("Juni 2026 - Sep 2026", "June 2026 - Sep 2026"),
    category: "Competition",
    description: l(
      "Finalis Olimpiade Sains Nasional (OSN) bidang Informatika, kompetisi tingkat nasional yang berfokus pada competitive programming. Peserta menyelesaikan berbagai persoalan komputasional dengan merancang algoritma yang benar dan efisien, memilih struktur data yang sesuai, serta menerapkan logika pemrograman untuk memenuhi batasan waktu dan memori.",
      "Finalist in the National Science Olympiad (OSN) for Informatics, a national-level competition focused on competitive programming. Participants solve computational problems by designing correct and efficient algorithms, selecting suitable data structures, and applying programming logic to meet time and memory limits.",
    ),
    credentialId: "-",
    accent: "amber",
    image: "/images/osn-informatics-2026.jpg",
    imagePosition: "50% 45%",
  },
];

/** Certificates section and gallery labels. */
export const certificatesContent = {
  index: "04",
  eyebrow: l("Sertifikat", "Certificates"),
  titleLead: l("Memori singkat tentang", "A short record of"),
  titleAccent: l("hal-hal yang bertahan.", "things that held."),
  description: l(
    "Peringkat olimpiade, & sertifikat, atau disebut juga jejak kertas di balik karya.",
    "Olympiad placements and certificates — the paper trail behind the work.",
  ),
  gallery: {
    title: l("Sertifikat & penghargaan", "Certificates & honours"),
    recordSingular: l("catatan terverifikasi", "verified record"),
    recordPlural: l("catatan terverifikasi", "verified records"),
    enlargeHint: l("klik untuk memperbesar", "click to enlarge"),
    filterLabel: l(
      "Saring sertifikat berdasarkan jenis",
      "Filter certificates by type",
    ),
    categories: ["Competition", "Academic"] as CertificateCategory[],
    categoryLabels: l<Record<CertificateCategory, string>>(
      {
        Academic: "Akademik",
        Competition: "Lomba",
        Award: "Penghargaan",
      },
      {
        Academic: "Academic",
        Competition: "Competition",
        Award: "Award",
      },
    ),
    empty: l(
      "Belum ada sertifikat di kategori itu.",
      "No certificates in that category yet.",
    ),
    certificateOf: l("Sertifikat", "Certificate of"),
    issued: l("Diterbitkan", "Issued"),
    credentialId: l("ID Kredensial", "Credential ID"),
    closeLabel: l("Tutup penampil sertifikat", "Close certificate viewer"),
    previous: l("Sebelumnya", "Previous"),
    next: l("Berikutnya", "Next"),
    keysHint: l("Gunakan tombol ← →", "Use ← → keys"),
    counterLabel: l("Sertifikat", "Certificate"),
  },
};
