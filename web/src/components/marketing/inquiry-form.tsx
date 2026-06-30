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
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  company: z
    .string()
    .trim()
    .max(120, "Company is too long")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(32, "Phone number is too long")
    .regex(/^[0-9\s+().-]+$/, "Phone number contains invalid characters"),
  interest: z.string().min(1, "Please select a workspace type"),
  date: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof schema>;

/** Marks a required field in a label. */
function Req() {
  return <span className="text-destructive"> *</span>;
}

/** Today as YYYY-MM-DD, for the preferred-date min. */
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

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
    // When attached to a room, `interest` is hidden — seed it with the room name
    // so the required check passes; otherwise use the provided default.
    defaultValues: { interest: room ? room.roomName : defaultInterest ?? "", date: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const requestedDate = room
      ? slot
        ? nextDateForWeekday(day)
        : ""
      : values.date ?? "";
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
    reset({ interest: room ? room.roomName : defaultInterest ?? "", date: "" });
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

        {/* Room forms hide the interest picker — keep the seeded value registered. */}
        {room && <input type="hidden" {...register("interest")} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">
              Full name<Req />
            </Label>
            <Input id="name" className="mt-1.5" placeholder="Jamie Rivera" aria-invalid={!!errors.name} {...register("name")} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="email">
              Work email<Req />
            </Label>
            <Input id="email" type="email" className="mt-1.5" placeholder="jamie@company.com" aria-invalid={!!errors.email} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="company">Company (optional)</Label>
            <Input id="company" className="mt-1.5" placeholder="Acme Inc." {...register("company")} />
            <FieldError message={errors.company?.message} />
          </div>
          <div>
            <Label htmlFor="phone">
              Phone<Req />
            </Label>
            <Input id="phone" type="tel" className="mt-1.5" placeholder="+61 2 6100 0142" aria-invalid={!!errors.phone} {...register("phone")} />
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        {!room && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="interest">
                I&apos;m interested in<Req />
              </Label>
              <Select id="interest" className="mt-1.5" aria-invalid={!!errors.interest} {...register("interest")}>
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
            <div>
              <Label htmlFor="date">Preferred date (optional)</Label>
              <Input id="date" type="date" min={todayISO()} className="mt-1.5" {...register("date")} />
              <FieldError message={errors.date?.message} />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="message">
            How can we help?<Req />
          </Label>
          <Textarea
            id="message"
            className="mt-1.5"
            placeholder="Tell us about your team size, preferred location and timeline…"
            aria-invalid={!!errors.message}
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
