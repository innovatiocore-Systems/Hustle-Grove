"use client";

import * as React from "react";

import type { Booking } from "@/lib/types";
import { Tabs } from "@/components/ui/tabs";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { EmptyState } from "@/components/states/states";

export function BookingsView({
  upcoming,
  past,
}: {
  upcoming: Booking[];
  past: Booking[];
}) {
  const [tab, setTab] = React.useState("upcoming");
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-5">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "upcoming", label: "Upcoming", count: upcoming.length },
          { value: "past", label: "Past", count: past.length },
        ]}
      />
      {list.length > 0 ? (
        <div className="rounded-2xl border border-border/70 bg-card">
          <BookingsTable bookings={list} />
        </div>
      ) : (
        <EmptyState
          title={`No ${tab} bookings`}
          description="When you book a workspace or meeting room, it'll show up here."
        />
      )}
    </div>
  );
}
