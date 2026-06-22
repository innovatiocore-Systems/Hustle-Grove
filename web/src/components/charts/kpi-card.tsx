import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Kpi {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon;
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{kpi.label}</span>
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl text-foreground">{kpi.value}</p>
      {kpi.delta && (
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            kpi.trend === "up" && "text-emerald-600",
            kpi.trend === "down" && "text-red-600",
            !kpi.trend && "text-muted-foreground"
          )}
        >
          {kpi.trend === "up" && <TrendingUp className="size-3.5" />}
          {kpi.trend === "down" && <TrendingDown className="size-3.5" />}
          {kpi.delta}
        </p>
      )}
    </div>
  );
}
