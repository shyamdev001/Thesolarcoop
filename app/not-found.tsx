import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | The Solar Coop",
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <p className="breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
        <span>Page not found</span>
      </p>
      <span className="not-found-code" aria-hidden="true">
        404
      </span>
      <h1>This page could not be found.</h1>
      <p className="lead">
        The page you were looking for has moved, or no longer exists. Try the
        homepage, or reach us directly and we&rsquo;ll point you the right way.
      </p>
      <div className="page-hero-actions">
        <Link href="/" className="btn">
          <span>Back to home</span>
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <a href={CONTACT.phoneHref} className="btn btn-ghost">
          <span>Call {CONTACT.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
