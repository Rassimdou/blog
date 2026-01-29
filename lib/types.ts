export interface ContentBlock {
  type: "heading" | "paragraph" | "code" | "flag" | "image";
  level?: number;
  text?: string;
  language?: string;
  code?: string;
  src?: string;
  alt?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: "ctf" | "research";
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  date: string;
  summary: string;
  platform?: string;
  content: ContentBlock[];
}
