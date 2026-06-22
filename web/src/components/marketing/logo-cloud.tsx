const companies = [
  "Google",
  "Microsoft",
  "Shopify",
  "airbnb",
  "Spotify",
  "Canva",
];

export function LogoCloud() {
  return (
    <section className="border-y border-border/70 bg-background">
      <div className="container-px py-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary/80">
          Trusted by amazing teams
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
          {companies.map((name) => (
            <span
              key={name}
              className="text-2xl font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
