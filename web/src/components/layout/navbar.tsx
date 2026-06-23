"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/features";
import { solutions } from "@/data/solutions";
import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import { LeadButton } from "@/components/lead/lead-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Memberships", href: "/pricing" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Collapse the menus when the route changes (set-during-render to avoid a
  // setState-in-effect cascade).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setSolutionsOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <nav className="container-px flex h-18 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive("/")
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/locations"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive("/locations")
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Locations
          </Link>

          {/* Solutions dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              aria-expanded={solutionsOpen}
            >
              Solutions
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  solutionsOpen && "rotate-180"
                )}
              />
            </button>
            {solutionsOpen && (
              <>
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setSolutionsOpen(false)}
                />
                <div className="absolute left-0 top-full z-10 mt-2 w-72 rounded-2xl border border-border bg-popover p-2 shadow-xl">
                  {solutions.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        href="/locations"
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {s.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {s.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {links.slice(2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.label !== "Memberships" && isActive(item.href)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Search (Ctrl K)"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="rounded border border-border bg-muted px-1.5 text-[0.65rem] font-medium">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          {FEATURES.memberAccess && (
            <Link
              href="/login"
              className="ml-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Member Login
            </Link>
          )}
          <LeadButton lead="tour" size="sm" className="gap-1.5">
            Book a Tour
            <ArrowRight className="size-4" />
          </LeadButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {FEATURES.memberAccess && (
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                >
                  Member Login
                </Link>
              )}
              <Link href="/contact" className={cn(buttonVariants(), "w-full")}>
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
