// Structured page content — every string is an i18n key resolved at render
// time with t(). Lets the section components map over data instead of
// repeating markup. Mirrors the sections in the original HTML exactly.

import type { TranslationKey } from "./i18n/translations";
import { ARTICLES } from "./blog-articles";

type K = TranslationKey;

/* ---------------------------------------------------------------- shared */

export const FAQS: { q: K; a: K }[] = [
  { q: "faq_q1", a: "faq_a1" },
  { q: "faq_q2", a: "faq_a2" },
  { q: "faq_q3", a: "faq_a3" },
  { q: "faq_q4", a: "faq_a4" },
  { q: "faq_q5", a: "faq_a5" },
  { q: "faq_q6", a: "faq_a6" },
];

export const WHY_CARDS: { index: string; h: K; p: K }[] = [
  { index: "01", h: "why_1_h", p: "why_1_p" },
  { index: "02", h: "why_2_h", p: "why_2_p" },
  { index: "03", h: "why_3_h", p: "why_3_p" },
];

export const PROCESS_STEPS: { tag: K; h: K; p: K }[] = [
  { tag: "process_s1_tag", h: "process_s1_h", p: "process_s1_p" },
  { tag: "process_s2_tag", h: "process_s2_h", p: "process_s2_p" },
  { tag: "process_s3_tag", h: "process_s3_h", p: "process_s3_p" },
  { tag: "process_s4_tag", h: "process_s4_h", p: "process_s4_p" },
];

// "By the numbers" block — reused on home + about.
export const NUMBERS: { value?: K; count?: number; suffix?: string; label: K }[] = [
  { value: "num_1_value", label: "num_1_label" },
  { count: 2500, suffix: "+", label: "num_2_label" },
  { count: 10, suffix: "+", label: "num_3_label" },
  { count: 40, suffix: "%", label: "num_4_label" },
];

/* ---------------------------------------------------------------- home */

export const HERO_STRIP: K[] = [
  "hero_strip_1",
  "hero_strip_2",
  "hero_strip_3",
  "hero_strip_4",
];

export const ABOUT_LIST: K[] = ["about_li_1", "about_li_2", "about_li_3"];

export const ABOUT_STATS: {
  value?: string;
  count?: number;
  suffix?: string;
  label: K;
}[] = [
  { value: "2018", label: "about_stat_1_label" },
  { count: 10000, suffix: "+", label: "about_stat_2_label" },
  { count: 150, suffix: "+ MWp", label: "about_stat_3_label" },
];

export const HOME_SERVICES: { h: K; p: K }[] = [
  { h: "svc_1_h", p: "svc_1_p" },
  { h: "svc_2_h", p: "svc_2_p" },
  { h: "svc_3_h", p: "svc_3_p" },
  { h: "svc_4_h", p: "svc_4_p" },
];

export const QUOTE_LIST: K[] = [
  "quote_li_1",
  "quote_li_2",
  "quote_li_3",
  "quote_li_4",
];

export const AREAS_MINI: { city: K; note: K }[] = [
  { city: "areas_m1_city", note: "areas_m1_note" },
  { city: "areas_m2_city", note: "areas_m2_note" },
  { city: "areas_m3_city", note: "areas_m3_note" },
  { city: "areas_m4_city", note: "areas_m4_note" },
  { city: "areas_m5_city", note: "areas_m5_note" },
  { city: "areas_m6_city", note: "areas_m6_note" },
];

export const AREAS_MORE: K[] = [
  "areas_more_1",
  "areas_more_2",
  "areas_more_3",
  "areas_more_4",
  "areas_more_5",
  "areas_more_6",
  "areas_more_7",
  "areas_more_8",
];

