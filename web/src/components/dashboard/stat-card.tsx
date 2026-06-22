import { TrendingUp, TrendingDown } from "lucide-react";

import type { DashboardStat } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DashboardStatCard({ stat }: { stat: DashboardStat }) {
  const Icon = stat.icon;
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        {stat.delta && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              stat.trend === "up" && "text-emerald-600",
              stat.trend === "down" && "text-amber-600",
              !stat.trend && "text-muted-foreground"
            )}
          >
            {stat.trend === "up" && <TrendingUp className="size-3.5" />}
            {stat.trend === "down" && <TrendingDown className="size-3.5" />}
            {stat.delta}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl text-foreground">{stat.value}</p>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
