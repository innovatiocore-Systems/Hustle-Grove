import { plans } from "@/data/plans";
import { PricingCard } from "@/components/marketing/pricing-card";

export function PricingPlans() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {plans.map((plan) => (
        <PricingCard key={plan.slug} plan={plan} />
      ))}
    </div>
  );
}
