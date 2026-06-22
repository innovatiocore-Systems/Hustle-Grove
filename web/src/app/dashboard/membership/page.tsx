import { Check, Sparkles, Calendar, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { member } from "@/data/dashboard";
import { plans } from "@/data/plans";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/dashboard/action-button";
import { ComparisonTable } from "@/components/marketing/comparison-table";

export default function MembershipPage() {
  const currentPlan = plans.find((p) => member.plan.includes(p.name)) ?? plans[1];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-foreground">Membership</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your plan, upgrade or compare benefits.
        </p>
      </div>

      {/* Current plan */}
      <div className="overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.03]">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <Sparkles className="size-6" />
            </span>
            <div>
              <Badge>Current plan</Badge>
              <p className="mt-2 font-display text-2xl text-foreground">
                {currentPlan.name}
              </p>
              <p className="text-sm text-muted-foreground">{currentPlan.tagline}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-4" />
              Renews on Jul 1, 2026
            </span>
            <span className="font-display text-2xl text-foreground">
              ${currentPlan.priceMonthly}
              <span className="text-sm font-normal text-muted-foreground"> /mo</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-primary/20 px-6 py-4 md:px-8">
          {currentPlan.features.slice(0, 4).map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Check className="size-3.5 text-primary" />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Upgrade options */}
      <div>
        <h2 className="font-semibold text-foreground">Upgrade your plan</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Move up a tier any time — changes apply from your next billing cycle.
        </p>
        <div className="grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => {
            const isCurrent = plan.slug === currentPlan.slug;
            return (
              <div
                key={plan.slug}
                className={cn(
                  "flex flex-col rounded-2xl border p-5",
                  isCurrent ? "border-primary bg-primary/[0.03]" : "border-border/70 bg-card"
                )}
              >
                <p className="font-semibold text-foreground">{plan.name}</p>
                <p className="mt-1 font-display text-2xl text-foreground">
                  {plan.priceMonthly === null ? "Custom" : `$${plan.priceMonthly}`}
                  {plan.priceMonthly !== null && (
                    <span className="text-sm font-normal text-muted-foreground"> /mo</span>
                  )}
                </p>
                {isCurrent ? (
                  <span className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-muted text-sm font-medium text-muted-foreground">
                    Current plan
                  </span>
                ) : (
                  <ActionButton
                    toastTitle="Upgrade requested"
                    toastDescription={`We'll move you to ${plan.name} from your next cycle.`}
                    variant="outline"
                    className="mt-4 w-full"
                  >
                    <Zap className="size-4" />
                    Upgrade
                  </ActionButton>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits comparison */}
      <div>
        <h2 className="font-semibold text-foreground">Compare benefits</h2>
        <div className="mt-5 rounded-2xl border border-border/70 bg-card p-2 md:p-4">
          <ComparisonTable />
        </div>
      </div>
    </div>
  );
}
