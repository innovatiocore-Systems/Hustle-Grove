import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { FEATURES } from "@/lib/features";
import { solutions } from "@/data/solutions";
import { featuredAmenities } from "@/data/amenities";
import { testimonials } from "@/data/testimonials";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { StatsBand } from "@/components/marketing/stats-band";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SolutionCard } from "@/components/marketing/solution-card";
import { AmenityCard } from "@/components/marketing/amenity-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />

      {/* Workspace Solutions */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-px">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Spaces for every need"
              title={<>Find your perfect space</>}
              description="Beautiful spaces. Flexible terms. Inspiring environment."
              className="max-w-2xl"
            />
            <Link
              href="/locations"
              className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline md:inline-flex"
            >
              Explore the floor
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <Reveal key={solution.slug} delay={i * 90}>
                <SolutionCard solution={solution} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <Reveal>
        <StatsBand />
      </Reveal>

      {/* Member dashboard preview — hidden while member access is disabled */}
      {FEATURES.memberAccess && (
        <Reveal>
          <DashboardPreview />
        </Reveal>
      )}

      {/* 3D Floor Plan preview */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-px">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our space · 21-24/28 University Ave, Canberra"
              title={<>Tour the floor before you visit</>}
              description="Explore every workspace zone in our interactive 3D floor plan. Private suites, dedicated desks, meeting room and more — all on one level."
              className="max-w-2xl"
            />
            <Link
              href="/locations"
              className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline md:inline-flex"
            >
              Full floor plan
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-xl shadow-black/5">
              <div className="flex items-center justify-between border-b border-border/60 bg-card px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Building2 className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Interactive 3D Floor Plan</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">~145 sqm</span>
                </div>
                <a
                  href="/floor-plan-3d.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                >
                  Open fullscreen ↗
                </a>
              </div>
              <iframe
                src="/floor-plan-3d.html"
                title="Hustle Grove 3D Floor Plan"
                className="w-full"
                style={{ height: "460px", border: "none" }}
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Drag to rotate · Scroll to zoom · Hover a room for details
            </p>
          </Reveal>

          <Reveal className="mt-8 flex justify-center">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Book a free tour
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Amenities */}
      <section className="container-px py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Amenities"
            title={<>Everything handled, so you can focus on the work</>}
            description="Thoughtful amenities included with every membership — no hidden extras, no setup, no fuss."
            align="center"
            className="mx-auto"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredAmenities.map((amenity, i) => (
            <Reveal key={amenity.name} delay={(i % 3) * 90}>
              <AmenityCard amenity={amenity} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Loved by members"
              title={<>Trusted by Canberra&apos;s growing teams</>}
              description="Don't just take our word for it — here's what members say about working at Hustle Grove."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.author} delay={(i % 2) * 100}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
