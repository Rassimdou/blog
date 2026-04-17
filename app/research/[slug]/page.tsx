import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostHeader } from "@/components/post-header";
import { ContentRenderer } from "@/components/content-renderer";
import { getPostBySlug, getPostsByCategory } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not Found | rzyux" };
  }

  return {
    title: `${post.title} | rzyux`,
    description: post.summary,
  };
}

export function generateStaticParams() {
  const posts = getPostsByCategory("research");
  if (posts.length === 0) {
    return [{ slug: "coming-soon" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ResearchArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.category !== "research") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="mx-auto max-w-3xl px-4 py-20 text-center">
            <h1 className="mb-3 text-3xl font-bold">Research post coming soon</h1>
            <p className="text-muted-foreground">
              New research articles will appear here once posts are published.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Get adjacent posts for navigation
  const allPosts = getPostsByCategory("research").sort(
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
                  href={`/research/${prevPost.slug}`}
                  className="group glass-panel flex flex-col p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
                >
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
                  href={`/research/${nextPost.slug}`}
                  className="group glass-panel flex flex-col items-end p-4 text-right transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
                >
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