export const WORK_ITEMS: {
  src: string;
  alt: string;
  a: K;
  b: K;
  modifier?: "work-item--wide" | "work-item--tall";
}[] = [
  {
    src: "/assets/img/gallery/customer-piplav-rooftop.webp",
    alt: "A customer standing on her terrace under her newly installed rooftop solar panels in Piplav, Gujarat",
    a: "work_1_a",
    b: "work_1_b",
    modifier: "work-item--wide",
  },
  {
    src: "/assets/img/gallery/rooftop-kaprupur.webp",
    alt: "A completed rooftop solar mounting structure above a home in Kaprupur, Gujarat",
    a: "work_2_a",
    b: "work_2_b",
  },
  {
    src: "/assets/img/gallery/rooftop-array-closeup.webp",
    alt: "Close-up of a tilted rooftop solar array overlooking a Gujarat village",
    a: "work_3_a",
    b: "work_3_b",
  },
  {
    src: "/assets/img/gallery/rooftop-terrace-array.webp",
    alt: "A rooftop solar array mounted beside a home's terrace in Gujarat",
    a: "work_4_a",
    b: "work_4_b",
  },
  {
    src: "/assets/img/gallery/rooftop-tinroof-angle.webp",
    alt: "Solar panels angled above a tin roof on a rural Gujarat home",
    a: "work_5_a",
    b: "work_5_b",
    modifier: "work-item--tall",
  },
  {
    src: "/assets/img/gallery/rooftop-terrace-structure.webp",
    alt: "A rooftop solar mounting structure over an empty terrace, overlooking a Gujarat town",
    a: "work_6_a",
    b: "work_6_b",
  },
];

/** Real customer reviews from thesolarcoop.in's own homepage testimonials. */
export const HOME_REVIEWS: { p: K; name: string; meta: K }[] = [
  { p: "review_1_p", name: "Niruben Hasmukhbhai Gadhavi", meta: "review_1_meta" },
  { p: "review_2_p", name: "Patel Sanjaykumar Jashbhai", meta: "review_2_meta" },
  { p: "review_3_p", name: "Valand Jagrutiben Manishbhai", meta: "review_3_meta" },
  { p: "review_4_p", name: "Gandhubhai Punabhai Bharwad", meta: "review_4_meta" },
  { p: "review_5_p", name: "Mukeshbhai Ramanbhai Patel", meta: "review_5_meta" },
];

/* ---------------------------------------------------------------- about */

export const ABOUT_STORY: { h: K; body: K[] }[] = [
  { h: "ab_story_1_h", body: ["ab_story_1_p1", "ab_story_1_p2"] },
  { h: "ab_story_2_h", body: ["ab_story_2_p1", "ab_story_2_p2"] },
  { h: "ab_story_3_h", body: ["ab_story_3_p1", "ab_story_3_p2"] },
];

export const ABOUT_VISION_MISSION: { h: K; body: K[] }[] = [
  { h: "ab_vision_h", body: ["ab_vision_p1", "ab_vision_p2"] },
  { h: "ab_mission_h", body: ["ab_mission_p1", "ab_mission_p2"] },
];

export const ABOUT_SOLUTIONS: { index: string; h: K; p: K }[] = [
  { index: "01", h: "ab_sol_1_h", p: "ab_sol_1_p" },
  { index: "02", h: "ab_sol_2_h", p: "ab_sol_2_p" },
  { index: "03", h: "ab_sol_3_h", p: "ab_sol_3_p" },
];

export const FOUNDER_CREDENTIALS: K[] = [
  "ab_founder_cred_1",
  "ab_founder_cred_2",
  "ab_founder_cred_3",
];

export const ABOUT_JOURNEY: { count: number; suffix?: string; label: K }[] = [
  { count: 4, suffix: "MW+", label: "ab_journey_1_label" },
  { count: 2, suffix: "MW+", label: "ab_journey_2_label" },
  { count: 1, suffix: "MW+", label: "ab_journey_3_label" },
  { count: 12, suffix: "MW+", label: "ab_journey_4_label" },
  { count: 22, suffix: "+", label: "ab_journey_5_label" },
  { count: 1120, suffix: "+", label: "ab_journey_6_label" },
  { count: 3, suffix: "+", label: "ab_journey_7_label" },
  { count: 25, suffix: "+", label: "ab_journey_8_label" },
];

/* ---------------------------------------------------------------- services */

