/**
 * Small line-art glyphs for the contact methods grid — same restrained
 * stroke language as the rest of the site's icons.
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

/** Phone / call us */
export function PhoneIcon() {
  return (
    <svg {...props}>
      <path d="M7 4h3l1.4 3.6-2 1.8a11 11 0 0 0 5.2 5.2l1.8-2L20 14v3c0 1.1-.9 2-2 2C10.5 19 5 13.5 5 6c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

/** Email */
export function EmailIcon() {
  return (
    <svg {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}
