import { getAllPosts } from "@/lib/content";
import { HomePageClient } from "@/components/home-page-client";

export default async function HomePage() {
  const posts = getAllPosts();

  return <HomePageClient initialPosts={posts} />;
}

