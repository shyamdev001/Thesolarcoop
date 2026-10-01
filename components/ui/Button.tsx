import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost";
type Size = "sm" | "lg" | "block";

type ButtonProps = {
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  arrow?: string;
  className?: string;
  children: ReactNode;
  dataReveal?: boolean;
  "aria-label"?: string;
};

function buildClass(variant: Variant, size: Size | undefined, extra?: string) {
  return [
    "btn",
    variant === "ghost" && "btn-ghost",
    size && `btn-${size}`,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * The site's pill button (`.btn`). Renders a Next <Link> for internal
 * routes, an <a> for hash / tel / mailto / external, or a <button>.
 * Matches the original markup: text in a <span>, then `.btn-arrow`.
 */
export function Button({
  href,
  type = "button",
  variant = "solid",
  size,
  withArrow = true,
  arrow = "→",
  className,
  children,
  dataReveal,
  ...rest
}: ButtonProps) {
  const cls = buildClass(variant, size, className);
  const reveal = dataReveal ? "" : undefined;
  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span className="btn-arrow" aria-hidden="true">
          {arrow}
        </span>
      )}
    </>
  );

  if (href) {
    const internal = href.startsWith("/") && !href.startsWith("//");
    if (internal) {
      return (
        <Link href={href} className={cls} data-reveal={reveal} {...rest}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} data-reveal={reveal} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      data-reveal={reveal}
      suppressHydrationWarning
      {...rest}
    >
      {inner}
    </button>
  );
}
