import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  CalendarCheck,
  Building2,
  CreditCard,
  User,
  Settings,
  LogOut,
  Bell,
  CalendarClock,
  Activity,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const miniStats = [
  { value: "2", label: "Upcoming Bookings", icon: CalendarClock },
  { value: "3", label: "Active Bookings", icon: CalendarCheck },
  { value: "1", label: "Upcoming Visit", icon: CheckCircle2 },
  { value: "4", label: "Invoices Outstanding", icon: CreditCard },
];

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Bookings", icon: CalendarCheck },
  { label: "Workspaces", icon: Building2 },
  { label: "Invoices", icon: CreditCard },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

const activity = [
  { title: "Invoice INV-1024", meta: "Paid", date: "May 13, 2025", badge: "success" as const },
  { title: "Booking Confirmed", meta: "Meeting Room A", date: "May 10, 2025" },
  { title: "Check-in", meta: "Hustle Grove Downtown", date: "May 9, 2025" },
];

export function DashboardPreview() {
  return (
    <section className="container-px py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Copy */}
        <div>
          <span className="eyebrow">Member Dashboard</span>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
            Everything you need, in one place
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Manage bookings, view invoices, and discover new spaces — all from
            your personal dashboard.
          </p>
          <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Mock dashboard */}
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl shadow-primary/10">
          <div className="flex">
            {/* Mini sidebar */}
            <div className="hidden w-44 shrink-0 flex-col bg-sidebar p-3 md:flex">
              <div className="px-2 py-2 font-display text-sm text-white">
                Hustle Grove
              </div>
              <div className="mt-2 space-y-0.5">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium",
                        item.active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-white/60"
                      )}
                    >
                      <Icon className="size-3.5" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
              <div className="mt-auto flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-white/60">
                <LogOut className="size-3.5" />
                Log out
              </div>
            </div>

            {/* Main */}
            <div className="min-w-0 flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-lg text-foreground">
                    Good morning, Alex 👋
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Here&apos;s what&apos;s happening today.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-8 items-center justify-center rounded-full bg-muted text-foreground">
                    <Bell className="size-4" />
                    <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-violet" />
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                    AC
                  </span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {miniStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border/70 bg-background p-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl text-foreground">
                          {s.value}
                        </span>
                        <Icon className="size-4 text-primary" />
                      </div>
                      <p className="mt-0.5 text-[0.65rem] leading-tight text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Panels */}
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-xl border border-border/70 bg-background p-3">
                  <p className="text-xs font-semibold text-foreground">
                    Upcoming Booking
                  </p>
                  <div className="mt-2.5 flex gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarClock className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">
                        Meeting Room A
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">
                        Tomorrow, 10:00 AM – 12:00 PM
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">
                        Hustle Grove Downtown
                      </p>
                    </div>
                  </div>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-[0.65rem] font-semibold text-primary">
                    View Booking
                    <ArrowRight className="size-3" />
                  </span>
                </div>

                <div className="rounded-xl border border-border/70 bg-background p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Activity className="size-3.5 text-primary" />
                    Recent Activity
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {activity.map((a) => (
                      <div
                        key={a.title}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 truncate text-[0.7rem] font-medium text-foreground">
                            {a.title}
                            {a.badge && (
                              <Badge variant="success" className="px-1.5 py-0 text-[0.6rem]">
                                {a.meta}
                              </Badge>
                            )}
                          </p>
                          {!a.badge && (
                            <p className="truncate text-[0.65rem] text-muted-foreground">
                              {a.meta}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-[0.6rem] text-muted-foreground">
                          {a.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
