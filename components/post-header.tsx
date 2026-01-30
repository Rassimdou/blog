"use client";

import { Calendar, Tag, Shield, Flag, ChevronLeft, Clock } from "lucide-react";
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
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-1/2 top-0 h-96 w-full -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4">
        <AnimatedWrapper animation="fade-up">
          <Link
            href={isCtf ? "/writeups" : "/research"}
            className="mb-8 group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {isCtf ? "writeups" : "research"}</span>
          </Link>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-up" delay={100}>
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider ${isCtf ? "text-primary" : "text-cyan-400"
              }`}>
              {isCtf ? <Flag className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
              {post.category}
            </div>
            {post.difficulty && (
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${post.difficulty === "Easy" ? "bg-emerald-400" :
                  post.difficulty === "Medium" ? "bg-amber-400" : "bg-red-400"
                  }`} />
                {post.difficulty}
              </div>
            )}
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-up" delay={200}>
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            {post.title}
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-up" delay={300}>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>15 min read</span>
            </div>
            {post.platform && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/30">|</span>
                <span className="font-medium text-foreground">{post.platform}</span>
              </div>
            )}
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-up" delay={400}>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
