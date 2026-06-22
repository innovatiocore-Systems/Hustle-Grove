"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

export function ActionButton({
  toastTitle,
  toastDescription,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    toastTitle: string;
    toastDescription?: string;
  }) {
  return (
    <Button
      type="button"
      onClick={() => toast.success(toastTitle, { description: toastDescription })}
      {...props}
    >
      {children}
    </Button>
  );
}
