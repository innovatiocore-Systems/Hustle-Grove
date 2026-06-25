import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CalendarDays, CalendarRange, ArrowRight, MapPin } from "lucide-react";

import { faqs } from "@/data/faqs";
import { meetingRoomRates } from "@/data/plans";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { Accordion } from "@/components/ui/accordion";
import { LeadButton } from "@/components/lead/lead-button";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Flexible memberships for every team — Hot Desk, Dedicated Desk, Private Office and Virtual Office. Compare plans and pricing.",
};

const suites = [
  { name: "Suite A", capacity: "2 persons", price: "$1,250 / month" },
  { name: "Suite B", capacity: "2 persons", price: "$1,250 / month" },
  { name: "Suite C", capacity: "3 persons", price: "$1,550 / month" },
  { name: "Suite D", capacity: "4 persons", price: "$1,850 / month" },
  { name: "Suite E", capacity: "4 persons", price: "$1,850 / month" },
  { name: "Suite F", capacity: "6 persons", price: "$2,500 / month" },
];

const rateIcons = [Clock, CalendarDays, CalendarRange];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership plans"
        title="Simple, flexible pricing"
        description="Choose the membership that fits today — and flex up or down as your team grows. All prices in AUD. No hidden fees."
      />

      {/* Plans */}
      <section className="container-px py-16 md:py-20">
        <PricingPlans />
      </section>

      {/* Private Office Suite Breakdown */}
      <section className="container-px pb-16 md:pb-20">
        <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading
              eyebrow="Private Offices"
              title={<>Suite pricing & availability</>}
              description="Six lockable suites on Level 4 — pick the size that fits your team."
            />
            <Link
              href="/locations"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border/70 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <MapPin className="size-4" />
              View floor plan
            </Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-border/70">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60">
                  <th className="px-5 py-3 text-left font-semibold text-foreground">Suite</th>
                  <th className="px-5 py-3 text-left font-semibold text-foreground">Capacity</th>
                  <th className="px-5 py-3 text-right font-semibold text-foreground">Monthly Price (AUD)</th>
                </tr>
              </thead>
              <tbody>
                {suites.map((s, i) => (
                  <tr key={s.name} className={i < suites.length - 1 ? "border-b border-border/60" : ""}>
                    <td className="px-5 py-3.5 font-medium text-foreground">{s.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{s.capacity}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-foreground">{s.price}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-primary/5">
                  <td colSpan={2} className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    Total potential suite revenue
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm font-bold text-primary">
                    ≈ AUD $10,250 / month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            All suites are fully furnished with ergonomic workstations, high-speed Wi-Fi and 24/7 secure access.
          </p>
        </div>
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
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Members receive 5–unlimited complimentary hours per month depending on plan.
          </p>
        </div>
      </section>

      {/* Enquire CTA */}
      <section className="container-px pb-20 md:pb-24">
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
