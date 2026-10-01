import { ImageResponse } from "next/og";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const runtime = "nodejs";
export const alt = "About The Solar Coop";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderOgImage(
      "About",
      "India's first solar cooperative — farmer-led, member-owned, working across Gujarat since 2018.",
    ),
    size,
  );
}
