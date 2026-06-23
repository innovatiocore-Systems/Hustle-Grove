"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  CreditCard,
  User,
  Search,
  Bell,
  Menu,
  X,
  ArrowLeft,
  LogOut,
  Settings,
  CalendarClock,
  FileText,
  Megaphone,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { member } from "@/data/dashboard";
import { useAuth } from "@/lib/auth/auth-context";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    icon: CalendarClock,
    title: "Booking confirmed",
    body: "Meeting Room A · Tomorrow, 10:00 AM",
    time: "2 hours ago",
  },
  {
    icon: FileText,
    title: "Invoice INV-10428 is due",
    body: "$520 due in 6 days",
    time: "Yesterday",
  },
  {
    icon: Megaphone,
    title: "New: South Lake Union is open",
    body: "Members get 20% off the first month",
    time: "2 days ago",
  },
];

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "Membership", href: "/dashboard/membership", icon: Sparkles },
  { label: "Workspaces", href: "/dashboard/workspaces", icon: Building2 },
  { label: "Invoices", href: "/dashboard/invoices", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

function SidebarContent({
  pathname,
  onSignOut,
}: {
  pathname: string;
  onSignOut: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-18 items-center px-6">
        <Logo variant="light" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-semibold text-white">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {member.name}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/55">
              {member.company}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        >
          <LogOut className="size-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close the mobile nav whenever the route changes (set-during-render to
  // avoid a setState-in-effect cascade).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const signOut = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen bg-sidebar lg:block">
        <SidebarContent pathname={pathname} onSignOut={signOut} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-sidebar">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-5 flex size-9 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <X className="size-5" />
            </button>
            <SidebarContent pathname={pathname} onSignOut={signOut} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 flex h-18 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search bookings, spaces…"
              className="h-10 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
            >
              <ArrowLeft className="size-4" />
              Back to site
            </Link>
            <ThemeToggle />

            <DropdownMenu
              trigger={
                <span className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted">
                  <Bell className="size-5" />
                  <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-violet ring-2 ring-background" />
                </span>
              }
              panelClassName="w-80"
            >
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-semibold text-foreground">
                  Notifications
                </span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {notifications.length} new
                </span>
              </div>
              <DropdownSeparator />
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.title}
                    className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-muted"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {n.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {n.body}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
                        {n.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </DropdownMenu>

            <DropdownMenu
              trigger={
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient font-semibold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              }
            >
              <DropdownLabel>
                <p className="text-sm font-medium text-foreground">{member.name}</p>
                <p className="font-normal text-muted-foreground">{member.email}</p>
              </DropdownLabel>
              <DropdownSeparator />
              <DropdownItem onSelect={() => router.push("/dashboard/profile")}>
                <User />
                Profile
              </DropdownItem>
              <DropdownItem onSelect={() => router.push("/dashboard/invoices")}>
                <CreditCard />
                Billing
              </DropdownItem>
              <DropdownItem onSelect={() => router.push("/dashboard")}>
                <Settings />
                Settings
              </DropdownItem>
              <DropdownItem onSelect={() => router.push("/admin")}>
                <LayoutDashboard />
                Admin portal
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onSelect={signOut}>
                <LogOut />
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
