import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FEATURES } from "@/lib/features";
import { featuredAmenities } from "@/data/amenities";
import { testimonials } from "@/data/testimonials";
import { Hero } from "@/components/marketing/hero";
import { StatsBand } from "@/components/marketing/stats-band";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { AmenityCard } from "@/components/marketing/amenity-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <Hero />

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
              eyebrow="Our space · Level 4, University Ave"
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
            <div className="group overflow-hidden rounded-3xl border border-border/70 shadow-2xl shadow-black/20">
              <img
                src="/floor-plan-2d.png"
                alt="Hustle Grove 2D Floor Plan — Level 4, University Ave Canberra"
                className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Level 4 · 6 private suites · 14 dedicated desks · 1 meeting room
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

      <CtaSection />
    </>
  );
}
