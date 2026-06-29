import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { locations } from "@/data/locations";
import { getSiteSettings } from "@/lib/settings/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = ["", "/about", "/pricing", "/contact", "/locations"];
  if (settings.resourcesVisible) staticPaths.push("/resources");

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...locationEntries];
}