export const SERVICE_DETAILS: { id: string; h: K; p: K; bullets: K[] }[] = [
  {
    id: "residential",
    h: "svc_1_h",
    p: "sv_res_p",
    bullets: ["sv_res_b1", "sv_res_b2", "sv_res_b3", "sv_res_b4"],
  },
  {
    id: "commercial",
    h: "svc_2_h",
    p: "sv_ci_p",
    bullets: ["sv_ci_b1", "sv_ci_b2", "sv_ci_b3", "sv_ci_b4"],
  },
  {
    id: "farmers",
    h: "svc_3_h",
    p: "sv_farm_p",
    bullets: ["sv_farm_b1", "sv_farm_b2", "sv_farm_b3", "sv_farm_b4"],
  },
  {
    id: "maintenance",
    h: "svc_4_h",
    p: "sv_maint_p",
    bullets: ["sv_maint_b1", "sv_maint_b2", "sv_maint_b3", "sv_maint_b4"],
  },
];

/* ---------------------------------------------------------------- pm surya ghar */

export const PM_STAT_BAND: {
  value?: K;
  count?: number;
  suffix?: string;
  label: K;
}[] = [
  { value: "pm_stat_1_v", label: "pm_stat_1_l" },
  { count: 40, suffix: "%", label: "pm_stat_2_l" },
  { value: "pm_stat_3_v", label: "pm_stat_3_l" },
];

export const PM_ABOUT: { h: K; body: K[] }[] = [
  { h: "pm_about_1_h", body: ["pm_about_1_p1", "pm_about_1_p2"] },
  { h: "pm_about_2_h", body: ["pm_about_2_p1"] },
];

export const PM_BENEFITS: K[] = ["pm_b1", "pm_b2", "pm_b3", "pm_b4"];

export const PM_TABLE = {
  headers: ["pm_th_1", "pm_th_2", "pm_th_3"] as K[],
  rows: [
    ["pm_tr1_1", "pm_tr1_2", "pm_tr1_3"],
    ["pm_tr2_1", "pm_tr2_2", "pm_tr2_3"],
    ["pm_tr3_1", "pm_tr3_2", "pm_tr3_3"],
  ] as K[][],
};

export const PM_ELIGIBILITY: K[] = ["pm_e1", "pm_e2", "pm_e3", "pm_e4"];
export const PM_DOCUMENTS: K[] = ["pm_d1", "pm_d2", "pm_d3", "pm_d4"];

export const PM_HOW_STEPS: K[] = [
  "pm_help_step_1",
  "pm_help_step_2",
  "pm_help_step_3",
  "pm_help_step_4",
];

/* ---------------------------------------------------------------- contact */

export const CONTACT_METHODS: {
  label: K;
  href: string;
  value: "address" | "email" | "phone";
  external?: boolean;
  note: K;
}[] = [
  { label: "ct_visit_label", href: "maps", value: "address", external: true, note: "ct_visit_note" },
  { label: "ct_email_label", href: "email", value: "email", note: "ct_email_note" },
  { label: "ct_call_label", href: "phone", value: "phone", note: "ct_call_note" },
];

export const PROJECT_TYPE_OPTIONS: K[] = [
  "form_opt_res",
  "form_opt_ci",
  "form_opt_farm",
  "form_opt_maint",
  "form_opt_unsure",
];

/* ---------------------------------------------------------------- blog */

/**
 * Real posts, pulled from the live thesolarcoop.in/blogs — titles, dates,
 * images and full bodies are theirs, sourced live (see lib/blog-articles.ts
 * for the full article content). Each card now opens a real page on our own
 * /blog/[slug]/, not the original site — nothing here is invented.
 */
export const BLOG_POSTS: {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO, for <time dateTime>
  dateLabel: string;
  href: string;
  image: string;
  imageAlt: string;
}[] = ARTICLES.map((a) => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.dek,
  date: a.date,
  dateLabel: a.dateLabel,
  href: `/blog/${a.slug}/`,
  image: a.image,
  imageAlt: a.imageAlt,
}));
