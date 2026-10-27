import { l, type Localized } from "@/i18n/config.ts";

export type PreviewTone =
  | "accent"
  | "accent2"
  | "accent3"
  | "amber"
  | "muted"
  | "fg";

type PreviewMetric = {
  label: Localized;
  value: string | Localized;
  tone: PreviewTone;
};

/**
 * Labels and readouts painted inside the procedural project previews.
 * Geometry and colors stay in the component; anything a visitor can read
 * lives here.
 */
export const previewContent: {
  gesture: {
    title: Localized;
    badge: Localized | string;
    objectBadge: Localized;
    landmarksLabel: Localized;
    trackingLabel: Localized;
    metrics: PreviewMetric[];
  };
  gravity: {
    title: Localized;
    badge: Localized | string;
    metrics: PreviewMetric[];
    floorLabel: Localized;
    bodyLabel: Localized;
  };
} = {
  gesture: {
    title: l("GESTUR + DETEKSI OBJEK", "GESTURE + OBJECT DETECTION"),
    badge: l("TELAPAK · 0.98", "PALM_OPEN · 0.98"),
    objectBadge: l("GELAS · 0.91", "CUP · 0.91"),
    landmarksLabel: l("21 LANDMARK", "21 LANDMARKS"),
    trackingLabel: l("PELACAKAN · ON-DEVICE", "TRACKING · ON-DEVICE"),
    metrics: [
      { label: l("FPS", "FPS"), value: "31", tone: "fg" },
      { label: l("LATENSI", "LATENCY"), value: "42 ms", tone: "fg" },
      { label: l("GESTUR", "GESTURES"), value: "12", tone: "accent" },
      { label: l("PERANGKAT", "DEVICE"), value: l("lokal", "local"), tone: "accent2" },
    ],
  },
  gravity: {
    title: l("SANDBOX RIGID BODY", "RIGID BODY SANDBOX"),
    badge: "g = 9.81 m/s²",
    metrics: [
      { label: l("BENDA", "BODIES"), value: "512", tone: "fg" },
      { label: l("SOLVER", "SOLVER"), value: "1.2 ms", tone: "accent" },
      { label: l("RESTITUSI", "RESTITUTION"), value: "0.62", tone: "accent2" },
    ],
    floorLabel: l("BIDANG TANAH · y = 0", "GROUND PLANE · y = 0"),
    bodyLabel: l("BODY_04", "BODY_04"),
  },
};
