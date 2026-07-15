"use client";

import { CodeBlock } from "./code-block";
import { AnimatedWrapper } from "./animated-wrapper";
import type { ContentBlock } from "@/lib/types";
import { AlertTriangle, CheckCircle, Flag, Info } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ContentRendererProps {
  content: ContentBlock[];
}

function renderFormattedText(text: string): React.ReactNode {
  if (!text) return "";

  // Matches [text](url), **bold**, *italic*, `inline code`
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      // Link
      const label = match[1];
      const url = match[2];
      const isExternal = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:");

      if (isExternal) {
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium transition-colors"
          >
            {renderFormattedText(label)}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={match.index}
            href={url}
            className="text-primary hover:underline font-medium transition-colors"
          >
            {renderFormattedText(label)}
          </Link>
        );
      }
    } else if (match[3]) {
      // Bold
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {renderFormattedText(match[3])}
        </strong>
      );
    } else if (match[4]) {
      // Italic
      parts.push(
        <em key={match.index} className="italic text-foreground/90">
          {renderFormattedText(match[4])}
        </em>
      );
    } else if (match[5]) {
      // Inline code
      parts.push(
        <code
          key={match.index}
          className="rounded bg-muted px-1.5 py-0.5 text-[0.9em] font-mono text-foreground border border-border/40"
        >
          {match[5]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
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
                    {renderFormattedText(block.text || "")}
                  </h2>
                </AnimatedWrapper>
              );
            }
            if (block.level === 3) {
              return (
                <AnimatedWrapper key={index} delay={delay}>
                  <h3 id={id} className="display-type mb-3 mt-10 text-xl text-foreground scroll-mt-24">
                    {renderFormattedText(block.text || "")}
                  </h3>
                </AnimatedWrapper>
              );
            }
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <h4 id={id} className="mb-2 mt-8 text-lg text-foreground scroll-mt-24">
                  {renderFormattedText(block.text || "")}
                </h4>
              </AnimatedWrapper>
            );
          }

          case "paragraph":
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <p className="my-5 break-words whitespace-pre-wrap text-[1.03rem] leading-8 text-muted-foreground">
                  {renderFormattedText(block.text || "")}
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
                  <p className="text-sm leading-7 text-muted-foreground">
                    {renderFormattedText(block.text || "")}
                  </p>
                </div>
              </AnimatedWrapper>
            );
          }

          case "diagram": {
            const diagramSteps = block.steps || [];
            return (
              <AnimatedWrapper key={index} delay={delay}>
                <div className="my-10 space-y-4">
                  {diagramSteps.map((step, stepIdx) => (
                    <div key={stepIdx} className="group flex gap-4">
                      {/* Timeline column */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary text-xs font-bold font-mono transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                          {stepIdx + 1}
                        </div>
                        {stepIdx < diagramSteps.length - 1 && (
                          <div className="mt-1 w-px flex-1 min-h-[2rem] bg-gradient-to-b from-primary/60 to-border/30" />
                        )}
                      </div>

                      {/* Card */}
                      <div className="glass-panel mb-4 flex-1 min-w-0 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/30">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1 break-words">
                          {step.title}
                        </h4>
                        <p className="text-sm leading-6 text-muted-foreground break-words">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
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
