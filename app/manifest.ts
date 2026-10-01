import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Solar Coop — Rooftop, Farm & Commercial Solar in Gujarat",
    short_name: "The Solar Coop",
    description:
      "Gujarat's solar cooperative — rooftop, farm and commercial solar, with PM Surya Ghar subsidy support.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f1",
    theme_color: "#f6f5f1",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
