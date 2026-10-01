// Shared, non-translated site constants (contact details, routes).
// Values are taken verbatim from the original site (src/partials.js).

export const CONTACT = {
  phoneHref: "tel:+918140968999",
  phoneDisplay: "+91 81409 68999",
  emailHref: "mailto:sales@thesolarcoop.in",
  email: "sales@thesolarcoop.in",
  address:
    "B-22, Sardar Patel Anaj Market Yard, College Crossing, Petlad, Gujarat 384973",
  mapsHref:
    "https://maps.google.com/?q=Sardar+Patel+Anaj+Market+Yard,+College+Crossing,+Petlad,+Gujarat+384973",
  legalName: "Petlad Sojitra Taluka Sauraurja Utpadak Sahkari Mandali Ltd",
} as const;

// Real, live profiles — pulled from thesolarcoop.in's own "Follow Us" links.
export const SOCIAL_LINKS = [
  { name: "Facebook" as const, href: "https://www.facebook.com/thesolarcoop.in" },
  { name: "Instagram" as const, href: "https://www.instagram.com/thesolarcoop/" },
  { name: "YouTube" as const, href: "https://www.youtube.com/@thesolarcoop" },
];

export type NavItem = { href: string; key: import("./i18n/translations").TranslationKey };

// Primary navigation.
export const NAV: NavItem[] = [
  { href: "/", key: "nav_home" },
  { href: "/about/", key: "nav_about" },
  { href: "/services/", key: "nav_services" },
  { href: "/pm-surya-ghar/", key: "nav_pmsg" },
  { href: "/contact/", key: "nav_contact" },
];
