"use client";

import { useEffect, useState } from "react";
import type { ContentBlock } from "@/lib/types";

interface TableOfContentsProps {
  content: ContentBlock[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = content
    .filter((block) => block.type === "heading" && block.text && block.level === 2)
    .map((block) => ({
      text: block.text!,
      level: block.level as number,
      id: block.text!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
        Table of Contents
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                   element.scrollIntoView({ behavior: "smooth" });
                   window.history.pushState(null, "", `#${heading.id}`);
                }
              }}
              className={`block transition-colors duration-200 line-clamp-2 ${
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
