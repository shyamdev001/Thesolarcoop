"use client";

import { Stagger } from "@/components/motion/Stagger";

type CheckListProps = {
  /** Already-translated strings. */
  items: string[];
  className?: string;
};

/** `.check-list` — the orange-tick bullet list. Each tick arrives in turn. */
export function CheckList({ items, className }: CheckListProps) {
  const cls = ["check-list", className].filter(Boolean).join(" ");
  return (
    <Stagger as="ul" className={cls} gap={0.07} y={10}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Stagger>
  );
}
