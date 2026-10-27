import { ImageResponse } from "next/og";
import { siteUrl } from "@/data/profile";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getContent } from "@/i18n/content";

const size = { width: 1200, height: 630 };

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const { siteMeta } = getContent(locale);

  return [
    {
      id: locale,
      alt: siteMeta.ogAlt,
      size,
      contentType: "image/png",
    },
  ];
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const { profile, shellContent, socials } = getContent(locale);
  const { og } = shellContent;
  const host = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          color: "#f4f4f5",
          padding: "70px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-220px",
            left: "-180px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.28), rgba(52,211,153,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-160px",
            bottom: "-240px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.22), rgba(56,189,248,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                border: "1px solid rgba(52,211,153,0.45)",
                background: "rgba(52,211,153,0.12)",
                color: "#34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              {profile.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
              <span style={{ fontSize: "19px", fontWeight: 600 }}>{profile.name}</span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#71717a",
                  marginTop: "4px",
                }}
              >
                {profile.roleSummary}
              </span>
            </div>
          </div>

          <span
            style={{
              border: "1px solid rgba(52,211,153,0.35)",
              background: "rgba(52,211,153,0.1)",
              color: "#34d399",
              borderRadius: "9999px",
              padding: "9px 16px",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {og.badge}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "15px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            {og.eyebrow}
          </span>
          <div style={{ display: "flex", fontSize: "78px", fontWeight: 600, letterSpacing: "-3px", marginTop: "16px", lineHeight: 1 }}>
            {og.headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "78px",
              fontWeight: 600,
              letterSpacing: "-3px",
              marginTop: "6px",
              lineHeight: 1,
              backgroundImage: "linear-gradient(100deg, #f4f4f5 10%, #34d399 55%, #38bdf8 95%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {og.headlineAccent}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "26px",
            fontSize: "15px",
            color: "#a1a1aa",
          }}
        >
          <span style={{ display: "flex" }}>{host}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {socials
              .filter((social) => social.href.startsWith("http"))
              .map((social) => (
                <span
                  key={social.id}
                  style={{
                    display: "flex",
                    marginLeft: "22px",
                    color: "#71717a",
                  }}
                >
                  {social.label}
                </span>
              ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
