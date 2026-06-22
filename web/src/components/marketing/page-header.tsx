export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border/70 bg-sand/40">
      <div className="container-px py-16 md:py-20">
        <span className="eyebrow">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
