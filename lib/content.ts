import type { Post } from "./types";
import postsData from "@/content/posts.json";

export function getAllPosts(): Post[] {
  return postsData as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((post) => post.slug === slug);
}

export function getPostsByCategory(category: "ctf" | "research"): Post[] {
  return (postsData as Post[]).filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return (postsData as Post[]).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  (postsData as Post[]).forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
