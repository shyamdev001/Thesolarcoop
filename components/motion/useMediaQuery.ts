"use client";

import { useSyncExternalStore } from "react";

/**
 * Reactive media query. SSR-safe (returns `false` on the server), updates when
 * the match changes. Used to gate motion by pointer type / viewport.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
