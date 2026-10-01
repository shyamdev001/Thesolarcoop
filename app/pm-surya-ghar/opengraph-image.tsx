import { ImageResponse } from "next/og";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const runtime = "nodejs";
export const alt = "PM Surya Ghar: Muft Bijli Yojana | The Solar Coop";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderOgImage(
      "PM Surya Ghar",
      "Rooftop solar subsidy of up to 40% for homes. The Solar Coop handles the registration and the claim.",
    ),
    size,
  );
}
