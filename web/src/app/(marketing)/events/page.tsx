import type { Metadata } from "next";

import { events, communityFeed } from "@/data/events";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { EventCard } from "@/components/marketing/event-card";
import { CommunityFeed } from "@/components/marketing/community-feed";
import { Reveal } from "@/components/marketing/reveal";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Events & Community",
  description:
    "Networking nights, workshops, meetups and panels across the Hustle Grove community. Free for members.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Events worth showing up for"
        description="Networking nights, hands-on workshops and member meetups across every location — free for members, and the best way to grow your network."
      />

      {/* Upcoming events */}
      <section className="container-px py-16 md:py-20">
        <SectionHeading
          eyebrow="Upcoming"
          title={<>What&apos;s on this season</>}
          description="From founder networking to design workshops — there's something for everyone."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <Reveal key={event.slug} delay={(i % 3) * 90}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community feed */}
      <section className="bg-sand/60 py-20 md:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Community feed"
            title={<>The latest from the community</>}
            description="Announcements, member spotlights and workspace news from across the network."
          />
          <CommunityFeed items={communityFeed} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
