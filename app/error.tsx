"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/site";

/**
 * App Router error boundary — catches an uncaught render/runtime error
 * anywhere under this segment and shows this instead of Next's generic
 * default screen. Same visual language as not-found.tsx, for the same
 * reason: even the "something broke" page should still look like this site.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <section className="page-hero">
      <p className="breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
        <span>Something went wrong</span>
      </p>
      <span className="not-found-code" aria-hidden="true">
        !
      </span>
      <h1>Something went wrong.</h1>
      <p className="lead">
        That&rsquo;s on us, not you. Try again, or reach us directly and
        we&rsquo;ll sort it out.
      </p>
      <div className="page-hero-actions">
        <button type="button" className="btn" onClick={() => reset()}>
          <span>Try again</span>
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <a href={CONTACT.phoneHref} className="btn btn-ghost">
          <span>Call {CONTACT.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
