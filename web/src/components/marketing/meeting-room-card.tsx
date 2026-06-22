import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Tv, ArrowRight } from "lucide-react";

import type { MeetingRoom } from "@/data/meeting-rooms";
import { AvailabilityBadge } from "@/components/marketing/availability-badge";

export function MeetingRoomCard({ room }: { room: MeetingRoom }) {
  return (
    <Link
      href={`/meeting-rooms/${room.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <AvailabilityBadge status={room.availability} className="bg-background/90 backdrop-blur" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {room.location}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            Up to {room.capacity}
          </span>
          <span className="flex items-center gap-1.5">
            <Tv className="size-3.5" />
            {room.equipment.length} facilities
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
          <p className="text-base font-semibold text-foreground">
            ${room.hourlyRate}
            <span className="text-xs font-normal text-muted-foreground"> / hour</span>
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            View room
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
