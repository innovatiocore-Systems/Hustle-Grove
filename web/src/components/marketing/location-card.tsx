import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowRight } from "lucide-react";

import type { Location } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={location.image}
          alt={location.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {location.isNew && <Badge variant="gold">New</Badge>}
          {location.isPopular && <Badge>Popular</Badge>}
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
          <Star className="size-3.5 fill-gold text-gold" />
          {location.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            {location.name}
          </h3>
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {location.city}, {location.region}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {location.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-base font-semibold text-foreground">
              ${location.startingPrice}
              <span className="text-xs font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            View location
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
