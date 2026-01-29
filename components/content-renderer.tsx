"use client";

import { CodeBlock } from "./code-block";
import { AnimatedWrapper } from "./animated-wrapper";
import type { ContentBlock } from "@/lib/types";
import { Flag, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface ContentRendererProps {
  content: ContentBlock[];
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="prose-invert max-w-none">
      {content.map((block, index) => {
        const delay = Math.min(index * 50, 500);

        switch (block.type) {
          case "heading":
            if (block.level === 2) {
              return (
                <AnimatedWrapper key={index} delay={delay}>
                  <h2 className="group mb-4 mt-10 flex items-center gap-3 text-xl font-semibold text-foreground first:mt-0 sm:text-2xl">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20">
                      #
                    </span>
                    {block.text}
                  </h2>
                </AnimatedWrapper>
              );
            }
            if (block.level === 3) {
              return (
                <AnimatedWrapper key={index} delay={delay}>
                  <h3 className="mb-3 mt-8 text-lg font-medium text-foreground">
                    <span className="text-primary">##</span> {block.text}
                  </h3>
                </AnimatedWrapper>
              );
            }
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <h4 className="mb-2 mt-6 text-base font-medium text-foreground">
                  {block.text}
                </h4>
              </AnimatedWrapper>
            );

          case "paragraph":
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <p className="my-4 leading-7 text-muted-foreground">
                  {block.text}
                </p>
              </AnimatedWrapper>
            );

          case "code":
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <CodeBlock
                  code={block.code || ""}
                  language={block.language}
                />
              </AnimatedWrapper>
            );

          case "flag":
            return (
              <AnimatedWrapper key={index} delay={delay} animation="scale">
                <div className="hover-lift group my-8 overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 transition-transform duration-300 group-hover:scale-110">
                      <Flag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
                        Flag Captured
                      </div>
                      <code className="rounded bg-background/50 px-2 py-1 text-sm text-foreground">
                        {block.text}
                      </code>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            );

          case "image":
            return (
              <AnimatedWrapper key={index} delay={delay} animation="scale">
                <figure className="my-8">
                  <div className="overflow-hidden rounded-lg border border-border transition-all duration-300 hover:border-primary/30">
                    <img
                      src={block.src || "/placeholder.svg"}
                      alt={block.alt || ""}
                      className="w-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {block.alt && (
                    <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                      <span className="text-primary">//</span> {block.alt}
                    </figcaption>
                  )}
                </figure>
              </AnimatedWrapper>
            );

          case "note":
            const noteStyles = {
              info: {
                border: "border-blue-400/30",
                bg: "bg-blue-400/5",
                icon: Info,
                iconColor: "text-blue-400",
              },
              warning: {
                border: "border-amber-400/30",
                bg: "bg-amber-400/5",
                icon: AlertTriangle,
                iconColor: "text-amber-400",
              },
              success: {
                border: "border-emerald-400/30",
                bg: "bg-emerald-400/5",
                icon: CheckCircle,
                iconColor: "text-emerald-400",
              },
            };
            const noteType = (block as ContentBlock & { noteType?: "info" | "warning" | "success" }).noteType || "info";
            const style = noteStyles[noteType];
            const NoteIcon = style.icon;

            return (
              <AnimatedWrapper key={index} delay={delay}>
                <div className={`my-6 flex gap-4 rounded-lg border ${style.border} ${style.bg} p-4`}>
                  <NoteIcon className={`h-5 w-5 shrink-0 ${style.iconColor}`} />
                  <p className="text-sm text-muted-foreground">{block.text}</p>
                </div>
              </AnimatedWrapper>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
