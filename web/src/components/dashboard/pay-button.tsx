"use client";

import * as React from "react";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

export function PayButton({
  invoiceId,
  amount,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    invoiceId: string;
    amount: number;
  }) {
  const [paying, setPaying] = React.useState(false);

  const onClick = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 900));
    setPaying(false);
    toast.success("Payment successful", {
      description: `$${amount.toLocaleString()} paid for ${invoiceId}.`,
    });
  };

  return (
    <Button type="button" onClick={onClick} disabled={paying} {...props}>
      {paying ? (
        "Processing…"
      ) : (
        <>
          <CreditCard className="size-4" />
          {children}
        </>
      )}
    </Button>
  );
}
