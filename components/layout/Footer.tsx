"use client";

import Link from "next/link";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { CONTACT, SOCIAL_LINKS } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/ui/socialIcons";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsoLayoutEffect } from "@/components/motion/useIsoLayoutEffect";
import { DUR, EASE } from "@/components/motion/tokens";

export function Footer() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const markRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  // The closing brand lockup is choreographed as two beats, not one block:
  // the logo settles in first (a quiet scale + fade), then the giant
  // wordmark wipes up into view behind it (same clip-path reveal the site
  // already uses for photos) with a small upward drift.
  //
  // This used to be scrubbed to scroll position ("top bottom" → "bottom
  // bottom" of the mark), so the lockup only finished exactly as the reader
  // reached the true bottom of the page. That depends on the page's total
  // scroll height staying put while it plays — on mobile, the address bar
  // hiding/showing mid-scroll changes that height, so the scrub's progress
  // could stall short of 1 and leave the wordmark permanently half-clipped.
  // A one-shot reveal — same as every other [data-reveal] element on this
  // site — only needs its trigger to fire once, so it can't get stuck.
  useIsoLayoutEffect(() => {
    if (reduce) return;
    const mark = markRef.current;
    const logo = logoRef.current;
    const word = wordRef.current;
    if (!mark || !logo || !word) return;

    // Hard rule shared with the rest of the reveal system: never hide
    // something already on screen at setup.
    const vh = window.innerHeight;
    if (!vh || mark.getBoundingClientRect().top < vh) return;

    gsap.set(logo, { autoAlpha: 0, scale: 0.8, yPercent: 10 });
    gsap.set(word, { clipPath: "inset(100% 0% 0% 0%)", yPercent: 6 });

    let played = false;
    const play = () => {
      played = true;
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(logo, { clearProps: "opacity,visibility,transform" });
            gsap.set(word, { clearProps: "clipPath,transform" });
          },
        })
        .to(logo, { autoAlpha: 1, scale: 1, yPercent: 0, ease: EASE.soft, duration: DUR.base }, 0)
        .to(word, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, ease: EASE.out, duration: DUR.slow }, 0.18);
    };

    const st = ScrollTrigger.create({ trigger: mark, start: "top 90%", once: true, onEnter: play });

    // Rescue: if the trigger somehow never fires (starved ticker,
    // backgrounded tab), force the lockup visible rather than leave it
    // stuck hidden — never a full-screen-height rescue window, just "the
    // mark is on screen and nothing has played yet."
    const rescue = () => {
      if (played) return;
      const r = mark.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        played = true;
        st.kill();
        gsap.set(logo, { clearProps: "opacity,visibility,transform" });
        gsap.set(word, { clearProps: "clipPath,transform" });
      }
    };
    const failsafe = window.setTimeout(rescue, 2500);
    document.addEventListener("visibilitychange", rescue);

    return () => {
      st.kill();
      window.clearTimeout(failsafe);
      document.removeEventListener("visibilitychange", rescue);
      if (!played) {
        gsap.set(logo, { clearProps: "opacity,visibility,transform" });
        gsap.set(word, { clearProps: "clipPath,transform" });
      }
    };
  }, [reduce]);

  return (
    <footer className="site-footer">
      <span className="footer-glow" aria-hidden="true" />
      <span className="footer-vignette" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-top" data-reveal>
          <Link href="/" className="footer-brand" aria-label="The Solar Coop — home">
            <img src="/new-logo.webp" alt="" className="brand-logo" />
            <span className="brand-name">The Solar Coop</span>
          </Link>
          <p className="footer-about">{t("footer_about")}</p>
          <div className="footer-contact">
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer">
              {CONTACT.address}
            </a>
          </div>
        </div>

        <div className="footer-cols" data-reveal>
          <div className="footer-col">
            <h3>{t("footer_col_services")}</h3>
            <Link href="/services/#residential">{t("footer_s1")}</Link>
            <Link href="/services/#commercial">{t("footer_s2")}</Link>
            <Link href="/services/#farmers">{t("footer_s3")}</Link>
            <Link href="/pm-surya-ghar/">{t("footer_s4")}</Link>
            <Link href="/solar-calculator/">{t("footer_s5")}</Link>
          </div>
          <div className="footer-col">
            <h3>{t("footer_col_company")}</h3>
            <Link href="/about/">{t("footer_c1")}</Link>
            <Link href="/services/">{t("footer_c2")}</Link>
            <Link href="/pm-surya-ghar/">{t("footer_c3")}</Link>
            <Link href="/contact/">{t("footer_c4")}</Link>
            <Link href="/gallery/">{t("footer_c5")}</Link>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <span className="footer-legal-text">
          <span>{CONTACT.legalName}</span>
          <span>{t("footer_copyright")}</span>
          <Link href="/privacy-policy/">{t("footer_privacy")}</Link>
        </span>
        <div className="footer-social">
          {SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICONS[social.name];
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="footer-social-link"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>

      <div className="footer-mark" data-reveal ref={markRef}>
        <div className="footer-mark-row">
          <img src="/new-logo.webp" alt="" className="footer-mark-icon" ref={logoRef} />
          <span className="footer-word" ref={wordRef}>
            THE SOLAR COOP
          </span>
        </div>
      </div>
    </footer>
  );
}
