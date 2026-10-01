/**
 * Quiet, letterpress-like line-art marks — `currentColor` stroke so a
 * wrapper controls color/opacity (see `.cta-sun`, `.page-mark`). One shape
 * per recurring "closer" (CtaBand) or per inner page (PageHero), so each
 * inner page carries its own quiet signature instead of an identical hero.
 */

const svgProps = {
  viewBox: "0 0 120 120",
  fill: "none" as const,
  "aria-hidden": true as const,
};

/** PM Surya Ghar literally means "PM Sun House" — also the CtaBand closer. */
export function SunMark() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg {...svgProps}>
      <circle cx="60" cy="60" r="24" stroke="currentColor" strokeWidth="1.5" />
      {rays.map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="18"
          x2="60"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}
    </svg>
  );
}

/** About: three overlapping circles — a cooperative, not a single company. */
export function CoopMark() {
  return (
    <svg {...svgProps}>
      <circle cx="46" cy="48" r="27" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="78" cy="48" r="27" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="62" cy="78" r="27" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Services: a panel array. */
export function GridMark() {
  const cols = [10, 46, 82];
  const rows = [16, 66];
  return (
    <svg {...svgProps}>
      {rows.map((y) =>
        cols.map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="28"
            height="42"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )),
      )}
    </svg>
  );
}

/** Contact: a map pin. */
export function PinMark() {
  return (
    <svg {...svgProps}>
      <path
        d="M60 12c-20 0-36 16-36 35 0 27 36 61 36 61s36-34 36-61c0-19-16-35-36-35z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="47" r="13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export const MARKS = {
  sun: SunMark,
  coop: CoopMark,
  grid: GridMark,
  pin: PinMark,
} as const;

export type MarkKind = keyof typeof MARKS;
