import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react";

import { getEvent, events } from "@/data/events";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/marketing/timeline";
import { RegisterButton } from "@/components/marketing/register-button";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.excerpt };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const soldOut = event.spotsLeft === 0;

  return (
    <>
      {/* Banner */}
      <section className="relative">
        <div className="relative h-[42vh] min-h-80 w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10" />
        </div>
        <div className="container-px">
          <div className="relative -mt-28 rounded-3xl border border-border/70 bg-card p-6 shadow-xl md:p-8">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/events" className="hover:text-foreground">
                Events
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-foreground">{event.title}</span>
            </nav>
            <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <Badge variant="gold">{event.type}</Badge>
                <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                  {event.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4 text-primary" />
                    {event.dateLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-primary" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="size-4 text-primary" />
                    {soldOut ? "Sold out" : `${event.spotsLeft} spots left`}
                  </span>
                </div>
              </div>
              <RegisterButton
                eventTitle={event.title}
                soldOut={soldOut}
                size="lg"
                variant={soldOut ? "outline" : "default"}
              >
                {soldOut ? "Join waitlist" : "Register — free"}
              </RegisterButton>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-px py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                About this event
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </div>

            {event.speakers.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-foreground">Speakers</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
                    >
                      <Image
                        src={s.avatar}
                        alt={s.name}
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{s.name}</p>
                        <p className="text-sm text-muted-foreground">{s.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <h3 className="font-display text-lg text-foreground">Schedule</h3>
              <div className="mt-5">
                <Timeline items={event.schedule} />
              </div>
              <RegisterButton
                eventTitle={event.title}
                soldOut={soldOut}
                className="mt-6 w-full"
                variant={soldOut ? "outline" : "default"}
              >
                {soldOut ? "Join waitlist" : "Register — free"}
              </RegisterButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
