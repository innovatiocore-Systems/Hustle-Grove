import type { Metadata } from "next";
import { ArrowRight, Wallet } from "lucide-react";

import { PageHeader } from "@/components/marketing/page-header";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { LeadButton } from "@/components/lead/lead-button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Dedicated desks, private offices, a meeting room and a soundproof booth. Enquire for a tailored quote.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing tailored to your team"
        highlight="tailored"
        icon={Wallet}
        chips={["Month-to-month", "All-inclusive", "Tailored quotes"]}
        description="Every team works differently. Tell us what you need and we'll put together a quote that fits — then flex up or down as you grow."
      />

      {/* Plans */}
      <section className="container-px py-16 md:py-20">
        <PricingPlans />
      </section>

      {/* Enquire CTA */}
      <section className="container-px py-16 md:py-20">
        <div className="grid items-center gap-8 rounded-3xl border border-border/70 bg-card p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="font-display text-2xl text-foreground">
              Get a quote for your team
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Send us an enquiry and we&apos;ll reply within one business day with pricing
              and the right fit for your team size and work style.
            </p>
          </div>
          <LeadButton lead="tour" size="lg" className="w-full md:w-auto">
            Enquire Now
            <ArrowRight className="size-4" />
          </LeadButton>
        </div>
      </section>
    </>
  );
}
