import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  ArrowRight,
  Phone,
  CalendarDays,
  Map,
  Train,
  Bus,
  Bike,
  Footprints,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getLocation, locations } from "@/data/locations";
import { getSolution } from "@/data/solutions";
import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { Gallery } from "@/components/marketing/gallery";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Location not found" };
  return {
    title: location.name,
    description: location.shortDescription,
  };
}

const availability = [
  { day: "Mon", status: "Available" },
  { day: "Tue", status: "Available" },
  { day: "Wed", status: "Limited" },
  { day: "Thu", status: "Available" },
  { day: "Fri", status: "Limited" },
  { day: "Sat", status: "Available" },
  { day: "Sun", status: "Closed" },
] as const;

function availabilityVariant(status: string) {
  if (status === "Available") return "success" as const;
  if (status === "Limited") return "warning" as const;
  return "neutral" as const;
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const offered = location.solutions
    .map((s) => getSolution(s))
    .filter(Boolean);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/70 bg-sand/40">
        <div className="container-px py-10 md:py-12">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/locations" className="hover:text-foreground">
              Locations
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{location.name}</span>
          </nav>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {location.isNew && <Badge variant="gold">New</Badge>}
                {location.isPopular && <Badge>Popular</Badge>}
                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Star className="size-4 fill-gold text-gold" />
                  {location.rating}
                  <span className="font-normal text-muted-foreground">
                    ({location.reviews} reviews)
                  </span>
                </span>
              </div>
              <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                {location.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" />
                {location.address}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Book a Tour
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-px py-10 md:py-12">
        <Gallery images={location.gallery} alt={location.name} />
      </section>

      {/* Content */}
      <section className="container-px pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          {/* Main */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                About this space
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {location.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border/70 bg-card p-4">
                  <Users className="size-5 text-primary" />
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    {location.capacity}
                  </p>
                  <p className="text-sm text-muted-foreground">Member capacity</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-card p-4">
                  <Star className="size-5 text-primary" />
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    {location.rating}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {location.reviews} reviews
                  </p>
                </div>
                <div className="col-span-2 rounded-xl border border-border/70 bg-card p-4 sm:col-span-1">
                  <CalendarDays className="size-5 text-primary" />
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    ${location.startingPrice}
                  </p>
                  <p className="text-sm text-muted-foreground">Starting / month</p>
                </div>
              </div>
            </div>

            {/* Workspace types */}
            <div>
              <h2 className="font-display text-2xl text-foreground">
                Workspace types
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {offered.map((s) => (
                  <Badge key={s!.slug} variant="outline" className="px-3 py-1.5">
                    {s!.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-display text-2xl text-foreground">Amenities</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {location.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="font-display text-2xl text-foreground">
                Pricing plans
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {location.pricing.map((plan) => (
                  <div
                    key={plan.name}
                    className={cn(
                      "flex flex-col rounded-2xl border p-6",
                      plan.highlighted
                        ? "border-primary bg-primary/[0.03] shadow-md"
                        : "border-border/70 bg-card"
                    )}
                  >
                    {plan.highlighted && (
                      <Badge className="mb-3 w-fit">Most popular</Badge>
                    )}
                    <h3 className="font-semibold text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <p className="mt-4">
                      <span className="font-display text-3xl text-foreground">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        {plan.priceUnit}
                      </span>
                    </p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({
                          variant: plan.highlighted ? "default" : "outline",
                        }),
                        "mt-6 w-full"
                      )}
                    >
                      Get started
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability (mock) */}
            <div>
              <h2 className="font-display text-2xl text-foreground">
                Availability this week
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Live availability is indicative. Confirm exact dates when you book
                a tour.
              </p>
              <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-7">
                {availability.map((d) => (
                  <div
                    key={d.day}
                    className="rounded-xl border border-border/70 bg-card p-3 text-center"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {d.day}
                    </p>
                    <div className="mt-2 flex justify-center">
                      <Badge variant={availabilityVariant(d.status)}>
                        {d.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="mt-1">
                <span className="font-display text-4xl text-foreground">
                  ${location.startingPrice}
                </span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <div className="mt-5 space-y-3">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Book a Tour
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full"
                  )}
                >
                  <Phone className="size-4" />
                  {site.phone}
                </a>
              </div>

              {/* Map placeholder */}
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-muted">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary)_0,transparent_45%)] opacity-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <MapPin className="size-7 text-primary" />
                  <p className="mt-2 px-4 text-sm font-medium text-foreground">
                    {location.city}, {location.region}
                  </p>
                  <p className="text-xs text-muted-foreground">Map preview</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Floor plan */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-foreground">Floor plan</h2>
          <div className="relative mt-5 aspect-[21/9] overflow-hidden rounded-2xl border border-border/70 bg-muted">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-background shadow-md">
                <Map className="size-7 text-primary" />
              </span>
              <p className="mt-3 font-medium text-foreground">
                Interactive floor plan
              </p>
              <p className="text-sm text-muted-foreground">
                Explore the full layout on your tour
              </p>
            </div>
          </div>
        </div>

        {/* Getting here */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-foreground">
              Nearby landmarks
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                `Steps from ${location.city}'s central transit`,
                "Cafés, gyms and restaurants on the block",
                "Surrounded by leading tech and finance firms",
                "Green spaces within a short walk",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-3.5" />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">Getting here</h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                { icon: Footprints, mode: "Walk", detail: "City center · 8 min" },
                { icon: Train, mode: "Metro", detail: "Nearest station · 3 min" },
                { icon: Bus, mode: "Bus", detail: "Stop on the block" },
                { icon: Bike, mode: "Bike", detail: "Secure storage on-site" },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.mode}
                    className="rounded-xl border border-border/70 bg-card p-4"
                  >
                    <Icon className="size-5 text-primary" />
                    <p className="mt-2 font-medium text-foreground">{t.mode}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-primary" />
              FAQ
            </span>
            <h2 className="mt-4 font-display text-2xl text-foreground">
              Good to know
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Common questions about membership, access and booking a tour.
            </p>
          </div>
          <Accordion items={faqs} />
        </div>

        {/* Inquiry */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-primary" />
              Interested?
            </span>
            <h2 className="mt-4 font-display text-3xl text-foreground">
              Enquire about {location.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Share a few details and our community team will reach out with
              availability, pricing and a personalised tour of the space.
            </p>
          </div>
          <InquiryForm
            title="Inquire about this space"
            description={`We'll get back to you about ${location.name} within one business day.`}
            submitLabel="Send inquiry"
          />
        </div>
      </section>
    </>
  );
}
