import type { ReactNode } from "react";

type EyebrowProps = {
  light?: boolean;
  /** Simple label form: <span>{children}</span> */
  children?: ReactNode;
  /** Split form (hero): a pill tag + a plain note. */
  tag?: ReactNode;
  note?: ReactNode;
  className?: string;
};

/** `.eyebrow` — the small tracked label above section headings. */
export function Eyebrow({ light, children, tag, note, className }: EyebrowProps) {
  const cls = ["eyebrow", light && "eyebrow-light", className]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={cls} data-reveal>
      {tag !== undefined ? (
        <>
          <span className="eyebrow-tag">{tag}</span>
          {note !== undefined && <span className="eyebrow-note">{note}</span>}
        </>
      ) : (
        <span>{children}</span>
      )}
    </p>
  );
}
