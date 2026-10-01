"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";
import { HEADING, ABOVE_FOLD_RATIO } from "./tokens";

type MaskTextProps = {
  /** A single string (words wrap naturally). */
  children?: string;
  /** Or explicit lines (a <br> is inserted between them). */
  lines?: string[];
  as?: ElementType;
  className?: string;
  /**
   * "scroll" (default) — reveal when scrolled into view.
   * "load"   — reveal on mount, only if it's near the top of the page.
   * "none"   — render static.
   */
  trigger?: "scroll" | "load" | "none";
  delay?: number;
  stagger?: number;
};

const splitTokens = (line: string) => line.split(/(\s+)/).filter(Boolean);

/**
 * Word-by-word mask reveal for a heading. Each word sits in its own
 * overflow-clipped box and rises from behind its baseline.
 *
 * SSR-safe: words render at rest (visible). JS only hides + animates them,
 * and only when it's safe to (never while the viewport is unmeasurable; if
 * the tab is hidden at mount — e.g. opened in a background tab — setup
 * waits for it to become visible rather than giving up). A timeout failsafe
 * guarantees the text is never left clipped.
 */
export function MaskText({
  children,
  lines,
  as: Tag = "span",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = HEADING.stagger,
}: MaskTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const blocks = lines ?? (children != null ? [children] : []);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce || trigger === "none") return;
    if (!window.innerHeight) return;

    const inners = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".mt-i"));
    if (!inners.length) return;

    gsap.set(inners, { yPercent: HEADING.yPercent });

    // Captured now, synchronously at mount — never re-measured later, even
    // though the real setup (below) can be delayed well past this point by
    // either of two waits. A background tab still lays out its DOM, so this
    // reading is accurate even if document.hidden is true right now.
    //
    // Why it can't be re-measured later: setup() waits on document.fonts.
    // ready, an async gap during which the reader may have scrolled well
    // past this element on a fast flick or a slow font load. A scrolled-
    // past element has a negative top, and "top < viewportHeight * ratio"
    // is just as true for -400 as it is for 400 — so re-measuring at that
    // point mistook "the reader scrolled past it already" for "it was
    // already on screen at load", and skipped the reveal entirely. This is
    // why headings were animating inconsistently: it came down to how fast
    // fonts happened to load relative to how fast the reader scrolled,
    // different every time.
    const nearTopAtMount = el.getBoundingClientRect().top < window.innerHeight * ABOVE_FOLD_RATIO;

    let played = false;
    let cancelled = false;
    let st: ScrollTrigger | undefined;
    let failsafe: number | undefined;

    const play = () => {
      if (played || cancelled) return;
      played = true;
      gsap.to(inners, {
        yPercent: 0,
        duration: HEADING.duration,
        ease: HEADING.ease,
        stagger,
        delay,
        onComplete: () => gsap.set(inners, { clearProps: "transform" }),
      });
    };

    // Words are measured (line-wrap, word width) using whatever font is
    // rendering *right now* — on a cold load that's often the fallback font,
    // since the custom one (next/font, display:"swap") is still in flight.
    // If we reveal on that layout and the real font swaps in a moment
    // later, the wrapped words visibly relocate right after finishing the
    // reveal. Waiting for the Fonts API closes that: the words stay hidden
    // (already translated out of view, so this is invisible) until the
    // layout is final, then we re-measure and start from there. The
    // *position* decision above doesn't have this problem — a scroll
    // trigger's start point is a document-relative distance, unaffected by
    // which font measured it — so it was safe to capture early.
    const start = () => {
      if (cancelled) return;
      gsap.set(inners, { yPercent: HEADING.yPercent }); // re-arm against final layout

      if (trigger === "scroll" && nearTopAtMount) {
        // Already visible at mount — don't animate, just show it (avoid FOUC).
        gsap.set(inners, { yPercent: 0, clearProps: "transform" });
        played = true;
        return;
      }

      if (trigger === "load" && nearTopAtMount) {
        play();
      } else {
        st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom-=10%",
          once: true,
          onEnter: play,
        });
      }
    };

    const begin = () => {
      if (cancelled) return;
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(start).catch(start);
      } else {
        start();
      }
      failsafe = window.setTimeout(() => {
        st?.kill();
        if (!played) gsap.set(inners, { yPercent: 0, clearProps: "transform" });
      }, 2600);
    };

    // A tab that's hidden right now (most commonly: this link was opened in
    // a background tab and the reader hasn't switched to it yet) can't run
    // GSAP's ticker, so there's nothing to gain by starting the fonts wait
    // immediately — worse, the old code just gave up here permanently, so a
    // heading opened this way never got its reveal wired up at all, even
    // once the reader did switch over. Waiting for the tab to actually
    // become visible first — the same rescue [data-reveal] already has —
    // means it always gets a real, working setup eventually.
    const onVisible = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onVisible);
      begin();
    };

    if (typeof document !== "undefined" && document.hidden) {
      document.addEventListener("visibilitychange", onVisible);
    } else {
      begin();
    }

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      st?.kill();
      if (failsafe) window.clearTimeout(failsafe);
      gsap.set(inners, { clearProps: "transform" });
    };
  }, [reduce, trigger, delay, stagger, children, lines?.join("|")]);

  return (
    <Tag ref={ref} className={className} data-mask-text="">
      {blocks.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {splitTokens(line).map((tok, ti) =>
            /^\s+$/.test(tok) ? (
              <span key={ti}> </span>
            ) : (
              <span className="mt-w" key={ti}>
                <span className="mt-i">{tok}</span>
              </span>
            ),
          )}
        </Fragment>
      ))}
    </Tag>
  );
}
