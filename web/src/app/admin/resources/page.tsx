import { getSiteSettings } from "@/lib/settings/server";
import { ResourcesManager } from "@/components/admin/resources-manager";

export const metadata = { title: "Resources — Hustle Grove Admin" };

export default async function AdminResourcesPage() {
  const { resourcesVisible } = await getSiteSettings();
  return <ResourcesManager initialResourcesVisible={resourcesVisible} />;
}
