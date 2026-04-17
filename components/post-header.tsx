"use client";

import { Activity, Calendar, ChevronLeft, Cpu } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { AnimatedWrapper } from "./animated-wrapper";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const isCtf = post.category === "ctf";

  return (
    <section className="px-6 pt-2 md:px-10">
      <div className="editorial-surface mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-12">
        <AnimatedWrapper className="clinical-slide">
          <Link
            href={isCtf ? "/writeups" : "/research"}
            className="group inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {isCtf ? "writeups" : "research"}</span>
          </Link>
        </AnimatedWrapper>

        <AnimatedWrapper className="clinical-slide" delay={120}>
          <div className="mb-5 mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              {isCtf ? <Cpu className="h-5 w-5 text-primary" /> : <Activity className="h-5 w-5 text-primary" />}
              {post.category === "ctf" ? "CTF Writeup" : "Security Research"}
            </div>
            {post.difficulty && (
              <div
                className={`rounded-sm border px-3 py-1 text-base backdrop-blur-xl ${
                  post.difficulty === "Easy"
                    ? "border-emerald-500/20 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                    : post.difficulty === "Medium"
                      ? "border-amber-500/20 bg-amber-500/12 text-amber-700 dark:text-amber-300"
                      : "border-rose-500/20 bg-rose-500/12 text-rose-700 dark:text-rose-300"
                }`}
              >
                {post.difficulty}
              </div>
            )}
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper className="clinical-slide" delay={220}>
          <h1 className="display-type max-w-3xl text-4xl leading-tight tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper className="clinical-slide" delay={320}>
          <div className="mb-10 mt-6 flex flex-wrap items-center gap-4 text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.platform && (
              <div className="flex items-center gap-2">
                <span className="glass-chip">
                  {post.platform}
                </span>
              </div>
            )}
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper className="clinical-slide" delay={420}>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="glass-chip">
                {tag}
              </span>
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
