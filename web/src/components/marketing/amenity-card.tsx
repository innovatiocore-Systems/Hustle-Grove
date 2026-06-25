import type { Amenity } from "@/lib/types";

export function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon;
  return (
    <div className="glass-card glass-interactive group flex gap-4 rounded-2xl p-6">
      <span className="icon-chip flex size-12 shrink-0 items-center justify-center rounded-2xl text-primary ring-1 ring-primary/15 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/30">
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
