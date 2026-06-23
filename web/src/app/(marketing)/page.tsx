import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FEATURES } from "@/lib/features";
import { solutions } from "@/data/solutions";
import { locations } from "@/data/locations";
import { featuredAmenities } from "@/data/amenities";
import { testimonials } from "@/data/testimonials";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { StatsBand } from "@/components/marketing/stats-band";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SolutionCard } from "@/components/marketing/solution-card";
import { LocationCard } from "@/components/marketing/location-card";
import { AmenityCard } from "@/components/marketing/amenity-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  const featuredLocations = locations.slice(0, 3);

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
              View all spaces
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

      {/* Featured Locations */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-px">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured locations"
              title={<>Inspiring spaces in great neighbourhoods</>}
              description="Each Hustle Grove is designed around its city and community — explore a few of our members' favourites."
              className="max-w-2xl"
            />
            <Link
              href="/locations"
              className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline md:inline-flex"
            >
              All locations
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLocations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 90}>
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
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
              eyebrow="Loved by teams"
              title={<>Trusted by thousands of growing teams</>}
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
