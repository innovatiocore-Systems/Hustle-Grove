import "server-only";

import { articles as staticArticles } from "@/data/articles";
import type { Article } from "@/data/articles";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key  = process.env.SUPABASE_SECRET_KEY;

export const ARTICLES_TAG = "articles";

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  author_name: string;
  author_role: string;
  author_avatar: string;
  date: string;
  read_time: string;
  image: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

function toArticle(r: ArticleRow): Article {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category as Article["category"],
    excerpt: r.excerpt,
    content: r.content,
    author: { name: r.author_name, role: r.author_role, avatar: r.author_avatar },
    date: r.date,
    readTime: r.read_time,
    image: r.image,
    featured: r.featured,
  };
}

async function fetchRows(filter: string): Promise<ArticleRow[] | null> {
  if (!url || !key) return null;
  try {
    const res = await fetch(
      `${url}/rest/v1/articles?select=*&${filter}`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 60, tags: [ARTICLES_TAG] },
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as ArticleRow[];
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<Article[]> {
  const rows = await fetchRows("published=eq.true&order=created_at.desc");
  if (!rows || rows.length === 0) return staticArticles;
  return rows.map(toArticle);
}

// Same source as the listing, so every card shown resolves to a page.
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await fetchRows("published=eq.true&select=slug");
  if (!rows || rows.length === 0) return staticArticles.map((a) => a.slug);
  return rows.map((r) => r.slug);
}

export async function revalidateArticles() {
  const { updateTag } = await import("next/cache");
  updateTag(ARTICLES_TAG);
}
