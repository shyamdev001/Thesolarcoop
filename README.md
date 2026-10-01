# The Solar Coop — website (Next.js)

Marketing site for **The Solar Coop** (Petlad Sojitra Taluka Sauraurja Utpadak
Sahkari Mandali Ltd), a solar cooperative serving homes, farms and businesses
across Gujarat.

This started as a **migration** of the original Vite + vanilla-JS build (kept
in `../solvex/` for reference) to Next.js, preserving the original's visual
design, content, layout and bilingual behaviour as-is. That migration is
done — the site has since gone through a full premium redesign pass on top
of it (About/Services/PM Surya Ghar/Contact pages, a real internal blog with
4 full articles, and a site-wide GSAP + Lenis motion system), while keeping
every fact, photo and figure real and sourced from thesolarcoop.in.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — installed and wired, but the design still lives in
  `app/globals.css` (ported from the original token-based stylesheet). No
  utility classes are used yet.
- **GSAP + Lenis** — the site's motion system (smooth scroll, scroll reveals,
  parallax, mask-text headings, page-transition wipe, custom cursor), all in
  `components/motion/` — see `tokens.ts` for the shared timing/easing language
- `next/font` for Manrope / Inter / Noto Sans Gujarati

## Run

```bash
npm install
npm run dev        # http://localhost:3100
npm run build
npm run start      # http://localhost:3100
npm run lint
npm run typecheck
```

## Structure

```
app/
  layout.tsx             fonts, metadata, JSON-LD, providers, <Navbar>/<Footer>/<main>
  template.tsx           page-transition wipe (remounts on every navigation)
  page.tsx                home
  about|services|pm-surya-ghar|contact|privacy-policy/page.tsx
  blog/page.tsx           listing · blog/[slug]/page.tsx   real article pages
  api/quote/route.ts     quote form → SMTP email (see "Quote form email" below)
  sitemap.ts, robots.ts, manifest.ts   generated from the same real routes/articles
  globals.css             the full design system (ported verbatim + font vars)
  not-found.tsx, error.tsx   branded fallbacks (same language as the rest of the site)
components/
  layout/                Navbar, Footer, SkipLink
  sections/              one component per section, one per page/article
  ui/                    Button, Eyebrow, SectionHead, CheckList, CountStat, icon sets
  motion/                GSAP + Lenis system — tokens.ts (shared timing/easing),
                         reveal-core.ts + ScrollReveal.tsx (scroll reveals),
                         SmoothScroll.tsx (Lenis), MaskText, Cursor, Preloader
lib/
  i18n/                  translations.ts (en/gu) + context.tsx (LanguageProvider)
  content.ts             structured page content (keyed to i18n)
  blog-articles.ts       full real article bodies (English-only, see below)
  site.ts                contact details + nav
public/
  new-logo.webp, favicon.png, assets/img/*, assets/video/*
```

## Language

English / Gujarati, toggled from the navbar. The choice is stored in
`localStorage["tsc-lang"]` and drives `<html lang>` (which the `:root[lang="gu"]`
rules in `globals.css` use to switch typography). SSR renders English; a tiny
inline script in `<head>` applies the stored language before first paint.

## Content

All company facts, services, stats, testimonials and FAQ answers come from
thesolarcoop.in. Most photos are the cooperative's own (its site/gallery),
some are royalty-free stock (Pexels, Mixkit, Wikimedia Commons) where no real
photo existed. The 4 blog articles are the real posts from
thesolarcoop.in/blog/1–4, reorganised for the editorial layout but not
reworded, and — like the ported Privacy Policy — kept English-only rather
than run through the i18n system.

## Quote form email

`QuoteForm` submits to `app/api/quote/route.ts`, which emails the enquiry via
plain SMTP (`nodemailer`) — works with whatever mailbox already hosts
sales@thesolarcoop.in, no new third-party account needed. Copy `.env.example`
to `.env.local` (or set the same keys in your host's environment variables)
with real SMTP credentials; until those are set the endpoint responds 503 and
the form shows its error state (with a direct call/email fallback) rather
than a fake success. Includes a honeypot field and a light per-IP rate limit.

## Hardening

`next.config.ts` sets baseline security headers (`X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, a `Permissions-Policy` disabling unused
device APIs) — no CSP, since one worth having needs nonces threaded through
the site's few legitimate inline scripts, not bolted on. `/api/quote` checks
the request's `Origin` against its own host and rate-limits by IP on top of
the honeypot. A PWA `manifest.ts` (icons generated from the real logo) and a
branded `error.tsx` (matching `not-found.tsx`) round out the App Router's
metadata/fallback conventions.

## Analytics

`components/Analytics.tsx` loads GA4 (gtag.js) only when `NEXT_PUBLIC_GA_ID`
is set (see `.env.example`) — no placeholder ID, nothing loads until you
provide a real one. The quote form fires a `generate_lead` event on a
successful submit via the exported `trackEvent()` helper, a no-op when
Analytics isn't configured.

## Gallery

`/gallery/` — real project photos (downloaded + compressed from
thesolarcoop.in's own `/gallery`, `public/assets/img/gallery/`) in a reveal
grid with a small built-in lightbox (arrow keys + Escape, no library), plus
a Videos tab. The 6 site-visit videos are linked straight from the source
site's own hosting rather than self-hosted — real footage, ~28MB across 6
files, not worth duplicating into this repo. Linked from the footer (not
the primary nav — see the note in `components/layout/Navbar.tsx`'s CSS
about the nav being tuned for exactly 5 items).

## Images

Every photo goes through `next/image` (`fill` + a per-component `sizes`) for
responsive `srcset` and automatic AVIF/WebP — logos, the preloader mark, and
a few small decorative thumbnails (Why.tsx's plate stack, the homepage
services cursor-preview) are left as plain `<img>` on purpose: too small for
the optimizer to matter, and in the logo/preloader cases already directly
GSAP-animated in a way not worth the extra risk to touch. Every `fill`
wrapper needs `position: relative` and its own intrinsic size (`aspect-ratio`
or `min-height`) — both already true of every wrapper this uses.

## Known gaps

- No SMTP credentials set yet (see "Quote form email" above) or GA
  measurement ID (see "Analytics" above) — both pipes are built and wired,
  just waiting on real values only you can provide.
- Gujarati is client-only (SSR always renders English; the translation swaps
  in after hydration reads `localStorage`) — there's no separate `/gu/`
  URL, so search engines have nothing Gujarati to index or rank. Real
  locale routing (`/gu/about/`, `hreflang` tags) would fix this properly,
  but it's a genuine architecture change — new URLs for every page, updated
  internal links, and the navbar's instant toggle becoming a real
  navigation — so it hasn't been done without that being a deliberate call.
- The original site's `/news` page is empty on the source itself, so it
  wasn't worth porting.
