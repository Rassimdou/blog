"use client";

import Link from "next/link";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link 
        href={`/${post.category === "ctf" ? "writeups" : "research"}/${post.slug}`} 
        className="group grid gap-3 rounded-sm border border-transparent px-4 py-5 transition-all duration-300 hover:border-border/70 hover:bg-accent/45 md:grid-cols-[140px_1fr]"
    >
        <span className="pt-1 text-base text-muted-foreground">
          {formatDate(post.date)}
        </span>
        <div className="flex flex-col gap-1 w-full">
            <h3 className="display-type text-xl leading-tight text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground line-clamp-2">
              {post.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="glass-chip">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </Link>
  );
}
