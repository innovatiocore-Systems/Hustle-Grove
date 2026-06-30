import type { Metadata } from "next";

import { companyStats, values } from "@/data/company";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatCard } from "@/components/marketing/stat-card";
import { Reveal } from "@/components/marketing/reveal";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hustle Grove Workspaces designs premium, flexible workspaces and communities that help modern teams do their best work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Hustle Grove"
        title="We design workspaces people love to show up to"
        description="Hustle Grove Workspaces was founded on a simple belief: where you work shapes how you work. We craft premium, flexible spaces — and the communities inside them — for modern teams."
      />

      {/* Story */}
      <section className="container-px py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Our story"
            title={<>Built for Canberra&apos;s best teams</>}
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              We launched Hustle Grove with a single conviction: premium,
              flexible workspace shouldn&apos;t be a privilege reserved for
              large corporates. It should be available to every ambitious team
              — from day one.
            </p>
            <p>
              Today our Level 4 space at 28 University Avenue sits at the heart
              of Canberra&apos;s CBD. We&apos;ve obsessed over every detail —
              natural light, considered design, real hospitality — so that the
              moment you walk in, it feels like somewhere you&apos;d genuinely
              want to work.
            </p>
            <p>
              Our mission is simple: give every team a workspace worth showing
              up for, on terms that flex with them.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-sidebar py-20 md:py-24">
        <div className="container-px text-center">
          <span className="eyebrow justify-center text-white/70">
            <span className="h-px w-6 bg-primary" />
            Our mission
          </span>
          <p className="mx-auto mt-6 max-w-4xl font-display text-2xl leading-[1.4] text-white sm:text-3xl md:text-4xl md:leading-[1.35]">
            To give every team a workspace worth showing up for — premium,
            flexible and genuinely human — so they can do the best work of their
            careers.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="What we value"
          title={<>The principles behind every Hustle Grove</>}
          description="Four ideas guide how we design our spaces, hire our teams and serve our members."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal
                key={value.title}
                delay={i * 90}
                className="rounded-2xl border border-border/70 bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-sand/40 py-16 md:py-20">
        <div className="container-px mx-auto grid max-w-2xl grid-cols-2 gap-8">
          {companyStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
