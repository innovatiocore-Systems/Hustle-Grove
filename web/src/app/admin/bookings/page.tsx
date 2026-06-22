import { recentBookings } from "@/data/dashboard";
import { adminMembers } from "@/data/admin";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { BookingStatusBadge } from "@/components/dashboard/status-badge";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Booking management
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All workspace and meeting-room bookings across the network
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Ref</TableHead>
              <TableHead>Space</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((b, i) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium text-foreground">{b.id}</TableCell>
                <TableCell className="text-foreground">{b.workspace}</TableCell>
                <TableCell className="text-muted-foreground">
                  {adminMembers[i % adminMembers.length].name}
                </TableCell>
                <TableCell className="text-muted-foreground">{b.location}</TableCell>
                <TableCell className="text-muted-foreground">{b.date}</TableCell>
                <TableCell>
                  <BookingStatusBadge status={b.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
