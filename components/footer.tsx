"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { AnimatedWrapper } from "./animated-wrapper";
import { BrandMark } from "./brand-mark";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        <AnimatedWrapper delay={100}>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="group flex items-center gap-2 mb-4">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <BrandMark compact />
                </div>
                <span className="text-lg font-semibold">
                  <span className="text-primary">r</span>zyux
                </span>
              </Link>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                CTF writeups & security research from the underground.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2 text-sm">
                <span className="text-muted-foreground mb-2 text-xs">Navigation</span>
                <Link href="/writeups" className="text-muted-foreground hover:text-primary transition-colors">
                  Writeups
                </Link>
                <Link href="/research" className="text-muted-foreground hover:text-primary transition-colors">
                  Research
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-end">
              <span className="text-muted-foreground mb-4 text-xs">Connect</span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com/rassimdou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Link>


              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </footer>
  );
}
