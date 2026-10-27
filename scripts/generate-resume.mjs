import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { profile, siteUrl, socials } from "../src/data/profile.ts";
import { certificates } from "../src/data/certificates.ts";
import { featuredProjects } from "../src/data/projects.ts";
import { resumeContent } from "../src/data/resume.ts";
import { locales, resumeUrls } from "../src/i18n/config.ts";
import { resolve } from "../src/i18n/resolve.ts";

/**
 * Generates one valid one-page placeholder PDF per locale at
 * public/resume-id.pdf and public/resume-en.pdf.
 * All copy comes from src/data — edit those files and re-run:
 *   npm run resume
 */

const __dirname = dirname(fileURLToPath(import.meta.url));

const WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 48;
const ACCENT = "0.02 0.59 0.41";
const INK = "0.09 0.09 0.11";
const MUTED = "0.34 0.34 0.39";
const FAINT = "0.55 0.55 0.6";

const ops = [];

// Common typographic characters mapped to their WinAnsi byte, which is the
// encoding declared for both fonts. Anything else degrades to a hyphen.
const WIN_ANSI = {
  "\u2014": "\x97", // em dash
  "\u2013": "\x96", // en dash
  "\u2018": "\x91",
  "\u2019": "\x92",
  "\u201c": "\x93",
  "\u201d": "\x94",
  "\u2022": "\x95",
  "\u2026": "\x85",
  "\u00b7": "\xb7", // middle dot
  "\u00d7": "\xd7", // multiplication sign
  "\u2192": "\x2d", // right arrow is not in WinAnsi
  "\u2194": "\x2d",
};

