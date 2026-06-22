"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

export function RegisterButton({
  eventTitle,
  soldOut = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    eventTitle: string;
    soldOut?: boolean;
  }) {
  const onClick = () => {
    if (soldOut) {
      toast.success("Added to the waitlist", {
        description: `We'll let you know if a spot opens up for ${eventTitle}.`,
      });
    } else {
      toast.success("You're registered! 🎉", {
        description: `See you at ${eventTitle}. A calendar invite is on its way.`,
      });
    }
  };
  return (
    <Button type="button" onClick={onClick} {...props}>
      {children}
    </Button>
  );
}
