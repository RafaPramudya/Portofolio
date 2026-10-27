import type { TimelineCategory } from "@/types";
import { l } from "@/i18n/config.ts";

/** Journey section copy, filter options, and stream labels. */
export const journeyContent = {
  index: "02",
  eyebrow: l("Perjalanan", "Journey"),
  titleLead: l("Linimasa", "A timeline of"),
  titleAccent: l("iterasi.", "iterations."),
  description: l(
    "Babak olimpiade, eksperimen visi komputer, dan sandbox fisika. Saring babaknya untuk mengikuti satu alur.",
    "Olympiad rounds, computer-vision experiments, and a physics sandbox. Filter the chapters to follow one thread.",
  ),
  filterLabel: l(
    "Saring linimasa berdasarkan kategori",
    "Filter timeline by category",
  ),
  categories: ["Competitions", "Projects", "Education", "Work"] as TimelineCategory[],
  categoryLabels: l<Record<TimelineCategory, string>>(
    {
      Competitions: "Lomba",
      Projects: "Proyek",
      Education: "Pendidikan",
      Work: "Kerja",
    },
    {
      Competitions: "Competitions",
      Projects: "Projects",
      Education: "Education",
      Work: "Work",
    },
  ),
  entrySingular: l("entri", "entry"),
  entryPlural: l("entri", "entries"),
  orderHint: l("terbaru dulu", "newest first"),
  scrollHint: l("geser", "scroll"),
  previousLabel: l(
    "Geser linimasa ke belakang",
    "Scroll timeline backwards",
  ),
  nextLabel: l("Geser linimasa ke depan", "Scroll timeline forwards"),
  empty: l(
    "Belum ada entri untuk kombinasi itu.",
    "No entries match that combination yet.",
  ),
};
