import { getSupabase } from "@/lib/supabase/client";

export interface ArticleRow {
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
  updated_at: string;
}

export type ArticleInput = Omit<ArticleRow, "id" | "created_at" | "updated_at">;

function sb() {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured.");
  return client;
}

export async function listArticles(): Promise<ArticleRow[]> {
  const { data, error } = await sb()
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as ArticleRow[];
}

export async function createArticle(input: ArticleInput): Promise<ArticleRow> {
  const { data, error } = await sb()
    .from("articles")
    .insert({ ...input, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as ArticleRow;
}

export async function updateArticle(
  id: string,
  input: Partial<ArticleInput>
): Promise<ArticleRow> {
  const { data, error } = await sb()
    .from("articles")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as ArticleRow;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await sb().from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
