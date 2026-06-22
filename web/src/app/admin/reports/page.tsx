import * as React from "react";
import { DollarSign, TrendingUp, Receipt, Wallet } from "lucide-react";

import {
  revenueByMonth,
  bookingTrends,
  occupancySegments,
  utilization,
} from "@/data/admin";
import { KpiCard, type Kpi } from "@/components/charts/kpi-card";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/donut-chart";

const revenueKpis: Kpi[] = [
  { label: "MRR", value: "$486K", delta: "+12.4%", trend: "up", icon: DollarSign },
  { label: "ARR (run-rate)", value: "$5.8M", delta: "+18% YoY", trend: "up", icon: TrendingUp },
  { label: "Avg. revenue / member", value: "$758", delta: "+4.1%", trend: "up", icon: Wallet },
  { label: "Outstanding", value: "$1,080", delta: "2 invoices", trend: "down", icon: Receipt },
];

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6">
      <h2 className="font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Revenue dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Financial performance and reporting · last 6 months
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {revenueKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Revenue trend" subtitle="Monthly recurring revenue ($K)">
          <BarChart data={revenueByMonth} height={220} />
        </Panel>
        <Panel title="Bookings" subtitle="Monthly volume">
          <LineChart data={bookingTrends} id="reports-trends" height={220} />
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Occupancy mix" subtitle="Network-wide">
          <DonutChart
            segments={occupancySegments}
            centerLabel="87%"
            centerSub="occupied"
          />
        </Panel>
        <Panel title="Utilization by type">
          <div className="space-y-4">
            {utilization.map((u) => (
              <div key={u.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{u.label}</span>
                  <span className="font-medium text-muted-foreground">{u.value}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${u.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
