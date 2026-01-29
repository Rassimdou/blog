"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import Link from "next/link";
import { Terminal, ArrowLeft, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function GlitchText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) return char;
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );
      iterations += 1 / 3;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

export default function NotFound() {
  const [commandIndex, setCommandIndex] = useState(0);
  const commands = [
    { prompt: "$ find / -name 'page'", response: "find: No such file or directory", isError: true },
    { prompt: "$ ls -la", response: "total 0", isError: false },
    { prompt: "$ ping localhost", response: "Request timed out", isError: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % commands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [commands.length]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-3xl" />
        
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] opacity-50" />

        <div className="relative px-4 text-center">
          <AnimatedWrapper>
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-red-500/30 bg-red-500/10 animate-pulse">
              <AlertTriangle className="h-12 w-12 text-red-400" />
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper delay={100}>
            <h1 className="mb-4 text-5xl font-bold sm:text-7xl">
              <span className="text-red-400">
                <GlitchText text="404" />
              </span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper delay={200}>
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
              <span className="text-primary">//</span> <GlitchText text="ACCESS DENIED" />
            </h2>
          </AnimatedWrapper>

          <AnimatedWrapper delay={300}>
            <p className="mb-8 max-w-md text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to a secure location.
            </p>
          </AnimatedWrapper>

          {/* Animated terminal */}
          <AnimatedWrapper delay={400}>
            <div className="mx-auto mb-8 max-w-md overflow-hidden rounded-lg border border-border bg-[#0a0a0f] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">
                  terminal — error.log
                </span>
              </div>
              <div className="p-4 font-mono text-sm text-left min-h-[80px]">
                <div className="text-primary animate-type-in" key={commandIndex}>
                  {commands[commandIndex].prompt}
                </div>
                <div
                  className={`animate-type-in ${
                    commands[commandIndex].isError ? "text-red-400" : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {commands[commandIndex].response}
                </div>
                <div className="mt-2 flex items-center text-primary">
                  <span>$ </span>
                  <span className="ml-1 h-4 w-2 bg-primary animate-blink" />
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper delay={500}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Return to Safety
            </Link>
          </AnimatedWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}
