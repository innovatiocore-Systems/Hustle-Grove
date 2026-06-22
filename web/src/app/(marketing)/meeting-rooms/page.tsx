import type { Metadata } from "next";

import { meetingRooms } from "@/data/meeting-rooms";
import { PageHeader } from "@/components/marketing/page-header";
import { MeetingRoomCard } from "@/components/marketing/meeting-room-card";
import { Reveal } from "@/components/marketing/reveal";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Meeting Rooms",
  description:
    "Book premium meeting rooms and boardrooms by the hour — with AV, video conferencing and barista coffee.",
};

export default function MeetingRoomsPage() {
  const available = meetingRooms.filter((r) => r.availability !== "booked").length;

  return (
    <>
      <PageHeader
        eyebrow="Meeting rooms"
        title="Rooms that make an impression"
        description="Boardrooms, studios and huddle spaces with premium AV, video conferencing and barista coffee — bookable by the hour or the day."
      />

      <section className="container-px py-12 md:py-16">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{meetingRooms.length}</span>{" "}
          rooms ·{" "}
          <span className="font-semibold text-emerald-600">{available} available now</span>
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetingRooms.map((room, i) => (
            <Reveal key={room.slug} delay={(i % 3) * 90}>
              <MeetingRoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
