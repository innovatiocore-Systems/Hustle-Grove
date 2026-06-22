"use client";

import * as React from "react";
import Link from "next/link";
import { Users, UserCheck, UserX, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

import { adminApi, type AdminDashboard } from "@/lib/api/admin";
import { cn } from "@/lib/utils";
import { KpiCard, type Kpi } from "@/components/charts/kpi-card";
import { ErrorState } from "@/components/states/states";

export function AdminOverview() {
  const [data, setData] = React.useState<AdminDashboard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.getDashboard();
    if (res.success && res.data) setData(res.data);
    else setError(res.message ?? "Failed to load dashboard.");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-24">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return <ErrorState description={error ?? "No data."} onRetry={load} />;
  }

  const maxRoleCount = Math.max(...data.usersByRole.map((r) => r.count), 1);

  const kpis: Kpi[] = [
    { label: "Total users", value: String(data.totalUsers), icon: Users },
    { label: "Active users", value: String(data.activeUsers), trend: "up", delta: `${Math.round((data.activeUsers / (data.totalUsers || 1)) * 100)}% of total`, icon: UserCheck },
    { label: "Inactive users", value: String(data.inactiveUsers), trend: data.inactiveUsers > 0 ? "down" : undefined, icon: UserX },
    { label: "Roles", value: String(data.usersByRole.length), icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live user statistics from the API
          </p>
        </div>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Manage users
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="font-semibold text-foreground">Users by role</h2>
        <p className="text-sm text-muted-foreground">
          Distribution across the {data.usersByRole.length} roles
        </p>
        <div className="mt-6 space-y-4">
          {data.usersByRole.map((r) => (
            <div key={r.role}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{r.role}</span>
                <span className="font-medium text-muted-foreground">
                  {r.count} {r.count === 1 ? "user" : "users"}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full bg-brand-gradient")}
                  style={{ width: `${(r.count / maxRoleCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
