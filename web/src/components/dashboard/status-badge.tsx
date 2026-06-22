import type { BookingStatus, InvoiceStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const bookingVariants: Record<
  BookingStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  confirmed: "success",
  pending: "warning",
  completed: "neutral",
  cancelled: "danger",
};

const invoiceVariants: Record<
  InvoiceStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  paid: "success",
  due: "warning",
  overdue: "danger",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge variant={bookingVariants[status]} className="capitalize">
      {status}
    </Badge>
  );
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Badge variant={invoiceVariants[status]} className="capitalize">
      {status}
    </Badge>
  );
}
