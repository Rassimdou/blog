import { getPostsByCategory } from "@/lib/content";
import { WriteupsPageClient } from "@/components/writeups-page-client";

export default async function WriteupsPage() {
  const allPosts = getPostsByCategory("ctf").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <WriteupsPageClient initialPosts={allPosts} />;
}

