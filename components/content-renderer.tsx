"use client";

import { CodeBlock } from "./code-block";
import { AnimatedWrapper } from "./animated-wrapper";
import type { ContentBlock } from "@/lib/types";
import { AlertTriangle, CheckCircle, Flag, Info } from "lucide-react";

interface ContentRendererProps {
  content: ContentBlock[];
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="max-w-none">
      {content.map((block, index) => {
        const delay = Math.min(index * 50, 500);
        const generateId = (text?: string) => text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

        switch (block.type) {
          case "heading": {
            const id = generateId(block.text);
            if (block.level === 2) {
              return (
                <AnimatedWrapper key={index} delay={delay}>
                  <h2 id={id} className="display-type group mb-4 mt-14 flex items-center gap-3 text-2xl leading-tight text-foreground first:mt-0 sm:text-3xl scroll-mt-24">
                    <span className="h-px w-10 bg-border transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
                    {block.text}
                  </h2>
                </AnimatedWrapper>
              );
            }
            if (block.level === 3) {
              return (
                <AnimatedWrapper key={index} delay={delay}>
                  <h3 id={id} className="display-type mb-3 mt-10 text-xl text-foreground scroll-mt-24">
                    {block.text}
                  </h3>
                </AnimatedWrapper>
              );
            }
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <h4 id={id} className="mb-2 mt-8 text-lg text-foreground scroll-mt-24">
                  {block.text}
                </h4>
              </AnimatedWrapper>
            );
          }

          case "paragraph":
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <p className="my-5 whitespace-pre-wrap text-[1.03rem] leading-8 text-muted-foreground">
                  {block.text}
                </p>
              </AnimatedWrapper>
            );

          case "code":
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <CodeBlock code={block.code || ""} language={block.language} />
              </AnimatedWrapper>
            );

          case "flag":
            return (
              <AnimatedWrapper key={index} delay={delay} animation="scale">
                <div className="group my-8 overflow-hidden rounded-sm border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 transition-all duration-300 hover:border-primary/35">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-primary/15 transition-transform duration-300 group-hover:scale-110">
                      <Flag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 text-base text-primary">
                        Flag Captured
                      </div>
                      <code className="rounded bg-background/70 px-2 py-1 text-sm text-foreground">
                        {block.text}
                      </code>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            );

          case "image": {
            const imgSrc = block.src || "/placeholder.svg";
            const finalSrc =
              imgSrc.startsWith("/") && !imgSrc.startsWith("//") ? `/blog${imgSrc}` : imgSrc;

            return (
              <AnimatedWrapper key={index} delay={delay} animation="scale">
                <figure className="my-8">
                  <div className="overflow-hidden rounded-sm border border-border transition-all duration-300 hover:border-primary/30">
                    <img
                      src={finalSrc}
                      alt={block.alt || ""}
                      className="w-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {block.alt && (
                    <figcaption className="mt-3 text-center text-base text-muted-foreground">
                      {block.alt}
                    </figcaption>
                  )}
                </figure>
              </AnimatedWrapper>
            );
          }

          case "note": {
            const noteStyles: Record<string, { border: string, bg: string, icon: React.ElementType, iconColor: string }> = {
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
              danger: {
                border: "border-red-400/30",
                bg: "bg-red-400/5",
                icon: AlertTriangle,
                iconColor: "text-red-400",
              },
            };
            const noteType = (block as ContentBlock & { noteType?: string }).noteType || "info";
            const style = noteStyles[noteType];
            const NoteIcon = style.icon;

            return (
              <AnimatedWrapper key={index} delay={delay}>
                <div className={`my-6 flex gap-4 rounded-sm border ${style.border} ${style.bg} p-4`}>
                  <NoteIcon className={`h-5 w-5 shrink-0 ${style.iconColor}`} />
                  <p className="text-sm leading-7 text-muted-foreground">{block.text}</p>
                </div>
              </AnimatedWrapper>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
