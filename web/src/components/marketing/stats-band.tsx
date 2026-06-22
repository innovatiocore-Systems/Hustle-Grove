import { MapPin, Users, TrendingUp, Star } from "lucide-react";

import { Counter } from "@/components/marketing/counter";

const stats = [
  {
    icon: MapPin,
    value: "24",
    label: "Locations",
    sub: "Across 9 cities",
  },
  {
    icon: Users,
    value: "6,400+",
    label: "Members",
    sub: "Growing community",
  },
  {
    icon: TrendingUp,
    value: "94%",
    label: "Member Retention",
    sub: "Love where they work",
  },
  {
    icon: Star,
    value: "4.8",
    label: "Google Rating",
    sub: "From 500+ reviews",
  },
];

export function StatsBand() {
  return (
    <section className="container-px py-6">
      <div className="bg-stats-gradient overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="lg:px-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 font-display text-4xl text-white md:text-5xl">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-1 font-semibold text-white">{stat.label}</p>
                <p className="text-sm text-white/60">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
