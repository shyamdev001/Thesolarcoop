"use client";

import { useEffect, useRef } from "react";
import { WhatsAppGlyph } from "@/components/ui/socialIcons";
import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

// Same real number as the header/footer call links (CONTACT.phoneHref) —
// WhatsApp Business for an Indian SMB is almost always the same line as the
// phone number, so this reuses it rather than inventing a separate one.
const WA_NUMBER = "918140968999";
const WA_TEXT = "Hi! I'd like to know more about solar for my property.";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

/**
 * Floating WhatsApp CTA, bottom-right, on every page. Polish-only piece —
 * flat WhatsApp green (no gradient), one calm shadow, a hover tooltip, and
 * an idle ring that fires briefly then rests for several seconds (the same
 * rhythm the header's phone icon already uses — see phoneWaveIdle in
 * globals.css) rather than a continuous, never-resting pulse.
 *
 * Deliberately NOT wrapped in <Magnetic>: that component transforms its
 * own wrapping element on pointer-move, and a `transform` on any ancestor
 * of a `position: fixed` element quietly turns it into that element's new
 * containing block — the button would stop tracking the viewport. The
 * entrance/hover transforms below are on the fixed element itself, which
 * is safe.
 */
export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    // No-JS / reduced-motion: stays exactly as CSS renders it — always
    // visible, no dependency on this effect running. Same rule the reveal
    // system enforces everywhere else on this site: content is only ever
    // hidden by JS, never by CSS waiting on JS to reveal it.
    if (reduce || !el) return;
    // One settle-in arrival shortly after mount — decorative only, starts
    // and ends at the element's real resting state (scale 1), so there's
    // nothing to flash or fail to reveal if this never runs. Gentle
    // overshoot, not a bouncy pop.
    gsap.fromTo(
      el,
      { scale: 0.85 },
      {
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.3)",
        delay: 1.1,
        clearProps: "transform",
      },
    );
  }, [reduce]);

  return (
    <a
      ref={ref}
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with The Solar Coop on WhatsApp"
    >
      <span className="whatsapp-float-ring" aria-hidden="true" />
      <span className="whatsapp-float-icon" aria-hidden="true">
        <WhatsAppGlyph />
      </span>
      <span className="whatsapp-float-tooltip" aria-hidden="true">
        Chat with us
      </span>
    </a>
  );
}
