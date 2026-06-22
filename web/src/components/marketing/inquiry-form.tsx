"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

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
  interest: z.string().min(1, "Select an option"),
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

export function InquiryForm({
  title = "Send an inquiry",
  description = "Tell us about your team and we'll be in touch within one business day.",
  defaultInterest,
  submitLabel = "Send inquiry",
}: {
  title?: string;
  description?: string;
  defaultInterest?: string;
  submitLabel?: string;
}) {
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
    // Phase 1 — no backend. Simulate a network request.
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thanks! Your inquiry has been received.", {
      description: `We'll email ${values.email} within one business day.`,
    });
    reset({ interest: defaultInterest ?? "" });
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
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
    </div>
  );
}
