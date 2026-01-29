"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TerminalHero } from "@/components/terminal-hero";
import { PostCard } from "@/components/post-card";
import { BootSequence } from "@/components/boot-sequence";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { getAllPosts } from "@/lib/content";
import Link from "next/link";
import { ArrowRight, Terminal, Shield, Flag, Zap } from "lucide-react";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);

  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const ctfPosts = posts.filter((p) => p.category === "ctf");
  const researchPosts = posts.filter((p) => p.category === "research");

  useEffect(() => {
    // Check if intro was already shown this session
    const introShown = sessionStorage.getItem("introShown");
    if (introShown) {
      setShowIntro(false);
      setMainVisible(true);
    }

    // Handle skip with spacebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && showIntro) {
        handleIntroComplete();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("introShown", "true");
    setTimeout(() => setMainVisible(true), 100);
  };

  const stats = [
    {
      icon: Flag,
      value: `${posts.filter((p) => p.category === "ctf").length}+`,
      label: "CTF Writeups",
    },
    {
      icon: Shield,
      value: `${posts.filter((p) => p.category === "research").length}+`,
      label: "Research Papers",
    },
    {
      icon: Zap,
      value: `${new Set(posts.flatMap((p) => p.tags)).size}+`,
      label: "Topics Covered",
    },
  ];

  return (
    <>
      {showIntro && <BootSequence onComplete={handleIntroComplete} />}

      <div
        className={`flex min-h-screen flex-col transition-opacity duration-700 ${
          mainVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header />

        <main className="flex-1">
          <TerminalHero />

          {/* Recent Posts */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4">
              {/* CTF Writeups Section */}
              <AnimatedWrapper delay={200}>
                <div className="mb-16">
                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      <span className="text-primary">{">"}</span> Recent CTF Writeups
                    </h2>
                    <Link
                      href="/writeups"
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span>View all writeups</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {ctfPosts.map((post, index) => (
                      <AnimatedWrapper key={post.id} delay={300 + index * 100} animation="fade-up">
                        <PostCard post={post} />
                      </AnimatedWrapper>
                    ))}
                    {ctfPosts.length === 0 && (
                      <p className="text-muted-foreground">No CTF writeups yet...</p>
                    )}
                  </div>
                </div>
              </AnimatedWrapper>

              {/* Research Section */}
              <AnimatedWrapper delay={400}>
                <div>
                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      <span className="text-primary">{">"}</span> Security Research
                    </h2>
                    <Link
                      href="/research"
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span>View all research</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {researchPosts.map((post, index) => (
                      <AnimatedWrapper key={post.id} delay={500 + index * 100} animation="fade-up">
                        <PostCard post={post} />
                      </AnimatedWrapper>
                    ))}
                    {researchPosts.length === 0 && (
                      <p className="text-muted-foreground">No research posts yet...</p>
                    )}
                  </div>
                </div>
              </AnimatedWrapper>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-t border-border bg-card/30 py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-4">
              <AnimatedWrapper delay={100}>
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
                    <span className="text-primary">{">"}</span> System Statistics
                  </h2>
                  <p className="text-muted-foreground">
                    Tracking progress through the security landscape
                  </p>
                </div>
              </AnimatedWrapper>

              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <AnimatedWrapper key={stat.label} delay={200 + index * 150} animation="scale">
                    <div className="hover-lift group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-center">
                      {/* Animated border glow */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                        <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                      </div>

                      <div className="relative">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="mb-2 text-3xl font-bold text-primary sm:text-4xl">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </AnimatedWrapper>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <AnimatedWrapper delay={300}>
            <section className="py-16 md:py-24">
              <div className="mx-auto max-w-5xl px-4 text-center">
                <div className="relative mx-auto max-w-2xl overflow-hidden rounded-lg border border-border bg-card p-8 sm:p-12">
                  {/* Corner accents */}
                  <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-primary/50" />
                  <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-primary/50" />

                  <div className="relative">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Terminal className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                      Ready to dive deeper?
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                      Explore the full archive of CTF writeups and security research.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <Link
                        href="/writeups"
                        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                      >
                        <Flag className="h-4 w-4" />
                        <span>Browse Writeups</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/about"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/50 hover:bg-secondary/80"
                      >
                        <span>About Me</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedWrapper>
        </main>

        <Footer />
      </div>
    </>
  );
}
