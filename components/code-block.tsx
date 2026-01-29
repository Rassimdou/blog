"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTerminal = language === "bash" || language === "shell" || language === "terminal";

  return (
    <div className="hover-lift group relative my-6 overflow-hidden rounded-lg border border-border bg-[#0a0a0f] shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5">
      {/* Animated top border */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80 transition-colors hover:bg-amber-500" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80 transition-colors hover:bg-emerald-500" />
          </div>
          {language && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {isTerminal && <Terminal className="h-3.5 w-3.5" />}
              <span>{language}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all duration-300 ${
            copied
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <span
            className={`transition-transform duration-300 ${
              copied ? "scale-110" : "scale-100"
            }`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </span>
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code className="text-foreground/90">
            {code.split("\n").map((line, i) => (
              <div key={i} className="group/line flex">
                <span className="mr-4 w-8 select-none text-right text-muted-foreground/40 transition-colors group-hover/line:text-muted-foreground/60">
                  {i + 1}
                </span>
                <span className="flex-1">
                  {isTerminal && line.startsWith("$") ? (
                    <>
                      <span className="text-primary">$</span>
                      <span>{line.slice(1)}</span>
                    </>
                  ) : isTerminal && line.startsWith("#") ? (
                    <span className="text-muted-foreground">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
