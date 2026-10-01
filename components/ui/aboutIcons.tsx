/**
 * Small line-art glyphs for the About page's story timeline and
 * vision/mission cards — same restrained stroke language as the rest of
 * the site's icons (marks.tsx, processIcons.tsx, serviceIcons.tsx).
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

/** "Where it started" — a sprouting seed. */
export function OriginIcon() {
  return (
    <svg {...props}>
      <path d="M12 20.5V11" />
      <path d="M12 12c0-4 2.5-6.5 7-7 0 4.5-2.5 7-7 7Z" />
      <path d="M12 14.5c0-3-2-5-5.5-5.5C6.5 12.5 8.5 14.5 12 14.5Z" />
    </svg>
  );
}

/** "How farmers use it" — a borewell / irrigation pump. */
export function PumpIcon() {
  return (
    <svg {...props}>
      <path d="M6.5 20.5V13a5.5 5.5 0 0 1 11 0v7.5" />
      <path d="M4 20.5h16" />
      <path d="M9 9.5V5.5M9 5.5 7 3.5M9 5.5l2-2" />
    </svg>
  );
}

/** "Vision" — an eye on the horizon. */
export function VisionIcon() {
  return (
    <svg {...props}>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

/** "Mission" — a compass. */
export function MissionIcon() {
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.6 9.4-1.4 4-4 1.4 1.4-4Z" />
    </svg>
  );
}

/** Small checkmark for the founder's credential list. */
export function CheckIcon() {
  return (
    <svg {...props}>
      <path d="M4.5 12.5 9.2 17 19.5 6.5" />
    </svg>
  );
}

/** "Channel partners" — two linked nodes. */
export function PartnersIcon() {
  return (
    <svg {...props}>
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="m9.3 9.3 5.4 5.4" />
    </svg>
  );
}

/** "Cities we serve" — a map pin. */
export function PinIcon() {
  return (
    <svg {...props}>
      <path d="M12 21s7-7.05 7-12a7 7 0 1 0-14 0c0 4.95 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

/** "Team strength" — two people. */
export function TeamIcon() {
  return (
    <svg {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15 13.9c2.7.5 4.5 2.4 4.5 5.6" />
    </svg>
  );
}
