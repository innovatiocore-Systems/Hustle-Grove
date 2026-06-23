"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { meetingRooms } from "@/data/meeting-rooms";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// Deterministic booked pattern, varied per room so each looks distinct.
function isBooked(roomSeed: number, dayIndex: number, slotIndex: number) {
  return (roomSeed + dayIndex * 3 + slotIndex * 2) % 5 === 0;
}

export function AvailabilityView() {
  const [slug, setSlug] = React.useState(meetingRooms[0]?.slug ?? "");
  const roomIndex = Math.max(
    0,
    meetingRooms.findIndex((r) => r.slug === slug)
  );
  const room = meetingRooms[roomIndex];

  const total = days.length * slots.length;
  const booked = days.reduce(
    (acc, _d, di) =>
      acc + slots.filter((_s, si) => isBooked(roomIndex, di, si)).length,
    0
  );
  const freePct = Math.round(((total - booked) / total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Availability</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Indicative weekly availability — {freePct}% of slots open for{" "}
            {room?.name}
          </p>
        </div>
        <div className="w-full sm:w-64">
          <Label htmlFor="av-room">Room</Label>
          <Select
            id="av-room"
            className="mt-1.5"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          >
            {meetingRooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} — {r.location}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-5">
        <div className="overflow-x-auto">
          <div className="min-w-[40rem]">
            <div className="grid grid-cols-[4rem_repeat(5,1fr)] gap-2">
              <div />
              {days.map((d) => (
                <div
                  key={d}
                  className="pb-1 text-center text-xs font-semibold text-muted-foreground"
                >
                  {d}
                </div>
              ))}
              {slots.map((slot, si) => (
                <React.Fragment key={slot}>
                  <div className="flex items-center justify-end pr-1 text-xs text-muted-foreground">
                    {slot}
                  </div>
                  {days.map((d, di) => {
                    const taken = isBooked(roomIndex, di, si);
                    return (
                      <div
                        key={`${d}-${slot}`}
                        className={cn(
                          "h-9 rounded-lg border text-center text-[0.7rem] leading-9",
                          taken
                            ? "border-border/60 bg-muted/60 text-muted-foreground/60"
                            : "border-primary/20 bg-primary/10 font-medium text-primary"
                        )}
                      >
                        {taken ? "Booked" : "Free"}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm border border-primary/20 bg-primary/10" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm border border-border/60 bg-muted/60" />
            Booked
          </span>
        </div>
      </div>
    </div>
  );
}
