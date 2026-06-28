import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, Clock, Wifi, Car, Coffee, Shield, ArrowRight } from "lucide-react";

import { getSiteSettings } from "@/lib/settings/server";
import { PageHeader } from "@/components/marketing/page-header";
import { CtaSection } from "@/components/marketing/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Space",
  description:
    "Tour The Hustle Grove Workspace at LV4 University Ave, Canberra. Explore private suites, dedicated desks, meeting rooms and more.",
};

const spaces = [
  { label: "Private Suites", count: "6 rooms", desc: "Lockable offices from 8–15 sqm, furnished and ready on day one.", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { label: "Meeting Room", count: "10 seats", desc: "Fully equipped conference room with AV display and an oval boardroom table.", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { label: "Dedicated Desks", count: "14 stations", desc: "Permanent ergonomic workstations in a professional open-plan zone.", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { label: "Soundproof Booth", count: "1 shared", desc: "Acoustic pod for private calls, recordings and deep-focus work.", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { label: "Comms Room", count: "Restricted", desc: "On-site server racks and networking infrastructure.", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { label: "Entry Lounge", count: "Shared", desc: "Reception desk, lounge seating and premium barista-style coffee.", color: "bg-primary/10 text-primary" },
];

const amenities = [
  { icon: Wifi,     label: "Gigabit Wi-Fi" },
  { icon: Coffee,   label: "Barista coffee" },
  { icon: Car,      label: "Parking nearby" },
  { icon: Clock,    label: "24 / 7 member access" },
  { icon: Shield,   label: "Secure key-card entry" },
  { icon: Users,    label: "Networking events" },
];

export default async function LocationsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Our space"
        title="LV4 University Ave, Canberra"
        description="One premium floor. Every workspace type. Everything included — so you can focus on what matters."
      />

      {/* 2D Floor Plan */}
      <section className="container-px py-10 md:py-14">
        <div className="overflow-hidden rounded-3xl border border-border/70 shadow-2xl shadow-black/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/floor-plan-2d.png"
            alt="Hustle Grove 2D Floor Plan — Level 4, University Ave Canberra"
            className="w-full block"
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Level 4 · 6 private suites · 14 dedicated desks · 1 meeting room
        </p>
      </section>

      {/* Space breakdown */}
      <section className="container-px pb-16 md:pb-20">
        <h2 className="font-display text-2xl font-bold text-foreground">What&apos;s on the floor</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">~145 sqm across six distinct workspace zones.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/70 bg-card p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-lg font-bold text-foreground">{s.label}</p>
                <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", s.color)}>{s.count}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities + address */}
      <section className="bg-sand/60 py-16 md:py-20">
        <div className="container-px grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Everything included</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">No hidden extras. No setup fees.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {amenities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Find us</h2>
            <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="mt-0.5 font-medium text-foreground whitespace-pre-wrap">{settings.address}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours</p>
                <p className="mt-0.5 font-medium text-foreground">Mon–Fri 8am–6pm</p>
                <p className="text-sm text-muted-foreground">Members: 24 / 7 access</p>
              </div>
            </div>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "w-full justify-center mt-2")}>
              Book a free tour
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
