"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { getPostsByCategory } from "@/lib/content";
import { Shield, Hash } from "lucide-react";
import { useState } from "react";

export default function ResearchPage() {
  const allPosts = getPostsByCategory("research").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get tags specific to research posts
  const researchTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags))
  ).slice(0, 10);

  // Filter posts by tag
  const posts = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background py-16 md:py-20">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-4">
            <AnimatedWrapper>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary">
                <Shield className="h-3.5 w-3.5" />
                <span className="uppercase tracking-wider">Security Research</span>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={100}>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-primary">$</span> cat ~/research/*
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper delay={200}>
              <p className="mb-8 max-w-2xl text-muted-foreground">
                Deep dives into security vulnerabilities, exploitation techniques,
                and defensive strategies. Original research and analysis.
              </p>
            </AnimatedWrapper>

            {/* Topic tags */}
            {researchTags.length > 0 && (
              <AnimatedWrapper delay={300}>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span>Topics:</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTag(null)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-300 ${
                      !selectedTag
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {researchTags.map((tag, index) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-300 ${
                        selectedTag === tag
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </AnimatedWrapper>
            )}
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
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No research found</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTag
                      ? "Try selecting a different topic."
                      : "Check back soon for new research!"}
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
