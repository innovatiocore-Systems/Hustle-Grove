"use client";

import * as React from "react";
import { Users, MapPin } from "lucide-react";

import { meetingRooms, type RoomAvailability } from "@/data/meeting-rooms";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const availabilityVariant: Record<
  RoomAvailability,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  available: "success",
  limited: "warning",
  booked: "danger",
};

const availabilityLabel: Record<RoomAvailability, string> = {
  available: "Available",
  limited: "Limited",
  booked: "Fully booked",
};

const options: RoomAvailability[] = ["available", "limited", "booked"];

export function MeetingRoomsManager() {
  // Availability is editable in-memory for the demo.
  const [state, setState] = React.useState<Record<string, RoomAvailability>>(
    () => Object.fromEntries(meetingRooms.map((r) => [r.slug, r.availability]))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Meeting rooms</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meetingRooms.length} rooms across all locations
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Room</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Set availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetingRooms.map((r) => {
              const value = state[r.slug];
              return (
                <TableRow key={r.slug}>
                  <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {r.location}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" />
                      {r.capacity}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">${r.hourlyRate}/hr</TableCell>
                  <TableCell>
                    <Badge variant={availabilityVariant[value]}>
                      {availabilityLabel[value]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      className="h-9 w-40"
                      value={value}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          [r.slug]: e.target.value as RoomAvailability,
                        }))
                      }
                      aria-label={`Set availability for ${r.name}`}
                    >
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {availabilityLabel[o]}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
