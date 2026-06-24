import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  LayoutGrid,
  Sparkles,
  Home,
  ShieldCheck,
  CalendarDays,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { img, avatar } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";

const featureCard = [
  { icon: Home, title: "Move-in Ready", sub: "Furnished spaces" },
  { icon: ShieldCheck, title: "All-Inclusive", sub: "Everything you need" },
  { icon: CalendarDays, title: "Flexible Terms", sub: "Month-to-month" },
  { icon: Users, title: "Community Driven", sub: "Events & networking" },
];

const avatars = [
  avatar("1500648767791-00dcc994a43e"),
  avatar("1494790108377-be9c29b29330"),
  avatar("1507003211169-0a1dd7228f2d"),
  avatar("1438761681033-6461ffad8d80"),
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-wash" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative container-px grid items-center gap-10 py-14 md:py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:py-20">
        {/* Left — copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="size-3.5" />
            Premium Workspaces
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[0.98] text-foreground sm:text-6xl md:text-7xl">
            Hustle your way.
            <br />
            Grove{" "}
            <span className="relative inline-block font-script font-normal text-violet">
              your way
              <svg
                className="absolute -bottom-2 left-0 w-full text-violet"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8C45 3 120 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-violet">.</span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
            Flexible offices, dedicated desks, and inspiring meeting rooms
            designed for modern teams to do their best work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Book a Tour
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/locations"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Explore Spaces
              <LayoutGrid className="size-4" />
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by{" "}
              <span className="font-semibold text-foreground">
                6,400+ professionals
              </span>
              <br className="hidden sm:block" /> across{" "}
              <span className="font-semibold text-foreground">24 locations</span>
            </p>
          </div>
        </div>

        {/* Right — dark panel + floating feature card */}
        <div className="relative lg:pr-6">
          {/* Dot decoration top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 z-0 hidden h-20 w-20 lg:block"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.52 0.105 140 / 0.45) 1.5px, transparent 1.5px)",
              backgroundSize: "11px 11px",
            }}
          />

          {/* Dark panel */}
          <div
            className="relative z-10 aspect-[4/3.4] overflow-hidden rounded-3xl shadow-2xl shadow-black/30 sm:aspect-[4/3] lg:aspect-[4/3.4]"
            style={{ background: "oklch(0.14 0.009 135)" }}
          >
            {/* Lounge photo tinted as background texture */}
            <Image
              src={img("1497366754035-f200968a6e72", 1100, 1000)}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover opacity-30 mix-blend-luminosity"
            />

            {/* Brand badge centered */}
            <div className="absolute inset-0 flex items-center justify-center p-10 pb-24">
              <Image
                src="/hero-badge.png"
                alt="The Hustle Grove Workspace"
                width={340}
                height={340}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Bottom tagline strip */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-white/10 bg-black/55 px-5 py-4 backdrop-blur-sm">
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Secure. Professional. Productive.
                </p>
                <p className="text-xs text-white/55">
                  Everything you need to grow your business.
                </p>
              </div>
            </div>
          </div>

          {/* Floating feature card — right edge */}
          <div className="absolute -bottom-6 right-0 z-20 w-60 rounded-2xl border border-border/70 bg-background/96 p-3 shadow-2xl backdrop-blur-sm sm:-bottom-auto sm:right-0 sm:top-1/2 sm:-translate-y-1/2 lg:-right-2">
            <div className="divide-y divide-border/60">
              {featureCard.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3 p-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {item.sub}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
