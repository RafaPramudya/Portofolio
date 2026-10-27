import { profile } from "@/data/profile";
import { l } from "@/i18n/config.ts";

/**
 * About section copy, facts, principles, and the identity card labels.
 * Fact values are composed from the profile so they stay in sync.
 */
export const aboutContent = {
  index: "01",
  eyebrow: l("Tentang", "About"),
  titleLead: l("Dari otak ke kode,", "From brain to code,"),
  titleAccent: l("manusia yang selalu mikir :>", "a human who is always thinking :>"),
  description: l(
    "Tahu kalau misalkan saya tidak selalu benar, tetapi selalu menyediakan cara untuk mencari solusinya",
    "I know I'm not always right, but I always find a way to work out the solution.",
  ),
  shortVersionLabel: l("Versi singkat", "The short version"),
  factFocus: l("Visi · Simulasi · Algoritma", "Vision · Simulation · Algorithms"),
  facts: [
    {
      icon: "location" as const,
      label: l("Lokasi", "Location"),
      value: l(
        `${profile.location} · ${profile.timezone}`,
        `${profile.location} · ${profile.timezone}`,
      ),
    },
    {
      icon: "education" as const,
      label: l("Pendidikan", "Education"),
      value: l(
        `${profile.education.school} — XII F5 / Fisika, Kimia, & Informatika`,
        `${profile.education.school} — XII F5 / Physics, Chemistry, & Informatics`,
      ),
    },
    {
      icon: "focus" as const,
      label: l("Fokus", "Focus"),
      value: l(
        "Visi komputer · Simulasi 3D · Algoritma",
        "Computer vision · 3D simulation · Algorithms",
      ),
    },
    {
      icon: "currently" as const,
      label: l("Saat ini", "Currently"),
      value: profile.currentFocus,
    },
  ],
  card: {
    tag: "ai / sim",
    id: "id · 2027",
    status: l("terbuka", "open"),
  },
  principles: [
    {
      title: l("Mencoba mensimulasikan", "Try to simulate it"),
      detail: l(
        "Biar paham, kita harus bisa ngelihatnya sendiri.",
        "To understand it, we have to be able to see it for ourselves.",
      ),
    },
    {
      title: l("Feynman Technique", "Feynman Technique"),
      detail: l(
        "Mencoba menjelaskan sesuatu dengan kata-kata yang mudah dipahami.",
        "Trying to explain something in words that are easy to understand.",
      ),
    },
    {
      title: l("Lahir dengan angka", "Born with numbers"),
      detail: l(
        "Biar bisa dipercaya, kita harus bisa membuktikannya dengan angka.",
        "To be trusted, we have to be able to prove it with numbers.",
      ),
    },
  ],
};
