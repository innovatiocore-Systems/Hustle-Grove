import type { Metadata } from "next";
import { Clock, CalendarDays, CalendarRange, ArrowRight } from "lucide-react";

import { meetingRoomRates } from "@/data/plans";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { LeadButton } from "@/components/lead/lead-button";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Flexible memberships for every team — Hot Desk, Dedicated Desk, Private Office and Virtual Office. Compare plans and pricing.",
};

const rateIcons = [Clock, CalendarDays, CalendarRange];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership plans"
        title="Simple, flexible pricing"
        description="Choose the membership that fits today — and flex up or down as your team grows. All prices in AUD."
      />

      {/* Plans */}
      <section className="container-px py-16 md:py-20">
        <PricingPlans />
      </section>

      {/* Meeting Room Rates */}
      <section className="bg-sand/60 py-16 md:py-20">
        <div className="container-px">
          <SectionHeading
            eyebrow="Meeting Room"
            title={<>Book by the hour or day</>}
            description="Our 10-seat boardroom is available to members and non-members. AV display included."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {meetingRoomRates.map((rate, i) => {
              const Icon = rateIcons[i];
              return (
                <div key={rate.label} className="rounded-2xl border border-border/70 bg-card p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-foreground">{rate.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-primary">
                    ${rate.price}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{rate.unit}</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{rate.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section className="container-px py-16 md:py-20">
        <div className="grid items-center gap-8 rounded-3xl border border-border/70 bg-card p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="font-display text-2xl text-foreground">
              Not sure which plan suits your team?
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Book a free 15-minute tour of the space and we&apos;ll recommend the right fit
              based on your team size and work style.
            </p>
          </div>
          <LeadButton lead="tour" size="lg" className="w-full md:w-auto">
            Book a free tour
            <ArrowRight className="size-4" />
          </LeadButton>
        </div>
      </section>
    </>
  );
}
