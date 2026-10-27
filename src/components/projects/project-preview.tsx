"use client";

import { useEffect, useRef } from "react";
import { type PreviewTone } from "@/data/previews";
import { useContent } from "@/components/providers/content-provider";
import { cn } from "@/lib/utils";
import type { PreviewKind } from "@/types";

const toneColor: Record<PreviewTone, string> = {
  accent: "#34d399",
  accent2: "#38bdf8",
  accent3: "#a78bfa",
  amber: "#f59e0b",
  muted: "#71717a",
  fg: "#f4f4f5",
};

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#07080b]",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

function Label({
  x,
  y,
  children,
  fill = "#71717a",
  size = 7,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      textAnchor={anchor}
      letterSpacing="1.4"
      fontFamily="var(--font-geist-mono), monospace"
    >
      {children}
    </text>
  );
}

function GesturePreview() {
  const { previewContent } = useContent();
  const content = previewContent.gesture;

  const joints: [number, number][] = [
    [140, 172],
    [128, 154],
    [116, 138],
    [106, 126],
    [152, 142],
    [144, 116],
    [140, 98],
    [138, 88],
    [166, 140],
    [160, 108],
    [158, 84],
    [180, 144],
    [180, 114],
    [182, 96],
    [194, 150],
    [202, 130],
    [206, 118],
  ];

  const bones: [number, number][] = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [4, 5], [5, 6], [6, 7],
    [0, 8], [8, 9], [9, 10],
    [0, 11], [11, 12], [12, 13],
    [0, 14], [14, 15], [15, 16],
    [4, 8], [8, 11], [11, 14],
  ];

  return (
    <Frame>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_36%,rgba(52,211,153,0.16),transparent_58%),radial-gradient(circle_at_78%_58%,rgba(167,139,250,0.14),transparent_52%)]" />
      <svg viewBox="0 0 400 240" className="relative h-full w-full font-mono">
        <defs>
          <pattern id="gesture-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0V18" fill="none" stroke="#27272a" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect x={0} y={0} width={400} height={240} fill="url(#gesture-grid)" opacity={0.5} />

        <Label x={200} y={24} fill="#71717a" size={6.5} anchor="middle">
          {content.title}
        </Label>

        <g fill="none" stroke="#34d399" strokeWidth={1.2} strokeLinecap="round" opacity={0.62}>
          {bones.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={joints[a][0]}
              y1={joints[a][1]}
              x2={joints[b][0]}
              y2={joints[b][1]}
            />
          ))}
        </g>

        {joints.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={5.5} fill="#34d399" opacity={0.08} />
            <circle
              cx={cx}
              cy={cy}
              r={index === 0 ? 2.6 : 1.9}
              fill={index % 4 === 0 ? "#34d399" : "#f4f4f5"}
            />
          </g>
        ))}

        <rect
          x={88}
          y={66}
          width={132}
          height={120}
          rx={6}
          fill="none"
          stroke="#34d399"
          strokeWidth={1.1}
          strokeDasharray="6 4"
          className="animate-gesture-pulse"
        />
        <rect x={88} y={58} width={84} height={13} rx={2} fill="#34d399" opacity={0.9} />
        <text x={92} y={67} fill="#04110c" fontSize={6.2} letterSpacing="0.6">
          {content.badge}
        </text>

        <rect
          x={270}
          y={78}
          width={74}
          height={82}
          rx={5}
          fill="none"
          stroke="#a78bfa"
          strokeWidth={1.2}
          strokeDasharray="5 3"
        />
        <rect x={270} y={70} width={54} height={12} rx={2} fill="#a78bfa" opacity={0.9} />
        <text x={273.5} y={78.5} fill="#0b0714" fontSize={6} letterSpacing="0.6">
          {content.objectBadge}
        </text>
        <path
          d="M286 112 h12 M286 112 v10 M328 112 h-12 M328 112 v10 M292 146 l-6 6 h28 l-6 -6"
          fill="none"
          stroke="#a78bfa"
          strokeWidth={1}
          opacity={0.6}
        />
        <Label x={307} y={172} fill="#7c6b9e" size={5.6} anchor="middle">
          OBJECT_01
        </Label>

        <Label x={88} y={198} fill="#52525b" size={5.8}>
          {content.landmarksLabel}
        </Label>
        <Label x={270} y={198} fill="#52525b" size={5.8}>
          {content.trackingLabel}
        </Label>

        <rect x={22} y={206} width={356} height={24} rx={6} fill="#0b0d11" stroke="#1f2937" />
        {content.metrics.map((metric, index) => {
          const labelX = [34, 128, 218, 306][index] ?? 34 + index * 90;
          const valueX = labelX + 40;
          return (
            <g key={metric.label}>
              <text x={labelX} y={221} fill="#71717a" fontSize={6.2}>
                {metric.label}
              </text>
              <text
                x={valueX}
                y={221}
                fill={toneColor[metric.tone]}
                fontSize={7.6}
              >
                {metric.value}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-[22%] top-[27%] h-24 animate-scan bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
    </Frame>
  );
}

type GravityTone = "accent" | "accent2" | "accent3" | "amber";

type Body = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  tone: GravityTone;
  rest: number;
};

const gravityColors: Record<GravityTone, string> = {
  accent: "#34d399",
  accent2: "#38bdf8",
  accent3: "#a78bfa",
  amber: "#f59e0b",
};

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createBodies(count: number, settled: boolean): Body[] {
  const random = seeded(1337);
  const tones: GravityTone[] = ["accent2", "accent", "amber", "accent3"];

  return Array.from({ length: count }, (_, index) => {
    const radius = 0.3 + random() * 0.42;
    return {
      x: (random() * 2 - 1) * 4.8,
      y: settled ? radius : 3.6 + random() * 5.4,
      z: (random() * 2 - 1) * 3.1,
      vx: (random() * 2 - 1) * 0.7,
      vy: 0,
      vz: (random() * 2 - 1) * 0.4,
      radius,
      tone: tones[index % tones.length],
      rest: 0,
    };
  });
}

function GravityPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { previewContent } = useContent();
  const content = previewContent.gravity;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const bodies = createBodies(18, reduce);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (body: Body) => {
      const depth = 7.5 + body.z;
      const scale = height / depth;
      return {
        x: width / 2 + body.x * scale * 0.8,
        y: height * 0.86 - body.y * scale * 0.82,
        r: Math.max(2.4, body.radius * scale * 1.05),
        depth,
      };
    };

    const drawFloor = () => {
      const horizon = height * 0.34;
      const bottom = height;
      const vanishX = width / 2;

      const glow = ctx.createRadialGradient(
        width / 2,
        height * 0.78,
        0,
        width / 2,
        height * 0.78,
        width * 0.55,
      );
      glow.addColorStop(0, "rgba(56,189,248,0.16)");
      glow.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(56,189,248,0.13)";
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i += 1) {
        ctx.beginPath();
        ctx.moveTo(vanishX + i * 9, horizon);
        ctx.lineTo(vanishX + i * width * 0.13, bottom);
        ctx.stroke();
      }
      for (let i = 1; i <= 8; i += 1) {
        const t = Math.pow(i / 8, 1.75);
        const y = horizon + (bottom - horizon) * t;
        ctx.globalAlpha = 0.35 + t * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const horizonLine = ctx.createLinearGradient(0, horizon, width, horizon);
      horizonLine.addColorStop(0, "rgba(56,189,248,0)");
      horizonLine.addColorStop(0.5, "rgba(56,189,248,0.32)");
      horizonLine.addColorStop(1, "rgba(56,189,248,0)");
      ctx.strokeStyle = horizonLine;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();
    };

    const drawBody = (body: Body) => {
      const { x, y, r } = project(body);
      const color = gravityColors[body.tone];
      const floorY = height * 0.86;
      const shadowScale = Math.max(0.2, 1 - body.y / 10);

      ctx.save();
      ctx.translate(x, floorY);
      ctx.scale(1, 0.32);
      const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.2);
      shadow.addColorStop(0, `rgba(0,0,0,${0.45 * shadowScale})`);
      shadow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const sphere = ctx.createRadialGradient(
        x - r * 0.35,
        y - r * 0.4,
        r * 0.1,
        x,
        y,
        r,
      );
      sphere.addColorStop(0, "#ffffff");
      sphere.addColorStop(0.18, color);
      sphere.addColorStop(1, "rgba(7,8,11,0.95)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `${color}88`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();

      if (body.y > 1.2) {
        ctx.strokeStyle = `${color}55`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.lineTo(x, Math.min(floorY, y + r + body.y * 8));
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const backdrop = ctx.createLinearGradient(0, 0, 0, height);
      backdrop.addColorStop(0, "#080b12");
      backdrop.addColorStop(0.55, "#07090e");
      backdrop.addColorStop(1, "#050608");
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, width, height);

      drawFloor();
      [...bodies]
        .sort((a, b) => b.z - a.z)
        .forEach(drawBody);
    };

    const step = (dt: number) => {
      for (const body of bodies) {
        body.vy -= 9.81 * dt;
        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.z += body.vz * dt;

        if (body.y < body.radius) {
          body.y = body.radius;
          if (Math.abs(body.vy) > 0.8) {
            body.vy = -body.vy * 0.62;
            body.vx *= 0.97;
            body.vz *= 0.97;
          } else {
            body.vy = 0;
            body.vx *= 0.94;
            body.vz *= 0.94;
          }
        }

        if (Math.abs(body.x) > 5.2) {
          body.x = Math.sign(body.x) * 5.2;
          body.vx *= -0.7;
        }
        if (Math.abs(body.z) > 3.2) {
          body.z = Math.sign(body.z) * 3.2;
          body.vz *= -0.7;
        }

        const settled =
          body.y <= body.radius + 0.01 && Math.abs(body.vy) < 0.9;
        if (settled) {
          body.rest += dt;
          if (body.rest > 1.6) {
            body.rest = 0;
            body.y = 8 + Math.random() * 3;
            body.vy = 0;
            body.vx = (Math.random() * 2 - 1) * 1.2;
            body.vz = (Math.random() * 2 - 1) * 0.5;
          }
        } else {
          body.rest = 0;
        }
      }
    };

    let previous = performance.now();

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible) {
        previous = now;
        return;
      }

      const raw = (now - previous) / 1000;
      previous = now;
      const elapsed = Math.min(raw, 0.05);

      const steps = Math.max(1, Math.ceil(elapsed / (1 / 120)));
      for (let i = 0; i < steps; i += 1) step(elapsed / steps);
      draw();
    };

    resize();
    if (reduce) {
      draw();
    } else {
      previous = performance.now();
      frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersection.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, []);

  return (
    <Frame>
      <div ref={wrapRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      <div className="absolute inset-x-0 top-3 flex flex-col items-center gap-1">
        <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[8.5px] tracking-[0.12em] text-white/65 uppercase backdrop-blur">
          {content.badge}
        </span>
        <p className="font-mono text-[7.5px] tracking-[0.28em] text-white/35 uppercase">
          {content.title} · {content.bodyLabel}
        </p>
      </div>

      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur">
          {content.metrics.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-[7px] tracking-[0.1em] text-white/40 uppercase">
                {metric.label}
              </span>
              <span
                className="font-mono text-[8.5px] font-medium"
                style={{ color: toneColor[metric.tone] }}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
        <span className="hidden shrink-0 font-mono text-[7px] tracking-[0.12em] text-white/25 uppercase sm:block">
          {content.floorLabel}
        </span>
      </div>
    </Frame>
  );
}

export function ProjectPreview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "gesture":
      return <GesturePreview />;
    case "gravity":
      return <GravityPreview />;
    default:
      return <GesturePreview />;
  }
}
