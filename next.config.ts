import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve the original site's trailing-slash URLs (/about/, /contact/ ...).
  trailingSlash: true,

  // Baseline security headers — the safe, unambiguous ones only. No
  // Content-Security-Policy here: the site legitimately uses a few inline
  // <script> tags (language-boot, JSON-LD) and third-party font/CDN loads,
  // and a CSP tight enough to matter needs nonces threaded through all of
  // that carefully rather than being bolted on.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
