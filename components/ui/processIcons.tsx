/**
 * One small line-art glyph per process step — same restrained stroke
 * language as the rest of the site's icons (marks.tsx, socialIcons.tsx).
 */

const props = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Survey & feasibility */
export function SurveyIcon() {
  return (
    <svg {...props}>
      <circle cx="10.3" cy="10.3" r="6.3" />
      <path d="M15 15 20.5 20.5" />
    </svg>
  );
}

/** Design & proposal */
export function DesignIcon() {
  return (
    <svg {...props}>
      <path d="M6.5 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M13.5 3.5V7a.5.5 0 0 0 .5.5h3.5" />
      <path d="M8.7 12h6.6M8.7 15.3h6.6M8.7 8.7h3" />
    </svg>
  );
}

/** Installation */
export function InstallIcon() {
  return (
    <svg {...props}>
      <rect x="3.5" y="6" width="17" height="10.5" rx="1.4" />
      <path d="M3.5 11.25h17M9 6v10.5M14.5 6v10.5" />
    </svg>
  );
}

/** Commissioning */
export function CommissionIcon() {
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M8.3 12.3 10.6 14.6 15.5 9.5" />
    </svg>
  );
}

export const PROCESS_ICONS = [SurveyIcon, DesignIcon, InstallIcon, CommissionIcon] as const;
