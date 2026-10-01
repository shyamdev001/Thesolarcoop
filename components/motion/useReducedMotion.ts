"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True when the visitor has asked for reduced motion. SSR-safe (false). */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
