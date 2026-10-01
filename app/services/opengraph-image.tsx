import { ImageResponse } from "next/og";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const runtime = "nodejs";
export const alt = "Solar Services | The Solar Coop";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderOgImage(
      "Services",
      "Rooftop, commercial, industrial and farm solar across Gujarat.",
    ),
    size,
  );
}
