import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/site";

/**
 * Sends the quote form (components/sections/QuoteForm.tsx) as an email via
 * plain SMTP — provider-agnostic, so it works with whatever mailbox already
 * hosts sales@thesolarcoop.in (Zoho, Google Workspace, a cPanel mailbox,
 * ...) rather than requiring a new third-party account. Needs SMTP_HOST /
 * SMTP_PORT / SMTP_USER / SMTP_PASS set in the environment — see
 * .env.example. Until those are set, this responds 503 rather than
 * pretending to have sent anything.
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  project?: string;
  message?: string;
  company?: string; // honeypot — real visitors never see or fill this field
};

const MAX_LEN = { name: 120, phone: 30, email: 200, city: 100, project: 100, message: 2000 };

// Best-effort in-memory rate limit (per server process — not distributed,
// not durable across restarts, just a cheap deterrent against a form
// script hammering the endpoint). 5 submissions / 10 minutes / IP.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Same-origin only — this form is only ever meant to be submitted from
  // our own pages, so reject cross-site requests outright rather than
  // leaning on the honeypot/rate-limit alone.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill every field, including ones hidden from real users.
  // Report success without sending anything, so the bot doesn't learn to
  // retry differently.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const phone = clean(body.phone, MAX_LEN.phone);
  const email = clean(body.email, MAX_LEN.email);
  const city = clean(body.city, MAX_LEN.city);
  const project = clean(body.project, MAX_LEN.project);
  const message = clean(body.message, MAX_LEN.message);

  if (!name || !phone || !email || !city || !project || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_TO, MAIL_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("[quote] SMTP env vars are not configured — see .env.example");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `City: ${city}`,
    `Project type: ${project}`,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: MAIL_TO || CONTACT.email,
      replyTo: `"${name}" <${email}>`,
      subject: `New quote request — ${name} (${city})`,
      text: lines.join("\n"),
      html: `<p>${lines.join("<br>")}</p>`,
    });
  } catch (err) {
    console.error("[quote] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
