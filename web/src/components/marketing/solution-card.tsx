import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Solution } from "@/lib/types";
import { cn } from "@/lib/utils";

const accents = [
  "bg-violet",
  "bg-primary",
  "bg-teal-500",
  "bg-orange-500",
];

export function SolutionCard({
  solution,
  index = 0,
}: {
  solution: Solution;
  index?: number;
}) {
  const Icon = solution.icon;
  const accent = accents[index % accents.length];
  return (
    <Link
      href="/locations"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={solution.image}
          alt={solution.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        <span
          className={cn(
            "absolute left-4 top-4 flex size-12 items-center justify-center rounded-full text-white shadow-lg",
            accent
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground">
          {solution.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {solution.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
          <span className="text-sm text-muted-foreground">
            From{" "}
            <span className="font-semibold text-primary">
              ${solution.startingPrice}
            </span>{" "}
            {solution.priceUnit}
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-brand-gradient group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
