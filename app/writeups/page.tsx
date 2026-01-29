"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { getPostsByCategory } from "@/lib/content";
import { Flag, Filter } from "lucide-react";
import { useState } from "react";

export default function WriteupsPage() {
  const allPosts = getPostsByCategory("ctf").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Get unique platforms
  const platforms = Array.from(new Set(allPosts.map((p) => p.platform))).filter(Boolean);
  const difficulties = ["Easy", "Medium", "Hard"];

  // Filter posts
  const posts = allPosts.filter((post) => {
    if (selectedPlatform && post.platform !== selectedPlatform) return false;
    if (selectedDifficulty && post.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background py-16 md:py-20">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-4">
            <AnimatedWrapper>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary">
                <Flag className="h-3.5 w-3.5" />
                <span className="uppercase tracking-wider">CTF Writeups</span>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={100}>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-primary">$</span> ls ~/writeups
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper delay={200}>
              <p className="mb-8 max-w-2xl text-muted-foreground">
                Detailed walkthroughs of CTF challenges. Learn the methodology,
                tools, and techniques used to solve each challenge.
              </p>
            </AnimatedWrapper>

            {/* Filters */}
            <AnimatedWrapper delay={300}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>

                {/* Platform filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform(null)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-300 ${
                      !selectedPlatform
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    All ({allPosts.length})
                  </button>
                  {platforms.map((platform) => (
                    <button
                      type="button"
                      key={platform}
                      onClick={() => setSelectedPlatform(selectedPlatform === platform ? null : platform ?? null)}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-300 ${
                        selectedPlatform === platform
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>

                {/* Difficulty filters */}
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <button
                      type="button"
                      key={diff}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-300 ${
                        selectedDifficulty === diff
                          ? diff === "Easy"
                            ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
                            : diff === "Medium"
                            ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                            : "border-red-400/50 bg-red-400/10 text-red-400"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            {posts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {posts.map((post, index) => (
                  <AnimatedWrapper key={post.id} delay={index * 100} animation="fade-up">
                    <PostCard post={post} />
                  </AnimatedWrapper>
                ))}
              </div>
            ) : (
              <AnimatedWrapper>
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
                    <Flag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No writeups found</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPlatform || selectedDifficulty
                      ? "Try adjusting your filters."
                      : "Check back soon for new content!"}
                  </p>
                </div>
              </AnimatedWrapper>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
