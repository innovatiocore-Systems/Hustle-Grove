import { ArrowRight, Check, DoorClosed, Headphones, Monitor, Users } from "lucide-react";

import type { Plan } from "@/data/plans";
import { LeadButton } from "@/components/lead/lead-button";

const icons: Record<string, typeof Monitor> = {
  "dedicated-desk": Monitor,
  "private-office": DoorClosed,
  "meeting-room": Users,
  "soundproof-booth": Headphones,
};

export function PricingCard({ plan }: { plan: Plan }) {
  const Icon = icons[plan.slug] ?? Monitor;

  return (
    <div className="group relative flex flex-col rounded-3xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>

      <h3 className="mt-6 font-display text-2xl text-foreground">{plan.name}</h3>
      <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted-foreground">
        {plan.tagline}
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-border/70 pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Price on enquiry
      </p>
      <LeadButton lead="tour" variant="outline" className="mt-3 w-full">
        Enquire
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </LeadButton>
    </div>
  );
}
