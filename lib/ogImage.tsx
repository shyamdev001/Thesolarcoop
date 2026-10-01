/**
 * Shared building block for every route's `opengraph-image.tsx`. Renders a
 * flat, on-brand 1200x630 card via `next/og` (`ImageResponse` — Satori
 * under the hood, so only a constrained flex/CSS subset + inline <svg>;
 * raster `<img>` decoding is PNG/JPEG-only, so the brand mark below is
 * typographic + inline SVG rather than the site's .webp logo file).
 * No custom fonts are loaded (network-fetch risk at build time) — the
 * default sans falls back cleanly at this size.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#f6f5f1";
const INK = "#12110f";
const INK_2 = "#57534a";
const ACCENT = "#ff6a1a";
const LINE = "rgba(18, 17, 15, 0.12)";

/** A faint concentric sun mark — the same motif as the homepage CTA band. */
function SunMark() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30;
    return (
      <line
        key={deg}
        x1="60"
        y1="6"
        x2="60"
        y2="18"
        stroke={ACCENT}
        strokeWidth="2.4"
        strokeLinecap="round"
        transform={`rotate(${deg} 60 60)`}
      />
    );
  });
  return (
    <svg width="420" height="420" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="24" stroke={ACCENT} strokeWidth="2" fill="none" opacity={0.9} />
      {rays}
    </svg>
  );
}

export function renderOgImage(eyebrow: string, title: string) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        padding: "60px 68px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* faint sun mark, bleeding off the bottom-right corner */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: -90,
          bottom: -90,
          opacity: 0.55,
        }}
      >
        <SunMark />
      </div>

      {/* brand row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" stroke={ACCENT} strokeWidth="2" fill="none" />
          <circle cx="20" cy="20" r="8" fill={ACCENT} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: INK, letterSpacing: -0.4 }}>
            The Solar Coop
          </span>
          <span style={{ fontSize: 14, color: INK_2, letterSpacing: 1 }}>thesolarcoop.in</span>
        </div>
      </div>

      <div
        style={{ display: "flex", width: 64, height: 1, background: LINE, margin: "36px 0 30px" }}
      />

      {/* the page's own copy */}
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
        <span
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 700,
            color: ACCENT,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            display: "flex",
            fontSize: 50,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.22,
            letterSpacing: -1,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
