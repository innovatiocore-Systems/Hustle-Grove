import { Check } from "lucide-react";

import type { Plan } from "@/data/plans";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LeadButton } from "@/components/lead/lead-button";

export function PricingCard({
  plan,
  billing,
}: {
  plan: Plan;
  billing: "monthly" | "annual";
}) {
  const price = billing === "monthly" ? plan.priceMonthly : plan.priceAnnual;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all",
        plan.popular
          ? "border-primary bg-card shadow-xl shadow-primary/10 lg:-my-2 lg:scale-[1.02]"
          : "border-border/70 bg-card"
      )}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most popular
        </Badge>
      )}

      <h3 className="font-display text-xl text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

      <div className="mt-5 flex items-end gap-1.5">
        {price === null ? (
          <span className="font-display text-4xl text-foreground">Custom</span>
        ) : (
          <>
            <span className="font-display text-4xl text-foreground">${price}</span>
            <span className="pb-1 text-sm text-muted-foreground">/mo</span>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{plan.unit}</p>

      <LeadButton
        lead={plan.lead}
        variant={plan.popular ? "default" : "outline"}
        className="mt-6 w-full"
      >
        {plan.ctaLabel}
      </LeadButton>

      {plan.features.length > 0 && (
        <ul className="mt-6 space-y-3 border-t border-border/70 pt-6">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
