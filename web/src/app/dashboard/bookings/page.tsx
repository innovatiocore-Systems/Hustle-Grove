import Link from "next/link";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { upcomingBookings, pastBookings } from "@/data/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { BookingsView } from "@/components/dashboard/bookings-view";

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">My bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {upcomingBookings.length} upcoming · {pastBookings.length} past
          </p>
        </div>
        <Link
          href="/meeting-rooms"
          className={cn(buttonVariants(), "w-full sm:w-auto")}
        >
          <Plus className="size-4" />
          New booking
        </Link>
      </div>

      <BookingsView upcoming={upcomingBookings} past={pastBookings} />
    </div>
  );
}
