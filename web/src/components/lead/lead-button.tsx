"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { useLeadModal, type LeadType } from "@/components/lead/lead-modal-provider";

export function LeadButton({
  lead = "tour",
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { lead?: LeadType }) {
  const { open } = useLeadModal();
  return (
    <Button type="button" onClick={() => open(lead)} {...props}>
      {children}
    </Button>
  );
}
