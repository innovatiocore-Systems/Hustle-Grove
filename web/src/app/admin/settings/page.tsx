import { AdminSettings } from "@/components/admin/admin-settings";
import { getSiteSettings } from "@/lib/settings/server";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your site’s branding and contact details — logo, name,
          address, email, phone, and hours.
        </p>
      </div>
      <AdminSettings initial={settings} />
    </div>
  );
}
