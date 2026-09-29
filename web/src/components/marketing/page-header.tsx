import type { LucideIcon } from "lucide-react";

import { AnimatedBackground } from "@/components/marketing/animated-background";

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  chips,
}: {
  eyebrow: string;
  title: string;
  /** Part of `title` rendered in the brand gradient. */
  highlight?: string;
  description?: string;
  icon?: LucideIcon;
  chips?: string[];
}) {
  const [before, after] = highlight ? title.split(highlight) : [title];

  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <AnimatedBackground />
      <div className="pointer-events-none absolute inset-0 bg-hero-wash" />
      <div className="relative container-px flex flex-col items-center pb-16 pt-32 text-center md:pb-20 md:pt-36">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-8 ring-primary/10">
              <Icon className="size-6" />
            </span>
          )}
          <span className="eyebrow">
            <span className="h-px w-6 bg-primary" />
            {eyebrow}
            <span className="h-px w-6 bg-primary" />
          </span>
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
          {before}
          {highlight && (
            <>
              <span className="text-brand-gradient">{highlight}</span>
              {after}
            </>
          )}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {chips && (
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-foreground/80"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
