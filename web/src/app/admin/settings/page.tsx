import { AdminSettings } from "@/components/admin/admin-settings";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage organisation, billing and notification preferences.
        </p>
      </div>
      <AdminSettings />
    </div>
  );
}
