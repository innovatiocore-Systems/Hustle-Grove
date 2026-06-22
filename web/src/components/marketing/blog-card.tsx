import Link from "next/link";
import Image from "next/image";

import type { Article } from "@/data/articles";
import { Badge } from "@/components/ui/badge";

export function BlogCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/resources/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4" variant="muted">
          {article.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={`font-semibold text-foreground ${
            featured ? "text-2xl font-display" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <div className="text-xs">
            <p className="font-medium text-foreground">{article.author.name}</p>
            <p className="text-muted-foreground">
              {article.date} · {article.readTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
