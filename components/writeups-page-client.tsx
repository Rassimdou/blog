"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/types";

interface WriteupsPageClientProps {
  initialPosts: Post[];
}

export function WriteupsPageClient({ initialPosts }: WriteupsPageClientProps) {
  const [filter, setFilter] = useState("all");

  const filteredPosts = initialPosts.filter((post) => {
    if (filter === "all") return true;
    return post.difficulty?.toLowerCase() === filter;
  });

  return (
    <div className="page-shell">
      <Header />

      <main className="flex flex-col gap-8">
        <section className="editorial-surface p-7 md:p-10">
          <p className="eyebrow mb-3">Archive</p>
          <h2 className="display-type text-3xl leading-tight tracking-[-0.03em] text-foreground">
            CTF Writeups
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
            Walkthroughs, notes, and takeaways from challenges that were worth writing down cleanly.
          </p>

          <div className="mb-8 mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-base text-muted-foreground">
              Difficulty
            </span>
            {["all", "easy", "medium", "hard"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-sm border px-4 py-2 text-base backdrop-blur-xl transition-all duration-300 ${
                  filter === f
                    ? "border-primary/30 bg-foreground text-background"
                    : "border-border/70 bg-secondary/55 text-muted-foreground hover:border-primary/35 hover:text-foreground"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {filteredPosts.length === 0 && (
              <p className="py-4 text-sm italic text-muted-foreground">
                No writeups found.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
