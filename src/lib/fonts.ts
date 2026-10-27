import { Geist, Geist_Mono } from "next/font/google";

/**
 * Self-hosted and subset to Latin by next/font, so the two font files stay
 * small (the full local Geist variable files are ~70 KB each). A late font
 * swap can otherwise grow the hero paragraph and push LCP out on slow links.
 */
export const GeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
