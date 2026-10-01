import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { MaskText } from "@/components/motion/MaskText";

type SectionHeadProps = {
  align?: "center" | "left";
  eyebrow: ReactNode;
  /** The section headline — mask-revealed word by word on scroll. */
  title: string;
  sub?: ReactNode;
  eyebrowLight?: boolean;
  titleLight?: boolean;
};

/** `.section-head` — eyebrow + h2 (+ optional sub), centered or left. */
export function SectionHead({
  align = "center",
  eyebrow,
  title,
  sub,
  eyebrowLight,
  titleLight,
}: SectionHeadProps) {
  const cls = ["section-head", align === "left" && "section-head--left"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <Eyebrow light={eyebrowLight}>{eyebrow}</Eyebrow>
      <MaskText
        as="h2"
        className={titleLight ? "h2 h2-light" : "h2"}
        trigger="scroll"
      >
        {title}
      </MaskText>
      {sub !== undefined && (
        <p className="section-head-sub" data-reveal>
          {sub}
        </p>
      )}
    </div>
  );
}
