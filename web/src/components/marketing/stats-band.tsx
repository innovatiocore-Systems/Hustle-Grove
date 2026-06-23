import { Building2, Users, Star, Trophy } from "lucide-react";

import { Counter } from "@/components/marketing/counter";

const stats = [
  {
    icon: Building2,
    value: "24+",
    label: "Prime Locations",
  },
  {
    icon: Users,
    value: "6,400+",
    label: "Happy Members",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Member Rating",
  },
  {
    icon: Trophy,
    value: "Award-Winning",
    label: "Workspaces",
  },
];

export function StatsBand() {
  return (
    <section className="container-px py-6">
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-7 shadow-sm md:px-10 md:py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border/70">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
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
