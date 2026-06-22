import Link from "next/link";

import type { Booking } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { BookingStatusBadge } from "@/components/dashboard/status-badge";

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Booking</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              <Link
                href={`/dashboard/bookings/${booking.id}`}
                className="font-medium text-foreground hover:text-primary"
              >
                {booking.workspace}
              </Link>
              <p className="text-xs text-muted-foreground">{booking.id}</p>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {booking.location}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {booking.type}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {booking.date}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {booking.time}
            </TableCell>
            <TableCell>
              <BookingStatusBadge status={booking.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
