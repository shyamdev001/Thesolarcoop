import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client (so "from" states apply before first paint —
 * no flash), useEffect on the server (no SSR warning).
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
