import type { RoomAvailability } from "@/data/meeting-rooms";
import { cn } from "@/lib/utils";

const config: Record<
  RoomAvailability,
  { label: string; dot: string; text: string; bg: string }
> = {
  available: {
    label: "Available now",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  limited: {
    label: "Limited slots",
    dot: "bg-amber-500",
    text: "text-amber-700",
    bg: "bg-amber-50",
  },
  booked: {
    label: "Fully booked",
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
  },
};

export function AvailabilityBadge({
  status,
  className,
}: {
  status: RoomAvailability;
  className?: string;
}) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        c.bg,
        c.text,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
