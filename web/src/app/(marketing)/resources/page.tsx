import type { Metadata } from "next";

import { articles, articleCategories } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { BlogCard } from "@/components/marketing/blog-card";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Ideas on productivity, workplace design, startups and remote work from the Hustle Grove team.",
};

export default function ResourcesPage() {
  const featured = articles.filter((a) => a.featured).slice(0, 2);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <PageHeader
        eyebrow="Resource center"
        title="Ideas for the way you work"
        description="Practical thinking on productivity, workplace design, startups and remote work — from the people who build workspaces for a living."
      />

      {/* Featured */}
      <section className="container-px py-16 md:py-20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Browse:
          </span>
          {articleCategories.map((c) => (
            <Badge key={c} variant="outline" className="px-3 py-1">
              {c}
            </Badge>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90}>
              <BlogCard article={article} featured />
            </Reveal>
          ))}
        </div>
      </section>

      {/* All articles */}
      <section className="bg-sand/60 py-16 md:py-20">
        <div className="container-px">
          <SectionHeading
            eyebrow="Latest articles"
            title={<>Fresh from the blog</>}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 3) * 90}>
                <BlogCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-px py-16 md:py-24">
        <NewsletterSignup />
      </section>
    </>
  );
}
