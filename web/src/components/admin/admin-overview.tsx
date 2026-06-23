"use client";

import * as React from "react";
import Link from "next/link";
import { Inbox, Sparkles, Building2, DoorOpen, ArrowRight, Loader2 } from "lucide-react";

import { useInquiries } from "@/lib/inquiries/use-inquiries";
import { locations } from "@/data/locations";
import { meetingRooms } from "@/data/meeting-rooms";
import { utilization } from "@/data/admin";
import { KpiCard, type Kpi } from "@/components/charts/kpi-card";
import { ErrorState } from "@/components/states/states";
import {
  InquiryStatusBadge,
  relativeTime,
} from "@/components/admin/inquiry-status";

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
        {/* Occupancy demo stats */}
        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <h2 className="font-semibold text-foreground">Occupancy by space type</h2>
          <p className="text-sm text-muted-foreground">Demo utilisation across the network</p>
          <div className="mt-6 space-y-4">
            {utilization.map((u) => (
              <div key={u.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{u.label}</span>
                  <span className="font-medium text-muted-foreground">{u.value}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${u.value}%` }}
                  />
                </div>
              </div>
            ))}
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
