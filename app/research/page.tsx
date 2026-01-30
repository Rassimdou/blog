import { getPostsByCategory } from "@/lib/content";
import { ResearchPageClient } from "@/components/research-page-client";

export default async function ResearchPage() {
  const allPosts = getPostsByCategory("research").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <ResearchPageClient initialPosts={allPosts} />;
}

