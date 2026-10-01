"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/motion/MaskText";
import { WHY_CARDS } from "@/lib/content";

/** One warm plate per reason — the visual half of the ledger. */
const PLATES = [
  {
    src: "/assets/img/aerial-commercial-roof.webp",
    alt: "Aerial view of a large commercial rooftop covered edge to edge with solar panels",
  },
  {
    src: "/assets/img/crew-rooftop.webp",
    alt: "The Solar Coop crew working together on a rooftop panel installation",
  },
  {
    src: "/assets/img/pmsg-subsidy-consultation.webp",
    alt: "A Solar Coop team member reviewing PM Surya Ghar subsidy paperwork with a customer, next to KDCC bank loan-partnership signage",
  },
];

/**
 * "Why The Solar Coop" — an interactive editorial ledger. Three reasons sit
 * as ruled rows; selecting one opens its copy and cross-wipes a warm photo
 * plate with an oversized ghost numeral. Behaves as a tablist (one always
 * active). Pure CSS transitions, so it stays honest under reduced-motion.
 */
export function Why({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = WHY_CARDS.length - 1;
    let next = active;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section why" aria-label={t("why_eyebrow")}>
      <div className="why-layout">
        <div className="why-lead">
          <Eyebrow>{t("why_eyebrow")}</Eyebrow>
          <MaskText as="h2" className="h2" trigger="scroll">
            {t("why_h2")}
          </MaskText>
          <p className="why-deck" data-reveal>
            {t("why_sub")}
          </p>

          <ol className="why-ledger" role="tablist" aria-label={t("why_h2")} data-reveal>
            {WHY_CARDS.map((card, i) => {
              const on = active === i;
              return (
                <li className="why-row" key={card.index} data-active={on || undefined}>
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    className="why-row-head"
                    role="tab"
                    id={`why-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`why-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    suppressHydrationWarning
                  >
                    <span className="why-num">{card.index}</span>
                    <span className="why-row-title">{t(card.h)}</span>
                    <span className="why-row-mark" aria-hidden="true" />
                  </button>
                  <div
                    className="why-row-panel"
                    role="tabpanel"
                    id={`why-panel-${i}`}
                    aria-labelledby={`why-tab-${i}`}
                    aria-hidden={!on}
                  >
                    <div className="why-row-panel-clip">
                      <p>{t(card.p)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="why-stage" data-reveal>
          <div className="why-plate">
            <span className="why-ghost" aria-hidden="true">
              {WHY_CARDS.map((card, i) => (
                <span key={card.index} data-active={active === i || undefined}>
                  {card.index}
                </span>
              ))}
            </span>
            {PLATES.map((plate, i) => (
              <img
                key={plate.src}
                src={plate.src}
                alt={plate.alt}
                loading="lazy"
                className="why-plate-img"
                data-active={active === i || undefined}
              />
            ))}
          </div>
          <Button href={ctaHref} variant="ghost" className="why-foot" dataReveal>
            {t("why_cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
