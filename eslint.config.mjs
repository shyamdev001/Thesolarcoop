import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Content images use <img> on purpose for this migration — the existing
      // CSS targets bare <img> in aspect-ratio containers. next/image can be
      // layered in during the redesign.
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
