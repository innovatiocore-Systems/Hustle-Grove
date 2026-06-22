"use client";

import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// Deterministic "booked" pattern so server/client markup matches.
function isBooked(dayIndex: number, slotIndex: number) {
  return (dayIndex * 3 + slotIndex * 2) % 5 === 0;
}

export function MockCalendar({ roomName }: { roomName: string }) {
  const [day, setDay] = React.useState(0);
  const [selected, setSelected] = React.useState<string | null>(null);

  const book = () => {
    if (!selected) return;
    toast.success("Slot requested", {
      description: `${roomName} · ${days[day]} at ${selected}. We'll confirm shortly.`,
    });
    setSelected(null);
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <div className="flex flex-wrap gap-1.5">
        {days.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDay(i);
              setSelected(null);
            }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              day === i
                ? "bg-brand-gradient text-white"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {slots.map((slot, i) => {
          const booked = isBooked(day, i);
          const isSelected = selected === slot;
          return (
            <button
              key={slot}
              type="button"
              disabled={booked}
              onClick={() => setSelected(slot)}
              className={cn(
                "rounded-lg border py-2 text-sm font-medium transition-colors",
                booked
                  ? "cursor-not-allowed border-border/60 bg-muted/50 text-muted-foreground/50 line-through"
                  : isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <Button onClick={book} disabled={!selected} className="mt-4 w-full">
        {selected ? `Request ${days[day]} at ${selected}` : "Select a time slot"}
      </Button>
    </div>
  );
}
