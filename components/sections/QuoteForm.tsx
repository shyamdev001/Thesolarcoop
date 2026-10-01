"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { PROJECT_TYPE_OPTIONS } from "@/lib/content";
import { CONTACT } from "@/lib/site";
import { trackEvent } from "@/components/Analytics";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The quote request form. Submits to app/api/quote/route.ts, which emails
 * the enquiry via SMTP (see .env.example) — needs those env vars set to
 * actually send; until then the API responds 503 and the form shows the
 * error state below rather than a fake success.
 */
export function QuoteForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLParagraphElement>(null);
  const submitted = status === "sent";
  const sending = status === "sending";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          city: data.get("city"),
          project: data.get("project"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
        }),
      });
      if (res.ok) {
        trackEvent("generate_lead", { project_type: data.get("project") });
      }
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!submitted) return;
    const el = successRef.current;
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) {
      const y =
        el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2;
      lenis.scrollTo(Math.max(0, y), { duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  const field = (label: string) => (
    <span>
      <span>{label}</span>
      <i>*</i>
    </span>
  );

  return (
    <form
      className={`quote-form${submitted ? " is-sent" : ""}`}
      data-reveal
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="form-head">
        <span className="form-badge">{t("form_badge")}</span>
        <span className="form-title">{t("form_title")}</span>
      </div>

      {/* Honeypot — hidden from real visitors (off-screen, not display:none
          so screen readers + basic bot scripts behave predictably),
          skipped by name/tab order. Left blank by humans, often filled by
          bots that fill every field they find. */}
      <label className="form-honeypot" aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </label>

      <label>
        {field(t("form_name"))}
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          disabled={submitted || sending}
          suppressHydrationWarning
        />
      </label>
      <label>
        {field(t("form_phone"))}
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          disabled={submitted || sending}
          suppressHydrationWarning
        />
      </label>
      <label>
        {field(t("form_email"))}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={submitted || sending}
          suppressHydrationWarning
        />
      </label>
      <label>
        {field(t("form_city"))}
        <input
          type="text"
          name="city"
          autoComplete="address-level2"
          required
          disabled={submitted || sending}
          suppressHydrationWarning
        />
      </label>
      <label>
        {field(t("form_project"))}
        <select
          name="project"
          required
          disabled={submitted || sending}
          defaultValue=""
          suppressHydrationWarning
        >
          <option value="">{t("form_opt_default")}</option>
          {PROJECT_TYPE_OPTIONS.map((key) => (
            <option key={key}>{t(key)}</option>
          ))}
        </select>
      </label>
      <label>
        <span>{t("form_message")}</span>
        <textarea name="message" rows={3} disabled={submitted || sending} suppressHydrationWarning />
      </label>

      <button
        type="submit"
        className="btn btn-block"
        disabled={submitted || sending}
        suppressHydrationWarning
      >
        <span>{sending ? t("form_sending") : t("form_submit")}</span>
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      </button>

      <p className="form-fine">{t("form_fine")}</p>

      {status === "error" && (
        <p className="form-error" role="alert">
          {t("form_error")}{" "}
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
        </p>
      )}

      <p className="form-success" ref={successRef} hidden={!submitted}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
          <path
            className="fs-check"
            d="M7.5 12.4 10.6 15.5 16.5 8.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{t("form_success")}</span>
      </p>
    </form>
  );
}
