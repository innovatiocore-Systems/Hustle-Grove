import type { Metadata } from "next";
import { Building2, ArrowRight } from "lucide-react";

import { faqs } from "@/data/faqs";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { Accordion } from "@/components/ui/accordion";
import { LeadButton } from "@/components/lead/lead-button";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Flexible memberships for every team — Hot Desk, Dedicated Desk, Private Office and Enterprise. Compare plans and pricing.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership plans"
        title="Simple, flexible pricing"
        description="Choose the membership that fits today — and flex up or down as your team grows. No long lock-ins, no hidden fees."
      />

      {/* Plans */}
      <section className="container-px py-16 md:py-20">
        <PricingPlans />
      </section>

      {/* Comparison */}
      <section className="bg-sand/60 py-20 md:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Compare"
            title={<>Everything in every plan, side by side</>}
            description="A clear look at what's included so you can choose with confidence."
          />
          <div className="mt-10 rounded-2xl border border-border/70 bg-card p-2 md:p-4">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="container-px py-20 md:py-24">
        <div className="grid items-center gap-8 rounded-3xl border border-border/70 bg-card p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div className="flex items-start gap-5">
            <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
              <Building2 className="size-7" />
            </span>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                Need a custom workspace for 25+ people?
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Our enterprise team designs bespoke, branded floors with dedicated
                amenities, multi-city agreements and consolidated billing.
              </p>
            </div>
          </div>
          <LeadButton lead="sales" size="lg" className="w-full md:w-auto">
            Contact Sales
            <ArrowRight className="size-4" />
          </LeadButton>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/60 py-20 md:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title={<>Pricing questions, answered</>}
            description="Still curious? Reach out and our team will be glad to help."
          />
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
