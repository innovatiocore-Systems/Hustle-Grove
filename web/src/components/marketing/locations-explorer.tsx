"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { Location } from "@/lib/types";
import { solutions } from "@/data/solutions";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { LocationCard } from "@/components/marketing/location-card";

export function LocationsExplorer({
  locations,
  cities,
}: {
  locations: Location[];
  cities: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("all");
  const [solution, setSolution] = React.useState("all");
  const [sort, setSort] = React.useState("recommended");

  const filtered = React.useMemo(() => {
    let result = locations.filter((l) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q);
      const matchesCity = city === "all" || l.city === city;
      const matchesSolution =
        solution === "all" || l.solutions.includes(solution as never);
      return matchesQuery && matchesCity && matchesSolution;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-low") return a.startingPrice - b.startingPrice;
      if (sort === "price-high") return b.startingPrice - a.startingPrice;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [locations, query, city, solution, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm md:p-5">
        <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, name or address"
              className="pl-10"
              aria-label="Search locations"
            />
          </div>
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Filter by city"
          >
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            aria-label="Filter by workspace type"
          >
            <option value="all">All workspace types</option>
            {solutions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort locations"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Highest rated</option>
          </Select>
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4" />
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "location" : "locations"}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/40 p-16 text-center">
          <p className="font-medium text-foreground">No locations found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
