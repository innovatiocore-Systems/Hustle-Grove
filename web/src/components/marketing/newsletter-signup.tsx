"use client";

import * as React from "react";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSignup({
  variant = "panel",
}: {
  variant?: "panel" | "inline";
}) {
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    e.currentTarget.reset();
    toast.success("You're subscribed!", {
      description: `We'll send the best of Hustle Grove to ${data.get("email")}.`,
    });
  };

  if (variant === "inline") {
    return (
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="sm:flex-1"
          aria-label="Email address"
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "…" : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-stats-gradient px-6 py-12 text-center md:px-12">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white">
        <Mail className="size-6" />
      </span>
      <h2 className="mt-5 font-display text-3xl text-white">
        Get the best of Hustle Grove
      </h2>
      <p className="mx-auto mt-3 max-w-md text-white/70">
        Workspace tips, community stories and new-location news — once a month, no
        spam.
      </p>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"
      >
        <Input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={cn(
            "border-white/20 bg-white/10 text-white placeholder:text-white/50 sm:flex-1"
          )}
          aria-label="Email address"
        />
        <Button
          type="submit"
          variant="solid"
          className="bg-white text-primary hover:bg-white/90"
          disabled={submitting}
        >
          {submitting ? "Subscribing…" : "Subscribe"}
          {!submitting && <ArrowRight className="size-4" />}
        </Button>
      </form>
    </div>
  );
}
