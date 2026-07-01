"use client";

import * as React from "react";
import Link from "next/link";
import { Inbox, Sparkles, Building2, DoorOpen, ArrowRight, Loader2, Info } from "lucide-react";

import { useInquiries } from "@/lib/inquiries/use-inquiries";
import { locations } from "@/data/locations";
import { meetingRooms } from "@/data/meeting-rooms";
import { KpiCard, type Kpi } from "@/components/charts/kpi-card";
import { DonutChart } from "@/components/charts/donut-chart";
import { ErrorState } from "@/components/states/states";
import {
  InquiryStatusBadge,
  relativeTime,
} from "@/components/admin/inquiry-status";

// Maps the `interest`/`roomName` values collected by the inquiry form to the
// space-type buckets shown in the distribution chart below.
const SPACE_TYPE_BY_ROOM_NAME: Record<string, string> = {
  "Private Office": "Private Offices",
  "Dedicated Desk": "Dedicated Desks",
  "Hot Desk": "Hot Desks",
  "Meeting Room": "Meeting Rooms",
};

const SPACE_TYPE_ORDER = ["Private Offices", "Dedicated Desks", "Hot Desks", "Meeting Rooms", "Other"];

const SPACE_TYPE_COLORS: Record<string, string> = {
  "Private Offices": "var(--primary)",
  "Dedicated Desks": "color-mix(in oklch, var(--primary) 55%, white)",
  "Hot Desks": "var(--violet)",
  "Meeting Rooms": "color-mix(in oklch, var(--violet) 45%, white)",
  Other: "#d4d4d8",
};

export function AdminOverview() {
  const { inquiries, loading, error, reload } = useInquiries();

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-24">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />;
  }

  const newCount = inquiries.filter((i) => i.status === "New").length;
  const recent = inquiries.slice(0, 6);

  const spaceTypeCounts = new Map<string, number>();
  for (const i of inquiries) {
    const key = (i.roomName && SPACE_TYPE_BY_ROOM_NAME[i.roomName]) || "Other";
    spaceTypeCounts.set(key, (spaceTypeCounts.get(key) ?? 0) + 1);
  }
  const inquirySegments = SPACE_TYPE_ORDER.filter(
    (label) => label !== "Other" || spaceTypeCounts.has("Other")
  ).map((label) => ({
    label,
    value: spaceTypeCounts.get(label) ?? 0,
    color: SPACE_TYPE_COLORS[label],
  }));

  const kpis: Kpi[] = [
    {
      label: "Total inquiries",
      value: String(inquiries.length),
      delta: `${newCount} new`,
      trend: newCount > 0 ? "up" : undefined,
      icon: Inbox,
    },
    { label: "New inquiries", value: String(newCount), icon: Sparkles },
    { label: "Spaces", value: String(locations.length), icon: Building2 },
    { label: "Meeting rooms", value: String(meetingRooms.length), icon: DoorOpen },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live inquiry activity and workspace demo stats
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View inquiries
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Inquiry distribution by space type */}
        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <h2 className="font-semibold text-foreground">Inquiry distribution by space type</h2>
          <p className="text-sm text-muted-foreground">Percentage share of total inquiries</p>
          <div className="mt-6">
            <DonutChart
              segments={inquirySegments}
              centerLabel={String(inquiries.length)}
              centerSub="Total inquiries"
              formatValue={(value, pct) => `${pct}% (${value})`}
            />
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>Percentages are based on total inquiries received in the selected period.</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Recent activity</h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-1">
            {recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No inquiries yet — submissions from the website will show here.
              </p>
            ) : (
              recent.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 hover:bg-muted/50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {i.fullName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {i.roomName ?? i.company ?? i.email} · {relativeTime(i.createdAt)}
                    </p>
                  </div>
                  <InquiryStatusBadge status={i.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
