import type { Amenity } from "@/lib/types";

export function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon;
  return (
    <div className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/30">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="font-semibold text-foreground">{amenity.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {amenity.description}
        </p>
      </div>
    </div>
  );
}
