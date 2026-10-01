"use client";

import type { ArticleBlock } from "@/lib/blog-articles";
import { CheckIcon } from "@/components/ui/aboutIcons";

/** Renders one article's content blocks as a premium editorial column. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  const sectionNumbers: (number | null)[] = [];
  for (let i = 0, n = 0; i < blocks.length; i++) {
    sectionNumbers.push(blocks[i].type === "h3" ? ++n : null);
  }

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        if (block.type === "h3") {
          return (
            <h3 className="article-h3" data-reveal key={i}>
              <span className="article-h3-n">{String(sectionNumbers[i]).padStart(2, "0")}</span>
              {block.text}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p className="article-p" data-reveal key={i}>
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul className="article-list" data-reveal key={i}>
              {block.items.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        // note
        return (
          <p className="article-note" data-reveal key={i}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
