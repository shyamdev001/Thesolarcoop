import { ImageResponse } from "next/og";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const runtime = "nodejs";
export const alt = "The Solar Coop — solar for homes, farms and businesses";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderOgImage(
      "Gujarat's solar cooperative",
      "Solar for homes, farms and businesses.",
    ),
    size,
  );
}
