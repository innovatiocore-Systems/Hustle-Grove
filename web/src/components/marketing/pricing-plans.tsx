"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { plans } from "@/data/plans";
import { Badge } from "@/components/ui/badge";
import { PricingCard } from "@/components/marketing/pricing-card";

export function PricingPlans() {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("monthly");

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-border bg-card p-1">
          {(["monthly", "annual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors",
                billing === option
                  ? "bg-brand-gradient text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <Badge variant="success">Save 15% with annual billing</Badge>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.slug} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}
