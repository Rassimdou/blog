"use client";

import Link from "next/link";
import { Calendar, Tag, ArrowRight, Shield, Flag } from "lucide-react";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/content";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const isCtf = post.category === "ctf";

  return (
    <div className="hover-lift group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
      {/* Category badge */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
        {isCtf ? (
          <Flag className="h-3 w-3 text-primary" />
        ) : (
          <Shield className="h-3 w-3 text-cyan-400" />
        )}
        <span className={isCtf ? "text-primary" : "text-cyan-400"}>
          {post.category}
        </span>
      </div>

      <Link href={`/${post.category === "ctf" ? "writeups" : "research"}/${post.slug}`} className="block">
        <div className="p-6">
          {/* Metadata */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.difficulty && (
              <div className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${post.difficulty === "Easy" ? "bg-emerald-400" :
                    post.difficulty === "Medium" ? "bg-amber-400" : "bg-red-400"
                  }`} />
                <span>{post.difficulty}</span>
              </div>
            )}
            {post.platform && (
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground/30">|</span>
                <span>{post.platform}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary leading-tight">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.summary}
          </p>

          {/* Footer UI */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-[10px] text-muted-foreground">+{post.tags.length - 2}</span>
              )}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
