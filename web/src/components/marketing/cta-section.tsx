import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-px py-20 md:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-sidebar px-8 py-16 md:px-16 md:py-20">
        {/* Decorative glow */}
        <div className="animate-glow pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet/30 blur-3xl" />
        <div className="animate-glow anim-delay-500 pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-white/70">
            <span className="h-px w-6 bg-violet" />
            Ready when you are
          </span>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Find your team a workspace worth showing up for
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Book a private tour and we&apos;ll tailor a workspace to your team —
            no pressure, no commitment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "solid", size: "lg" }), "bg-white text-primary hover:bg-white/90")}
            >
              Inquire Now
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/locations"
              className={cn(
                buttonVariants({ variant: "outline-light", size: "lg" })
              )}
            >
              Explore Spaces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
