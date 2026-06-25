import { Building2, Users, Star, LayoutGrid } from "lucide-react";

import { Counter } from "@/components/marketing/counter";

const stats = [
  {
    icon: LayoutGrid,
    value: "~145 sqm",
    label: "Premium Floor Space",
  },
  {
    icon: Building2,
    value: "21",
    label: "Workspaces Available",
  },
  {
    icon: Users,
    value: "40+",
    label: "Active Members",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Member Rating",
  },
];

export function StatsBand() {
  return (
    <section className="container-px py-6">
      <div className="glass-card overflow-hidden rounded-3xl px-6 py-7 md:px-8 md:py-9">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/5 lg:px-6"
              >
                <span className="icon-chip flex size-12 shrink-0 items-center justify-center rounded-2xl text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-brand-gradient font-display text-2xl font-bold md:text-3xl">
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
