import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostHeader } from "@/components/post-header";
import { ContentRenderer } from "@/components/content-renderer";
import { getPostBySlug, getPostsByCategory } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not Found | 0xBlog" };
  }

  return {
    title: `${post.title} | 0xBlog`,
    description: post.summary,
  };
}

export function generateStaticParams() {
  const posts = getPostsByCategory("ctf");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function WriteupPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.category !== "ctf") {
    notFound();
  }

  // Get adjacent posts for navigation
  const allPosts = getPostsByCategory("ctf").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <PostHeader post={post} />

        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <ContentRenderer content={post.content} />

            {/* Post navigation */}
            <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/writeups/${prevPost.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
                >
                  <span className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/writeups/${nextPost.slug}`}
                  className="group flex flex-col items-end rounded-lg border border-border bg-card p-4 text-right transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
                >
                  <span className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    Next
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
