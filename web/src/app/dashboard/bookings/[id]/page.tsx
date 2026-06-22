import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Users,
  Tag,
  ArrowLeft,
  CalendarX,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getBooking, recentBookings } from "@/data/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { BookingStatusBadge } from "@/components/dashboard/status-badge";

export function generateStaticParams() {
  return recentBookings.map((b) => ({ id: b.id }));
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = getBooking(id);
  if (!booking) notFound();

  const facts = [
    { icon: Tag, label: "Type", value: booking.type },
    { icon: Calendar, label: "Date", value: booking.date },
    { icon: Clock, label: "Time", value: booking.time },
    { icon: MapPin, label: "Location", value: booking.location },
    { icon: Users, label: "Attendees", value: "Up to 8" },
  ];

  const canCancel =
    booking.status === "confirmed" || booking.status === "pending";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/dashboard/bookings" className="hover:text-foreground">
          Bookings
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{booking.id}</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <BookingStatusBadge status={booking.status} />
          <h1 className="mt-3 font-display text-3xl text-foreground">
            {booking.workspace}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Booking reference {booking.id}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <dl className="divide-y divide-border/70">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <dt className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="size-4" />
                  {f.label}
                </dt>
                <dd className="text-sm font-medium text-foreground">{f.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="font-semibold text-foreground">Notes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please arrive five minutes early and check in at reception. Catering can
          be arranged up to 24 hours before your booking.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/bookings" className={cn(buttonVariants({ variant: "outline" }))}>
          <ArrowLeft className="size-4" />
          Back to bookings
        </Link>
        {canCancel && (
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost" }), "text-destructive hover:bg-destructive/10")}
          >
            <CalendarX className="size-4" />
            Cancel booking
          </button>
        )}
      </div>
    </div>
  );
}
