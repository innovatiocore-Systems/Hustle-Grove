import type { Metadata } from "next";
import { MapPin, Users, Clock, Wifi, Car, Shield, ArrowRight, LayoutGrid, Navigation, ExternalLink } from "lucide-react";

import { getSiteSettings } from "@/lib/settings/server";
import { PageHeader } from "@/components/marketing/page-header";
import { CtaSection } from "@/components/marketing/cta-section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeadButton } from "@/components/lead/lead-button";
import { ZoomableImage } from "@/components/marketing/zoomable-image";
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
  { icon: Wifi,   label: "Gigabit Wi-Fi",         desc: "Fast, reliable connectivity across the entire floor." },
  { icon: Car,    label: "Parking nearby",        desc: "Convenient parking just moments from the door." },
  { icon: Shield, label: "Secure key-card entry", desc: "Monitored, key-card access around the clock." },
  { icon: Users,  label: "Networking events",     desc: "Regular member mixers and community nights." },
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.051427834239!2d149.1231730766086!3d-35.279847593521524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b164d426070001d%3A0x2c16216b7ef71df9!2slevel%204%2F28%20University%20Ave%2C%20Canberra%20ACT%202601%2C%20Australia!5e0!3m2!1sen!2snp!4v1782299287785!5m2!1sen!2snp";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Level+4+1+University+Avenue+Canberra+ACT+2601";

export default async function LocationsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Our space"
        title="LV4 University Ave, Canberra"
        highlight="Canberra"
        icon={MapPin}
        chips={["Level 4", "~145 sqm", "6 private suites", "24/7 member access"]}
        description="One premium floor. Every workspace type. Everything included — so you can focus on what matters."
      />

      {/* 2D Floor Plan */}
      <section className="container-px py-16 md:py-20">
        <div className="mb-10 flex flex-col items-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LayoutGrid className="size-5" />
          </span>
          <SectionHeading
            eyebrow="Workspace plan"
            title={<>Every zone, planned around your work</>}
            description="Explore our entire Level 4 floor — private suites, dedicated desks, a meeting room and shared lounges — and see exactly where you'll do your best work."
            align="center"
          />
        </div>
        <ZoomableImage
          src="/floor-plan-2d.png"
          alt="Hustle Grove 2D Floor Plan — Level 4, University Ave Canberra"
          wrapperClassName="overflow-hidden rounded-3xl border border-border/70 shadow-2xl shadow-black/20"
          className="block w-full"
          landscapeOnMobile
        />
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
      <section className="bg-sand/60 py-16 md:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Amenities"
              title={<>Everything included</>}
              description="Show up and get to work — the essentials are handled, with the extras that make the day better."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {amenities.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Visit"
              title={<>Find us</>}
              description="One premium floor in the heart of Canberra's city centre."
            />
            <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/5">
              <div className="relative">
                <iframe
                  src={MAP_EMBED}
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Hustle Grove location"
                  className="block h-60 w-full"
                />
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-blue-600 shadow"
                >
                  Open in Maps
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-4 border-b border-border/70 bg-muted/40 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{settings.name}</p>
                  <p className="text-sm text-muted-foreground">Level 4 · University Ave, Canberra</p>
                </div>
              </div>
              <div className="flex gap-4 border-b border-border/70 p-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</p>
                  <p className="mt-1 whitespace-pre-wrap font-medium text-foreground">{settings.address}</p>
                </div>
              </div>
              <div className="flex gap-4 border-b border-border/70 p-5">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours</p>
                  <p className="mt-1 font-medium text-foreground">Mon–Fri 8am–6pm</p>
                  <p className="text-sm text-muted-foreground">Members: 24 / 7 access</p>
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                <LeadButton lead="tour" size="lg" className="w-full">
                  Book a free tour
                  <ArrowRight className="size-4" />
                </LeadButton>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
                >
                  Get directions
                  <Navigation className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
