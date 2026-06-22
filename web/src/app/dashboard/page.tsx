import Link from "next/link";
import { ArrowRight, Plus, MapPin, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  member,
  dashboardStats,
  recentBookings,
  upcomingVisits,
} from "@/data/dashboard";
import { locations } from "@/data/locations";
import { buttonVariants } from "@/components/ui/button";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { LocationCard } from "@/components/marketing/location-card";

export default function DashboardPage() {
  const recommendations = locations.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Welcome back, {member.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your workspaces today.
          </p>
        </div>
        <Link
          href="/locations"
          className={cn(buttonVariants(), "w-full sm:w-auto")}
        >
          <Plus className="size-4" />
          New booking
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <DashboardStatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Bookings + Visits */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border/70 bg-card">
          <div className="flex items-center justify-between p-5">
            <div>
              <h2 className="font-semibold text-foreground">Recent bookings</h2>
              <p className="text-sm text-muted-foreground">
                Your latest workspace activity
              </p>
            </div>
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="border-t border-border/70">
            <BookingsTable bookings={recentBookings.slice(0, 4)} />
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card">
          <div className="p-5">
            <h2 className="font-semibold text-foreground">Upcoming visits</h2>
            <p className="text-sm text-muted-foreground">Your scheduled days in</p>
          </div>
          <div className="divide-y divide-border/70 border-t border-border/70">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="flex gap-4 p-5">
                <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {visit.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {visit.location}
                  </p>
                  <p className="mt-1 text-xs font-medium text-foreground">
                    {visit.date} · {visit.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">
              Recommended for you
            </h2>
            <p className="text-sm text-muted-foreground">
              Spaces your team might like, based on your activity
            </p>
          </div>
          <Link
            href="/locations"
            className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Browse all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
}
