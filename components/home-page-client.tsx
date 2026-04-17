"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface HomePageClientProps {
  initialPosts: Post[];
}

export function HomePageClient({ initialPosts }: HomePageClientProps) {
  const posts = initialPosts.slice(0, 5);
  const latestPost = posts[0];
  const allTags = Array.from(new Set(initialPosts.flatMap((post) => post.tags))).slice(0, 6);

  return (
    <div className="page-shell">
      <Header />

      <main className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)] lg:gap-8">
        <section className="editorial-surface p-7 md:p-10">
          <p className="eyebrow mb-4">Latest writing</p>
          <h2 className="display-type max-w-2xl text-4xl leading-tight tracking-[-0.04em] text-foreground sm:text-5xl md:text-[3.45rem]">
            Thoughts on security, challenge solving, and the details worth documenting.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            This blog is where I collect CTF writeups, research notes, and practical lessons from breaking down systems carefully enough to explain them.
          </p>

          {latestPost && (
            <div className="glass-panel mt-8 p-5 sm:p-6">
              <p className="eyebrow">
                Read next
              </p>
              <h3 className="display-type mt-3 text-2xl leading-tight text-foreground">
                <Link
                  href={`/${latestPost.category === "ctf" ? "writeups" : "research"}/${latestPost.slug}`}
                  className="hover:text-primary"
                >
                  {latestPost.title}
                </Link>
              </h3>
              <p className="mt-3 text-[0.98rem] leading-7 text-muted-foreground">
                {latestPost.summary}
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                {formatDate(latestPost.date)}
              </p>
            </div>
          )}
        </section>

        <aside className="flex flex-col gap-6">
          <section className="editorial-surface p-6">
            <p className="eyebrow mb-3">Sections</p>
            <div className="space-y-3 text-[0.98rem] leading-7">
              <Link href="/writeups" className="block hover:text-primary">
                Blog
              </Link>
              <Link href="/research" className="block hover:text-primary">
                Work
              </Link>
              <Link href="/about" className="block hover:text-primary">
                About
              </Link>
            </div>
          </section>

          <section className="editorial-surface p-6">
            <p className="eyebrow mb-3">Topics</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span key={tag} className="glass-chip">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <section className="editorial-surface p-7 md:p-10 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4 border-b border-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">Archive</p>
              <h2 className="display-type text-2xl text-foreground">Recent posts</h2>
            </div>
            <Link
              href="/writeups"
              className="glass-button self-start sm:self-auto"
            >
              View all
            </Link>
          </div>

          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/${post.category === "ctf" ? "writeups" : "research"}/${post.slug}`}
                  className="group grid gap-2 rounded-sm border border-transparent px-3 py-4 transition-all duration-300 hover:border-border/70 hover:bg-accent/45 md:grid-cols-[130px_1fr]"
                >
                  <span className="text-base text-muted-foreground">
                    {formatDate(post.date)}
                  </span>
                  <div>
                    <h3 className="display-type text-xl text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-1 max-w-3xl text-[0.98rem] leading-7 text-muted-foreground">
                      {post.summary}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
