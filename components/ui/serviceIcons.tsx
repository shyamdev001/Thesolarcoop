/**
 * One small line-art glyph per home service — same restrained stroke
 * language as the rest of the site's icons (marks.tsx, processIcons.tsx).
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

/** Residential rooftop solar */
export function ResidentialIcon() {
  return (
    <svg {...props}>
      <path d="M3.5 12 12 4.5 20.5 12" />
      <path d="M6 10.3V19a.6.6 0 0 0 .6.6h10.8a.6.6 0 0 0 .6-.6v-8.7" />
      <path d="M9.5 19.6V14h5v5.6" />
    </svg>
  );
}

/** Commercial & industrial solar */
export function CommercialIcon() {
  return (
    <svg {...props}>
      <rect x="4" y="8.5" width="8" height="11" />
      <rect x="12" y="4" width="8" height="15.5" />
      <path d="M6.3 11.2h1M6.3 14h1M6.3 16.8h1M14.5 6.7h1M14.5 9.5h1M14.5 12.3h1M14.5 15.1h1" />
    </svg>
  );
}

/** Solar for farmers */
export function FarmIcon() {
  return (
    <svg {...props}>
      <path d="M12 20.5c0-6 3-9 6.5-10.5C17 13.5 15 17 12 20.5Z" />
      <path d="M12 20.5c0-6-3-9-6.5-10.5C7 13.5 9 17 12 20.5Z" />
      <path d="M12 20.5V13" />
    </svg>
  );
}

/** Maintenance & monitoring */
export function MaintenanceIcon() {
  return (
    <svg {...props}>
      <path d="M14.7 9.3a3.2 3.2 0 0 1-4.2 4.2l-5.2 5.2a1.4 1.4 0 0 1-2-2l5.2-5.2a3.2 3.2 0 0 1 4.2-4.2l-2.4 2.4 1.8 1.8 2.4-2.4Z" />
    </svg>
  );
}

export const SERVICE_ICONS = [ResidentialIcon, CommercialIcon, FarmIcon, MaintenanceIcon] as const;
