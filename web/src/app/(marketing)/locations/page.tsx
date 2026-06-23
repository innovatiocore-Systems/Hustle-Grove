import type { Metadata } from "next";

import { locations, cities } from "@/data/locations";
import { PageHeader } from "@/components/marketing/page-header";
import { LocationsExplorer } from "@/components/marketing/locations-explorer";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Explore Hustle Grove Workspaces locations across the country. Search and filter premium coworking spaces by city and workspace type.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our locations"
        title="Find your team's next home"
        description="Premium, fully serviced workspaces in landmark buildings across 9 cities. Search, filter and book a tour in minutes."
      />
      <section className="container-px py-12 md:py-16">
        <LocationsExplorer locations={locations} cities={cities} />
      </section>
      <CtaSection />
    </>
  );
}