function escapePdf(value) {
  return value
    .replace(/[^\x20-\x7E]/g, (char) => WIN_ANSI[char] ?? "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

// Approximate Helvetica advance widths (per 1000 units) for right alignment.
const WIDTHS = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667,
  "'": 191, "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333,
  ".": 278, "/": 278, ":": 278, ";": 278, "<": 584, "=": 584, ">": 584,
  "?": 556, "@": 1015, "[": 278, "\\": 278, "]": 278, "^": 469, _: 556,
  "`": 333, "{": 334, "|": 260, "}": 334, "~": 584,
  "\x97": 1000, "\x96": 556, "\x91": 222, "\x92": 222, "\x93": 333,
  "\x94": 333, "\x95": 350, "\x85": 1000, "\xb7": 278, "\xd7": 584,
};

function charWidth(char, bold) {
  if (WIDTHS[char]) return WIDTHS[char] * (bold ? 1.06 : 1);
  if (char >= "0" && char <= "9") return 556;
  if (char >= "A" && char <= "Z") return 667 * (bold ? 1.08 : 1);
  if (char >= "a" && char <= "z") return 500 * (bold ? 1.08 : 1);
  return 500;
}

function measure(value, size, bold = false) {
  let total = 0;
  for (const char of escapePdf(value)) total += charWidth(char, bold);
  return (total / 1000) * size;
}

function text(value, x, y, { font = "F1", size = 10, color = INK } = {}) {
  ops.push(`${color} rg`);
  ops.push(
    `BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`,
  );
}

function textRight(value, right, y, options = {}) {
  text(value, right - measure(value, options.size ?? 10, options.font === "F2"), y, options);
}

function rect(x, y, w, h, color) {
  ops.push(`${color} rg ${x} ${y} ${w} ${h} re f`);
}

function rule(y, color = "0.88 0.88 0.9") {
  ops.push(`${color} RG 0.7 w ${MARGIN} ${y} m ${WIDTH - MARGIN} ${y} l S`);
}

function section(label, y) {
  text(label, MARGIN, y, { font: "F2", size: 9, color: ACCENT });
  rule(y - 6);
}

function wrap(value, maxChars) {
  const words = value.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

function paragraph(value, x, y, options = {}) {
  const { size = 9.5, leading = 15, color = MUTED, maxChars = 96 } = options;
  let cursor = y;
  for (const line of wrap(value, maxChars)) {
    text(line, x, cursor, { size, color });
    cursor -= leading;
  }
  return cursor;
}

const website = siteUrl.replace(/^https?:\/\//, "");
const socialHost = (id) =>
  socials.find((social) => social.id === id)?.href.replace(/^https?:\/\//, "") ??
  "";

function build(locale) {
  ops.length = 0;

  const copy = resolve(
    { profile, certificates, featuredProjects, resumeContent },
    locale,
  );
  const profileCopy = copy.profile;
  const resume = copy.resumeContent;

  // ── Header ──────────────────────────────────────────────────────────────
  rect(0, 760, WIDTH, 82, "0.03 0.03 0.04");
  rect(0, 757, WIDTH, 3, ACCENT);

  text(profileCopy.name.toUpperCase(), MARGIN, 805, { font: "F2", size: 22, color: "1 1 1" });
  text(profileCopy.roles.slice(0, 2).join("  /  ").toUpperCase(), MARGIN, 786, {
    size: 8,
    color: "0.65 0.65 0.7",
  });
  text(`${profileCopy.whatsapp.display}  ·  ${profileCopy.location}  ·  ${website}`, MARGIN, 769, {
    size: 8,
    color: "0.55 0.9 0.72",
  });

  // ── Profile ─────────────────────────────────────────────────────────────
  section(resume.sections.profile, 736);
  let cursor = 718;
  resume.profile.forEach((entry, index) => {
    cursor = paragraph(entry, MARGIN, index === 0 ? cursor : cursor - 2, {
      maxChars: 108,
    });
  });

  // ── Projects ────────────────────────────────────────────────────────────
  cursor -= 16;
  section(resume.sections.projects, cursor);
  cursor -= 20;

  const projects = copy.featuredProjects.map((project) => ({
    title: project.name,
    meta: project.stack.join(" · "),
    body: project.description,
  }));

  for (const project of projects) {
    text(project.title, MARGIN, cursor, { font: "F2", size: 10.5 });
    textRight(project.meta, WIDTH - MARGIN, cursor, {
      size: 8,
      color: FAINT,
    });
    cursor = paragraph(project.body, MARGIN, cursor - 14, {
      maxChars: 112,
      size: 9,
      leading: 13.5,
    });
    cursor -= 7;
  }

  // ── Skills ──────────────────────────────────────────────────────────────
  cursor -= 6;
  section(resume.sections.skills, cursor);

  const skills = resume.skills;

  let skillY = cursor - 22;
  for (const skill of skills) {
    text(skill.label, MARGIN, skillY, { font: "F2", size: 9, color: INK });
    text(skill.value, MARGIN + 86, skillY, { size: 9, color: MUTED });
    skillY -= 16;
  }

  // ── Education ───────────────────────────────────────────────────────────
  skillY -= 8;
  section(resume.sections.education, skillY);
  text(profileCopy.education.school, MARGIN, skillY - 22, { font: "F2", size: 10 });
  textRight(
    `${profileCopy.education.focus} · ${profileCopy.education.graduation}`,
    WIDTH - MARGIN,
    skillY - 22,
    {
      size: 8.5,
      color: MUTED,
    },
  );

  // ── Achievements ────────────────────────────────────────────────────────
  skillY -= 50;
  section(resume.sections.certificates, skillY);

  const achievements = copy.certificates
    .slice(0, resume.certificates.count)
    .map(
      (certificate) =>
        `${certificate.title} — ${certificate.issuer}, ${certificate.date}`,
    );

  let achievementY = skillY - 22;
  for (const achievement of achievements) {
    text("-", MARGIN, achievementY, { color: ACCENT });
    text(achievement, MARGIN + 12, achievementY, { size: 9, color: MUTED });
    achievementY -= 15;
  }

  // ── Footer ──────────────────────────────────────────────────────────────
  text(
    resume.footerNote,
    MARGIN,
    40,
    { size: 7, color: FAINT },
  );
  text(
    `${website}  ·  ${socialHost("github")}  ·  ${socialHost("leetcode")}  ·  ${socialHost("tlx")}`,
    MARGIN,
    28,
    { size: 7.5, color: MUTED },
  );

  const content = `${ops.join("\n")}\n`;
  const contentLength = Buffer.byteLength(content, "latin1");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${contentLength} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Title (${escapePdf(`${profileCopy.name} - ${resume.fileTitleSuffix}`)}) /Author (${escapePdf(profileCopy.name)}) /Creator (scripts/generate-resume.mjs) >>`,
  ];

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 7 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF\n`;

  const outPath = join(
    __dirname,
    "..",
    "public",
    resumeUrls[locale].replace(/^\//, ""),
  );
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, Buffer.from(pdf, "latin1"));

  // Verify the xref offsets before declaring success.
  const written = readFileSync(outPath).toString("latin1");
  offsets.forEach((offset, index) => {
    const expected = `${index + 1} 0 obj`;
    if (!written.startsWith(expected, offset)) {
      throw new Error(`Invalid xref offset for object ${index + 1}`);
    }
  });

  console.log(`Wrote ${outPath} (${Buffer.byteLength(pdf, "latin1")} bytes)`);
}

for (const locale of locales) {
  build(locale);
}
