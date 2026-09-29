import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";

import { companyStats, values } from "@/data/company";
import { img } from "@/lib/images";
import { AnimatedBackground } from "@/components/marketing/animated-background";
import { LeadButton } from "@/components/lead/lead-button";
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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70">
        <AnimatedBackground />
        <div className="pointer-events-none absolute inset-0 bg-hero-wash" />
        <div className="relative container-px grid items-center gap-12 pb-16 pt-32 md:pb-20 md:pt-36 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Leaf className="size-5" />
              </span>
              <span className="eyebrow">
                <span className="h-px w-6 bg-primary" />
                About Hustle Grove
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              We design workspaces people{" "}
              <span className="text-brand-gradient">love to show up to</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Hustle Grove Workspaces was founded on a simple belief: where you
              work shapes how you work. We craft premium, flexible spaces — and
              the communities inside them — for modern teams.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Canberra CBD", "~145 sqm", "Month-to-month"].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-foreground/80"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {chip}
                </span>
              ))}
            </div>
            <LeadButton lead="tour" size="lg" className="mt-8">
              Book a free tour
              <ArrowRight className="size-4" />
            </LeadButton>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-black/20">
            <Image
              src={img("1497366754035-f200968a6e72", 1200, 900)}
              alt="Glass-walled private suites at Hustle Grove"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-px py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
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
                Today our Level 4 space on University Avenue sits at the heart
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
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/20">
              <Image
                src={img("1497366811353-6870744d04b2", 1200, 960)}
                alt="The Hustle Grove meeting room"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-xl sm:-left-6">
              <p className="font-display text-2xl text-primary">Level 4</p>
              <p className="text-xs text-muted-foreground">
                Canberra CBD · University Ave
              </p>
            </div>
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
