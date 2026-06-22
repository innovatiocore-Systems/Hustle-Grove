import type { Metadata } from "next";
import Image from "next/image";

import { img } from "@/lib/images";
import { companyStats, values, team } from "@/data/company";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatCard } from "@/components/marketing/stat-card";
import { Reveal } from "@/components/marketing/reveal";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hustlegrove Workspaces designs premium, flexible workspaces and communities that help modern teams do their best work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Hustlegrove"
        title="We design workspaces people love to show up to"
        description="Hustlegrove Workspaces was founded on a simple belief: where you work shapes how you work. We craft premium, flexible spaces — and the communities inside them — for modern teams."
      />

      {/* Story */}
      <section className="container-px py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-foreground/5">
            <Image
              src={img("1600508774634-4e11d34730e2", 1100, 850)}
              alt="The Hustlegrove Workspaces team in a bright office lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={<>From one floor to a national network</>}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We opened our first floor in San Francisco in 2018 with a dozen
                desks and a strong point of view: flexible workspace didn&apos;t
                have to feel temporary, generic or corporate. It could feel like
                somewhere you&apos;d genuinely want to be.
              </p>
              <p>
                Today, Hustlegrove is home to more than 6,400 members across 24
                locations in 9 cities. We&apos;ve stayed obsessed with the same
                details — natural light, considered design, real hospitality —
                that made that first floor special.
              </p>
              <p>
                As we grow, our mission hasn&apos;t changed: to give every team a
                workspace worth showing up for, on terms that flex with them.
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
          title={<>The principles behind every Hustlegrove</>}
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
        <div className="container-px grid grid-cols-2 gap-8 md:grid-cols-4">
          {companyStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="Leadership"
          title={<>Meet the team behind Hustlegrove</>}
          description="A team of operators, designers and hospitality leaders obsessed with member experience."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 90}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
