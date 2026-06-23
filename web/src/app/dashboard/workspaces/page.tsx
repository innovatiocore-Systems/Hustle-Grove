import { Building2, MapPin, Check } from "lucide-react";

import { member } from "@/data/dashboard";
import { locations, cities } from "@/data/locations";
import { solutions } from "@/data/solutions";
import { Badge } from "@/components/ui/badge";
import { CatalogExplorer } from "@/components/dashboard/catalog-explorer";

export default function WorkspacesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Workspaces</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your plan and the spaces available across the Hustle Grove network.
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-2xl border border-border/70 bg-card p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Your membership</p>
              <p className="font-display text-xl text-foreground">
                {member.plan}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            Home location: {member.homeLocation}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-5">
          {solutions.map((s) => (
            <Badge key={s.slug} variant="muted" className="px-3 py-1.5">
              <Check className="size-3.5" />
              {s.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Workspace catalog */}
      <div>
        <h2 className="font-semibold text-foreground">Workspace catalog</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Your membership gives you access to every location below.
        </p>
        <CatalogExplorer locations={locations} cities={cities} />
      </div>
    </div>
  );
}
