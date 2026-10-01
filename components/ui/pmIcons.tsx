/**
 * Small line-art glyphs for the PM Surya Ghar "we handle the paperwork"
 * step-through — same restrained stroke language as the rest of the site's
 * icons (aboutIcons.tsx, processIcons.tsx, serviceIcons.tsx).
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

/** National Portal application — a form. */
export function FormIcon() {
  return (
    <svg {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </svg>
  );
}

/** DISCOM approval — a stamped check. */
export function ApprovalIcon() {
  return (
    <svg {...props}>
      <path d="M12 3.5 5 6.5v5c0 5 3 8 7 9 4-1 7-4 7-9v-5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

/** Net-metering — a gauge/dial. */
export function MeterIcon() {
  return (
    <svg {...props}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 15.5 9.5" />
      <path d="M4 15h1.5M18.5 15H20M6.5 8.5l1 1M17.5 8.5l-1 1" />
    </svg>
  );
}

/** Subsidy claim — a coin. */
export function SubsidyIcon() {
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M14.7 9.8c0-1.1-1.2-2-2.7-2s-2.7.7-2.7 1.8c0 2.4 5.4.9 5.4 3.4 0 1.1-1.2 1.9-2.7 1.9s-2.7-.9-2.7-2" />
    </svg>
  );
}

/** Launch date / key facts — a calendar. */
export function CalendarIcon() {
  return (
    <svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

/** A percentage. */
export function PercentIcon() {
  return (
    <svg {...props}>
      <circle cx="7.5" cy="7.5" r="2.3" />
      <circle cx="16.5" cy="16.5" r="2.3" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/** Clean energy / lower emissions — a leaf. */
export function LeafIcon() {
  return (
    <svg {...props}>
      <path d="M5 19c8 0 14-6 14-14 0 0-13-1-14 12-.3 3.4 0 2 0 2Z" />
      <path d="M5 19c2-4 5-7 9-9" />
    </svg>
  );
}

/** Less grid dependence — a plug. */
export function PlugIcon() {
  return (
    <svg {...props}>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0Z" />
      <path d="M12 17v4" />
    </svg>
  );
}

/** Eligibility — a person, checked. */
export function PersonCheckIcon() {
  return (
    <svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c0-3.3 2.5-5.7 5.5-5.7 1.2 0 2.3.4 3.2 1" />
      <path d="m14.5 17 2 2 3.5-4" />
    </svg>
  );
}

/** Documents — a folder. */
export function FolderIcon() {
  return (
    <svg {...props}>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h4l2 2.2h7A1.5 1.5 0 0 1 20 8.7v9.3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V6.5Z" />
    </svg>
  );
}
