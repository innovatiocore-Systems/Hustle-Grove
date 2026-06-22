"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, LayoutGrid, List, MapPin, Star, ArrowRight } from "lucide-react";

import type { Location } from "@/lib/types";
import { cn } from "@/lib/utils";
import { solutions } from "@/data/solutions";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { LocationCard } from "@/components/marketing/location-card";
import { EmptyState } from "@/components/states/states";

export function CatalogExplorer({
  locations,
  cities,
}: {
  locations: Location[];
  cities: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const filtered = React.useMemo(
    () =>
      locations.filter((l) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          l.name.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q);
        const matchesCity = city === "all" || l.city === city;
        const matchesType = type === "all" || l.solutions.includes(type as never);
        return matchesQuery && matchesCity && matchesType;
      }),
    [locations, query, city, type]
  );

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workspaces"
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <Select value={city} onChange={(e) => setCity(e.target.value)} className="sm:w-44">
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select value={type} onChange={(e) => setType(e.target.value)} className="sm:w-48">
            <option value="all">All types</option>
            {solutions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="inline-flex shrink-0 items-center rounded-xl border border-border bg-card p-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-label={`${v} view`}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg transition-colors",
                view === v ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
            >
              {v === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        workspaces
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          title="No workspaces found"
          description="Try adjusting your search or filters."
        />
      ) : view === "grid" ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((l) => (
            <LocationCard key={l.slug} location={l} />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((l) => (
            <Link
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-3 transition-colors hover:border-primary/40"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{l.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {l.city}, {l.region}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3.5 fill-gold text-gold" />
                  {l.rating} · from ${l.startingPrice}/mo
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
