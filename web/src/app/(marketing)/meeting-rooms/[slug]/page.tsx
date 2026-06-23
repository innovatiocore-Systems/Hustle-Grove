import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users, Check, ChevronRight, Tv } from "lucide-react";

import { getMeetingRoom, meetingRooms } from "@/data/meeting-rooms";
import { Gallery } from "@/components/marketing/gallery";
import { AvailabilityBadge } from "@/components/marketing/availability-badge";
import { InquiryForm } from "@/components/marketing/inquiry-form";

export function generateStaticParams() {
  return meetingRooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getMeetingRoom(slug);
  if (!room) return { title: "Meeting room not found" };
  return { title: room.name, description: room.description };
}

export default async function MeetingRoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getMeetingRoom(slug);
  if (!room) notFound();

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/70 bg-sand/40">
        <div className="container-px py-10 md:py-12">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/meeting-rooms" className="hover:text-foreground">
              Meeting rooms
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{room.name}</span>
          </nav>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <AvailabilityBadge status={room.availability} />
              <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                {room.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {room.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  Up to {room.capacity} people
                </span>
              </div>
            </div>
            <p className="font-display text-3xl text-foreground">
              ${room.hourlyRate}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / hour
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-px py-10 md:py-12">
        <Gallery images={room.gallery} alt={room.name} />
      </section>

      {/* Content */}
      <section className="container-px pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                About this room
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {room.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground">Equipment</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.equipment.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground"
                  >
                    <Tv className="size-4 text-primary" />
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground">Facilities</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.facilities.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <InquiryForm
              title="Enquire about this room"
              description={`Pick a date and time and we'll confirm ${room.name}.`}
              submitLabel="Send inquiry"
              room={{
                roomId: room.slug,
                roomName: room.name,
                location: room.location,
              }}
            />
          </aside>
        </div>
      </section>
    </>
  );
}
