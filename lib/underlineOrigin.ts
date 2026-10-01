import type { PointerEvent } from "react";

/**
 * For `.link-underline`: sets `--underline-origin` to whichever side the
 * cursor is nearest, so the CSS underline draws out from under the
 * pointer instead of always growing from a fixed edge.
 */
export function trackUnderlineOrigin(event: PointerEvent<HTMLElement>) {
  if (event.pointerType && event.pointerType !== "mouse") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const fromLeft = event.clientX - rect.left < rect.width / 2;
  event.currentTarget.style.setProperty("--underline-origin", fromLeft ? "0%" : "100%");
}
