import { certificates } from "@/data/certificates";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { l } from "@/i18n/config.ts";

/**
 * Hero copy and the portrait panel. Counts are derived from the projects and
 * certificates data so the hero can never drift from the rest of the site.
 */
export const heroContent = {
  greeting: l("Halo, saya", "Hello, I'm"),
  description: l(
    "Saya membangun sistem komputer yang membaca tubuh manusia secara real-time, dan simulasi fisika tempat gravitasi, tumbukan, serta konstrain bekerja sebagaimana mestinya. Saat ini pelajar SMA di Bekasi. Dan fokus TKA & UTBK",
    "I build computer systems that read the human body in real time, and physics simulations where gravity, collisions, and constraints behave the way they should. Currently a high-school student in Bekasi. And focused on TKA & UTBK.",
  ),
  ctas: {
    projects: l("Lihat proyek", "View projects"),
    resume: l("Unduh CV", "Download CV"),
    contact: l("Hubungi saya", "Contact me"),
  },
  photo: {
    src: "/images/hero-bg.jpg",
    alt: l(
      `Potret ${profile.name} dalam seragam gelap upacara dengan latar merah pekat.`,
      `Portrait of ${profile.name} in a ceremonial dark uniform against a deep red backdrop.`,
    ),
    width: 1024,
    height: 1536,
    focal: "50% 24%",
    badge: l("Potret / 2026", "Portrait / 2026"),
    caption: l(
      "Rafa Pramudya Susanto (2026)",
      "Rafa Pramudya Susanto (2026)",
    ),
    frameLabel: l("Dalam bingkai", "In frame"),
    statusOpen: l("online", "online"),
    captionNote: `${profile.location} · ${profile.timezone}`,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAYABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAECAwb/xAAfEAACAgEEAwAAAAAAAAAAAAABAgADERIhMUETIlH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAgT/xAAYEQADAQEAAAAAAAAAAAAAAAAAARExIv/aAAwDAQACEQMRAD8AytFPlcKWCg9nqN6tOdw2DyO5OoJj3OIX3oXZKgCmwBO5EOumjlaUqw1DLEAfIrMsWsyTk8nkwhKwK0//2Q==",
  },
  stats: {
    projects: {
      label: l("Proyek unggulan", "Featured builds"),
      value: String(featuredProjects.length).padStart(2, "0"),
      note: l("AI + simulasi", "AI + simulation"),
    },
    certificates: {
      label: l("Sertifikat", "Certificates"),
      value: String(certificates.length).padStart(2, "0"),
      note: "OSN · TOKI",
    },
    clock: {
      label: l("Waktu lokal", "Local time"),
      note: profile.timezone,
    },
  },
};
