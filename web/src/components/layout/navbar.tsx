"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/features";
import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import { LeadButton } from "@/components/lead/lead-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const BASE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ resourcesVisible = true }: { resourcesVisible?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const links = resourcesVisible
    ? BASE_LINKS
    : BASE_LINKS.filter((l) => l.href !== "/resources");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 -mb-[76px] w-full px-4 pt-3 sm:-mb-[92px] sm:pt-5">
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:h-18 sm:px-6",
          scrolled
            ? "border-border/70 bg-background/90 shadow-lg shadow-black/5 backdrop-blur-md"
            : "border-border/50 bg-background/70 shadow-sm backdrop-blur-sm"
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {FEATURES.memberAccess && (
            <Link
              href="/login"
              className="ml-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Member Login
            </Link>
          )}
          <LeadButton lead="tour" size="sm" className="ml-1 gap-1.5 rounded-full px-5">
            Enquire Now
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
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/70 bg-background shadow-lg lg:hidden">
          <div className="flex flex-col gap-1 p-4">
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
              <LeadButton lead="tour" className="w-full">
                Enquire Now
              </LeadButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
