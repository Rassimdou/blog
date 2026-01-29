"use client";

import { Github, Twitter, Terminal, Heart } from "lucide-react";
import Link from "next/link";
import { AnimatedWrapper } from "./animated-wrapper";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative mx-auto max-w-5xl px-4 py-12">
        <AnimatedWrapper delay={100}>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="group flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/50 bg-primary/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20">
                  <Terminal className="h-4 w-4 text-primary" />
                </div>
                <span className="text-lg font-semibold">
                  <span className="text-primary">0x</span>Blog
                </span>
              </Link>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                CTF writeups & security research from the underground.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2 text-sm">
                <span className="text-muted-foreground mb-2 text-xs uppercase tracking-wider">Navigation</span>
                <Link href="/writeups" className="text-muted-foreground hover:text-primary transition-colors">
                  ~/writeups
                </Link>
                <Link href="/research" className="text-muted-foreground hover:text-primary transition-colors">
                  ~/research
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  ~/about
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-end">
              <span className="text-muted-foreground mb-4 text-xs uppercase tracking-wider">Connect</span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* Bottom bar */}
        <AnimatedWrapper delay={200}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">$</span>
              <span>echo &quot;Built with</span>
              <Heart className="h-3 w-3 text-red-400 animate-pulse" />
              <span>and Next.js&quot;</span>
              <span className="animate-blink">_</span>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="text-primary">//</span> {currentYear} 
              <span className="mx-2 text-muted-foreground/30">|</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </footer>
  );
}
