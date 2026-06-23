import { Badge } from "@/components/ui/badge";
import type { InquiryStatus } from "@/lib/inquiries/types";

type Variant = React.ComponentProps<typeof Badge>["variant"];

const variants: Record<InquiryStatus, Variant> = {
  New: "default",
  Contacted: "warning",
  Qualified: "gold",
  Converted: "success",
  Closed: "neutral",
};

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  return <Badge variant={variants[status]}>{status}</Badge>;
}

/** Dot color (matches the badge family) for the CRM pipeline columns. */
export const statusDot: Record<InquiryStatus, string> = {
  New: "bg-primary",
  Contacted: "bg-amber-500",
  Qualified: "bg-gold",
  Converted: "bg-emerald-500",
  Closed: "bg-foreground/30",
};

/** Friendly relative time, e.g. "10m ago", "3h ago", "2d ago". */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Short calendar date, e.g. "Jun 24". */
export function shortDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
