"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-context";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown-menu";

// The admin portal is intentionally scoped to two surfaces. Other module route
// files remain in the codebase but are not linked from the nav.
const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-18 items-center gap-2.5 px-6">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg text-white">
          H
        </span>
        <div className="leading-none">
          <p className="font-display text-base text-white">Hustle Grove</p>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
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
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        >
          <LogOut className="size-5" />
          Back to site
        </Link>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close the mobile nav whenever the route changes (set-during-render to
  // avoid a setState-in-effect cascade).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}` || "U"
    : "HG";

  const signOut = () => {
    logout();
    router.replace("/admin-login");
  };

  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-sidebar lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

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
            <SidebarContent pathname={pathname} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex h-18 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:block">
              Admin mode
            </span>
            <ThemeToggle />
            <DropdownMenu
              trigger={
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient font-semibold uppercase text-white">
                  {initials}
                </span>
              }
            >
              <DropdownLabel>
                <p className="text-sm font-medium text-foreground">
                  {user?.fullName ?? "Signed in"}
                </p>
                <p className="font-normal text-muted-foreground">{user?.email}</p>
              </DropdownLabel>
              <DropdownSeparator />
              <DropdownItem onSelect={() => router.push("/")}>
                <LayoutDashboard />
                Back to site
              </DropdownItem>
              <DropdownItem onSelect={signOut}>
                <LogOut />
                Log out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
