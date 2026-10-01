"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { CONTACT, NAV } from "@/lib/site";

/** Ringing phone (Lucide "phone-call"): handset + two sound-wave arcs.
 *  Idle: a short ring every few seconds. Hover: rings faster. See globals.css. */
function PhoneIcon() {
  return (
    <svg
      className="phone-svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        className="phone-svg-handset"
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.391z"
      />
      <path className="phone-wave phone-wave-1" d="M14.05 6A5 5 0 0 1 18 10" />
      <path className="phone-wave phone-wave-2" d="M14.05 2a9 9 0 0 1 8 7.94" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggle, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const magneticRef = useRef<HTMLButtonElement>(null);
  const hoveringRef = useRef(false);

  const activeIndex = NAV.findIndex((item) => pathname === item.href);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
    setHidden(false); // always show the header while interacting with the menu
  }, []);

  /* -------------------------------------------------- sliding nav indicator */
  const placeIndicator = useCallback((idx: number) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    if (idx < 0) {
      indicator.style.opacity = "0";
      return;
    }
    const link = linkRefs.current[idx];
    const mask = (link?.querySelector(".nav-link-mask") as HTMLElement | null) ?? link;
    if (!mask) return;
    const navRect = nav.getBoundingClientRect();
    const rect = mask.getBoundingClientRect();
    if (!rect.width) return;
    indicator.style.opacity = "1";
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translate(${(rect.left - navRect.left).toFixed(
      1,
    )}px, ${(rect.bottom - navRect.top + 3).toFixed(1)}px)`;
  }, []);

  const restIndicator = useCallback(() => {
    if (!hoveringRef.current) placeIndicator(activeIndex);
  }, [placeIndicator, activeIndex]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    placeIndicator(activeIndex);
    const timer = window.setTimeout(() => placeIndicator(activeIndex), 120);

    const onResize = () => restIndicator();
    window.addEventListener("resize", onResize);

    let ro: ResizeObserver | undefined;
    if (navRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => restIndicator());
      ro.observe(navRef.current);
    }
    document.fonts?.ready.then(() => restIndicator()).catch(() => {});

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [activeIndex, placeIndicator, restIndicator]);

  // Re-measure when the language changes (Gujarati word widths differ).
  useEffect(() => {
    restIndicator();
    const timer = window.setTimeout(() => restIndicator(), 260);
    return () => window.clearTimeout(timer);
  }, [lang, restIndicator]);

  /* -------------------------------------------------- hide header on scroll down
     Accumulator-based so it stays reliable with Lenis smooth scroll (which
     fires many small scroll deltas rather than a few big ones). */
  useEffect(() => {
    const TOP_ZONE = 88;
    const HIDE_DELTA = 10; // cumulative downward px before hiding
    const SHOW_DELTA = 8; // cumulative upward px before showing
    let lastY = Math.max(0, window.scrollY);
    let accum = 0;

    const update = () => {
      const header = headerRef.current;
      if (!header) return;
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      lastY = y;
      
      if (dy === 0) return;

      if (
        menuOpen ||
        y <= TOP_ZONE
      ) {
        setHidden(false);
        accum = 0;
        return;
      }

      if (dy > 0) {
        if (accum < 0) accum = 0;
        accum += dy;
        if (accum > HIDE_DELTA) {
          setHidden(true);
          accum = 0;
        }
      } else {
        if (accum > 0) accum = 0;
        accum += dy;
        if (accum < -SHOW_DELTA) {
          setHidden(false);
          accum = 0;
        }
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [menuOpen]);

  /* -------------------------------------------------- magnetic pull on lang toggle */
  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strength = 0.35;
    const max = 6;

    const onEnter = () => {
      el.style.transition = "transform 0.18s var(--ease-out)";
    };
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(
        -max,
        Math.min(max, (event.clientX - rect.left - rect.width / 2) * strength),
      );
      const y = Math.max(
        -max,
        Math.min(max, (event.clientY - rect.top - rect.height / 2) * strength),
      );
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 0.55s var(--ease-spring)";
      el.style.transform = "";
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const toggleLabel = lang === "en" ? "ગુજરાતી" : "English";
  const toggleAria = lang === "en" ? "Switch to Gujarati" : "Switch to English";

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-hidden={hidden ? "true" : undefined}
      onFocus={() => setHidden(false)}
    >
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="The Solar Coop — home"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              if (window.__lenis) {
                window.__lenis.scrollTo(0, { duration: 1.1 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
          }}
        >
          <img src="/new-logo.webp" alt="" className="brand-logo" />
          <span className="brand-word">
            <span className="brand-name">The Solar Coop</span>
            <span className="brand-sub">{t("brand_sub")}</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          className="nav"
          aria-label="Primary"
          onPointerLeave={() => {
            hoveringRef.current = false;
            placeIndicator(activeIndex);
          }}
        >
          {NAV.map((item, i) => {
            const label = t(item.key);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={i === activeIndex ? "page" : undefined}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onPointerEnter={() => {
                  hoveringRef.current = true;
                  placeIndicator(i);
                }}
              >
                <span className="nav-link-mask">
                  <span className="nav-link-t" data-text={label}>
                    {label}
                  </span>
                </span>
              </Link>
            );
          })}
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
        </nav>

        <div className="header-cta">
          <button
            ref={magneticRef}
            type="button"
            className="btn btn-sm btn-ghost lang-toggle"
            aria-label={toggleAria}
            onClick={toggle}
            suppressHydrationWarning
          >
            {toggleLabel}
          </button>
          <a href={CONTACT.phoneHref} className="header-phone">
            <span className="phone-ic" aria-hidden="true">
              <PhoneIcon />
            </span>
            <span className="header-phone-num">{CONTACT.phoneDisplay}</span>
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          suppressHydrationWarning
        >
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-menu" hidden={!menuOpen}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {t(item.key)}
          </Link>
        ))}
        <button
          type="button"
          className="btn lang-toggle"
          aria-label={toggleAria}
          onClick={toggle}
          suppressHydrationWarning
        >
          {toggleLabel}
        </button>
        <a
          href={CONTACT.phoneHref}
          className="mobile-phone"
          onClick={closeMenu}
        >
          {CONTACT.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
