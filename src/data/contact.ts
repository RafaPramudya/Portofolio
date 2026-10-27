import { l } from "@/i18n/config.ts";

/**
 * Contact section copy and the WhatsApp composer labels. The number lives in
 * `profile.ts`; the prefilled message lives here so the owner can edit it
 * without touching the component.
 */
export const contactContent = {
  index: "05",
  eyebrow: l("Kontak", "Contact"),
  titleLead: l("Ingin menghubungi saya", "Want to contact me"),
  titleAccent: l("lebih lanjut?", "further?"),
  description: l(
    "Pilih WhatsApp, lalu sesuaikan pesan pembukanya.",
    "Pick WhatsApp, then tailor the opening message.",
  ),
  directLine: l("WhatsApp langsung", "WhatsApp direct"),
  replyNote: l("kadang jarang jawab hehe", "sometimes slow to reply hehe"),
  goodFits: {
    label: l("Cocok untuk", "Good fits"),
    items: l(
      ["AI / visi komputer", "Simulasi 3D", "Kolaborasi OSS", "Tim CP"],
      ["AI / computer vision", "3D simulation", "OSS collaboration", "CP teams"],
    ),
  },
  composer: {
    title: l("Chat WhatsApp", "WhatsApp chat"),
    subtitle: l(
      "Pesan pembuka bisa kamu ubah dulu",
      "Edit the opening message first",
    ),
    badge: l("langsung", "direct"),
    message: {
      label: l("Pesan pembuka", "Opening message"),
      placeholder: l(
        "Ceritakan apa yang sedang kamu bangun, batasannya, dan seperti apa hasil yang bagus…",
        "Tell me what you're building, the constraints, and what good looks like…",
      ),
      counterSuffix: "/1000",
      maxLength: 1000,
    },
    defaultMessage: l(
      "Halo Rafa! Saya menemukan portofolio kamu dan ingin berdiskusi soal proyek AI & visi komputer kamu.",
      "Hi Rafa! I found your portfolio and would love to talk about your AI and computer-vision work.",
    ),
    send: l("Buka WhatsApp", "Open WhatsApp"),
    hint: l(
      "Chat dibuka di tab baru lewat wa.me. Tidak ada pesan yang dikirim dari situs ini.",
      "The chat opens in a new tab via wa.me. Nothing is sent from this site.",
    ),
  },
};
