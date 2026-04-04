"use client";

import { useState, useEffect } from "react";
import { Terminal, Shield, Zap } from "lucide-react";
import { AnimatedWrapper } from "./animated-wrapper";

export function TerminalHero() {
  const [text, setText] = useState("");
  const fullText = "Initializing secure connection... SUCCESS. Accessing research database...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <AnimatedWrapper animation="fade-right">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Shield className="h-3.5 w-3.5" />
                <span>Cybersecurity Blog</span>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-right" delay={100}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Security Writeups and Research
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-right" delay={200}>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Explore comprehensive CTF writeups, deep-dive vulnerability research,
                and security tools from a practitioner's perspective.
              </p>
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade-right" delay={300}>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                  <Zap className="h-4 w-4 fill-current" />
                  <span>Explore Posts</span>
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                  <span>rassimdou.github.io/blog</span>
                </div>
              </div>
            </AnimatedWrapper>
          </div>

          <AnimatedWrapper animation="scale" delay={400}>
            <div className="relative">
              {/* Terminal Window */}
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20 dark:shadow-black/50">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <Terminal className="h-3 w-3" />
                    <span>overview</span>
                  </div>
                  <div className="w-10" />
                </div>
                {/* Body */}
                <div className="p-6 font-mono text-sm leading-relaxed sm:text-base">
                  <p className="text-foreground/90">Backend security notes, practical writeups, and clear walkthroughs.</p>
                  <div className="mt-4 text-sm text-muted-foreground">{text}</div>
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -bottom-6 -right-6 hidden rounded-lg border border-primary/20 bg-background/80 p-4 backdrop-blur-md animate-bounce-subtle md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</div>
                    <div className="text-sm font-bold text-foreground">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
