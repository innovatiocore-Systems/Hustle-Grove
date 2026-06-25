import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

import { redirect } from "next/navigation";

import { getSiteSettings } from "@/lib/settings/server";
import { getArticles, getArticleBySlug, getAllSlugs } from "@/lib/articles/server";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/marketing/blog-card";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { resourcesVisible } = await getSiteSettings();
  if (!resourcesVisible) redirect("/");

  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getArticles();
  const related = all
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const more = (related.length ? related : all.filter((a) => a.slug !== article.slug)).slice(0, 3);

  return (
    <>
      <article className="container-px py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/resources" className="hover:text-foreground">Resources</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{article.category}</span>
          </nav>

          <Badge variant="muted" className="mt-6">{article.category}</Badge>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-medium text-foreground">{article.author.name}</p>
              <p className="text-muted-foreground">{article.date} · {article.readTime}</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/8] max-w-4xl overflow-hidden rounded-3xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56rem"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {article.content.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground first:text-xl first:text-foreground">
              {p}
            </p>
          ))}
          <div className="pt-6">
            <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-sand/60 py-16 md:py-20">
        <div className="container-px">
          <h2 className="font-display text-2xl text-foreground">More from the blog</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((a) => <BlogCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <NewsletterSignup />
      </section>
    </>
  );
}
