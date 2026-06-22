import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, ArrowRight } from "lucide-react";

import type { CommunityEvent } from "@/data/events";
import { Badge } from "@/components/ui/badge";

export function EventCard({ event }: { event: CommunityEvent }) {
  const soldOut = event.spotsLeft === 0;
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4" variant="gold">
          {event.type}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-primary">
          {event.dateLabel} · {event.time}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {event.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {event.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            {soldOut ? "Sold out" : `${event.spotsLeft} spots left`}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
          <span className="text-sm font-medium text-foreground">
            {soldOut ? "Join waitlist" : "Free for members"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            View event
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
