"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page-shell">
      <Header />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        
        <div className="relative z-20 px-4 text-center flex flex-col items-center">
          
          <AnimatedWrapper delay={200} className="clinical-slide">
             <div className="glass-panel relative mb-8 mx-auto overflow-hidden p-6 group">
                 <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <AlertCircle className="h-16 w-16 text-red-500" />
             </div>
          </AnimatedWrapper>

          <AnimatedWrapper delay={600} className="clinical-slide">
            <h1 className="display-type mb-4 text-5xl tracking-tighter text-foreground sm:text-7xl md:text-8xl">
              404 <span className="text-red-500 font-light">ERROR</span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper delay={800} className="clinical-slide">
             <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-8 block">Page Not Found</span>
          </AnimatedWrapper>

          <AnimatedWrapper delay={1200} className="clinical-slide">
            <p className="mb-16 max-w-md text-sm font-semibold text-muted-foreground leading-loose mx-auto">
              The requested data node cannot be found. The link may be broken or the content has been removed.
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper delay={1800} className="clinical-slide">
            <Link
              href="/"
              className="glass-button px-8 py-4 bg-foreground text-background hover:bg-foreground hover:text-background"
            >
              Return Home
            </Link>
          </AnimatedWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}
