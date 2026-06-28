"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { createInquiry } from "@/lib/inquiries/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

const interests = [
  "Private Office",
  "Dedicated Desk",
  "Hot Desk",
  "Meeting Room",
  "Event Space",
  "Enterprise / Custom",
];

/** Scheduling grid — used when the form is attached to a specific room. */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// Deterministic "booked" pattern so server/client markup matches.
function isBooked(dayIndex: number, slotIndex: number) {
  return (dayIndex * 3 + slotIndex * 2) % 5 === 0;
}

/** Resolve the next calendar date (YYYY-MM-DD) for a Mon–Fri offset. */
function nextDateForWeekday(dayIndex: number): string {
  const target = dayIndex + 1; // Mon=1 … Fri=5
  const now = new Date();
  const result = new Date(now);
  const diff = (target - now.getDay() + 7) % 7 || 7;
  result.setDate(now.getDate() + diff);
  return result.toISOString().slice(0, 10);
}

export interface RoomContext {
  roomId?: string;
  roomName: string;
  location?: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

export function InquiryForm({
  title = "Send an inquiry",
  description = "Tell us about your team and we'll be in touch within one business day.",
  defaultInterest,
  submitLabel = "Send inquiry",
  room,
  embedded = false,
  onSuccess,
}: {
  title?: string;
  description?: string;
  defaultInterest?: string;
  submitLabel?: string;
  /** When provided, the form attaches to a specific room and shows a date/time picker. */
  room?: RoomContext;
  /** Render without the card chrome/heading — e.g. inside a modal that supplies its own header. */
  embedded?: boolean;
  /** Called after a successful submission (e.g. to close a modal). */
  onSuccess?: () => void;
}) {
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: defaultInterest ?? "" },
  });

  const onSubmit = async (values: FormValues) => {
    const requestedDate = room && slot ? nextDateForWeekday(day) : "";
    const requestedTime = room && slot ? slot : "";

    const res = await createInquiry({
      fullName: values.name,
      email: values.email,
      phone: values.phone ?? "",
      company: values.company ?? "",
      roomId: room?.roomId ?? "",
      roomName: room?.roomName ?? values.interest ?? "",
      location: room?.location ?? "",
      requestedDate,
      requestedTime,
      message: values.message,
    });

    if (!res.ok) {
      toast.error("Couldn't send your inquiry", {
        description: res.error ?? "Please try again in a moment.",
      });
      return;
    }

    toast.success("Thanks! Your inquiry has been received.", {
      description: room
        ? `We'll confirm ${room.roomName}${
            slot ? ` for ${days[day]} at ${slot}` : ""
          } shortly.`
        : `We'll email ${values.email} within one business day.`,
    });
    reset({ interest: defaultInterest ?? "" });
    setSlot(null);
    onSuccess?.();
  };

  const formContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", embedded ? "p-6" : "mt-6")}
      noValidate
    >
        {room && (
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <Label>Preferred date &amp; time</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {days.map((d, i) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setDay(i);
                    setSlot(null);
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
            <div className="mt-3 grid grid-cols-4 gap-2">
              {slots.map((s, i) => {
                const booked = isBooked(day, i);
                const selected = slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={booked}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "rounded-lg border py-2 text-sm font-medium transition-colors",
                      booked
                        ? "cursor-not-allowed border-border/60 bg-muted/50 text-muted-foreground/50 line-through"
                        : selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {slot
                ? `Requesting ${days[day]} at ${slot}. Availability is indicative.`
                : "Select a slot (optional) — availability is indicative."}
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="mt-1.5" placeholder="Jamie Rivera" {...register("name")} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" className="mt-1.5" placeholder="jamie@company.com" {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" className="mt-1.5" placeholder="Acme Inc." {...register("company")} />
          </div>
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" className="mt-1.5" placeholder="+1 (555) 000-0000" {...register("phone")} />
          </div>
        </div>

        {!room && (
          <div>
            <Label htmlFor="interest">I&apos;m interested in</Label>
            <Select id="interest" className="mt-1.5" defaultValue={defaultInterest ?? ""} {...register("interest")}>
              <option value="" disabled>
                Select a workspace type
              </option>
              {interests.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
            <FieldError message={errors.interest?.message} />
          </div>
        )}

        <div>
          <Label htmlFor="message">How can we help?</Label>
          <Textarea
            id="message"
            className="mt-1.5"
            placeholder="Tell us about your team size, preferred location and timeline…"
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : submitLabel}
          {!isSubmitting && <Send className="size-4" />}
        </Button>
    </form>
  );

  if (embedded) return formContent;

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {formContent}
    </div>
  );
}
