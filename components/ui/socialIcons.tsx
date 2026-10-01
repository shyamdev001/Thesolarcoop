/**
 * Minimal line-art glyphs for the footer's social links — same restrained
 * stroke language as the rest of the site's iconography (see marks.tsx),
 * not a redrawn copy of any platform's actual logo mark.
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

export function FacebookIcon() {
  return (
    <svg {...props}>
      <path d="M14.5 8.5h2V5.2c-.35-.05-1.55-.2-2.95-.2-2.9 0-4.9 1.77-4.9 5.03V13H6.5v3.6h2.85V21h3.6v-4.4h2.75l.45-3.6h-3.2v-2.6c0-1.04.29-1.9 1.55-1.9Z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
      <path d="M10.5 9.6 15 12l-4.5 2.4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * WhatsApp's own silhouette — a filled white speech bubble with a green
 * "cutout" handset, same two-tone construction the real app icon uses
 * (build our own path data, not their trademarked artwork). The bubble
 * shape itself is what actually reads as "WhatsApp" at a glance; a plain
 * phone glyph on a green circle reads as "call us" instead.
 */
export function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3.2C9.35 3.2 3.95 8.5 3.95 15.03c0 2.35.66 4.55 1.8 6.43L4 28.8l7.58-1.98a12.3 12.3 0 0 0 4.42.82c6.65 0 12.05-5.3 12.05-11.83S22.65 3.2 16 3.2Z"
        fill="#fff"
      />
      <path
        d="M12.1 10.6c.32-.02.64-.02.92.01.32.03.5.05.72.55.27.6.9 2.1.98 2.25.08.16.13.34.03.55-.1.2-.15.3-.3.46-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3 1 1.63 2.16 2.64 1.48 1.29 2.73 1.7 3.12 1.89.39.19.62.16.85-.1.23-.25.98-1.1 1.24-1.48.26-.37.51-.31.86-.19.35.12 2.24 1.02 2.62 1.2.38.18.63.28.72.43.09.16.09.9-.22 1.77-.31.87-1.79 1.62-2.5 1.72-.71.11-1.49.18-2.4-.14-.55-.19-1.25-.42-2.15-.8-3.8-1.6-6.28-5.4-6.47-5.66-.19-.26-1.55-2.02-1.55-3.85s.99-2.75 1.34-3.13c.35-.38.76-.52.6-.52Z"
        fill="#25d366"
      />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
} as const;
