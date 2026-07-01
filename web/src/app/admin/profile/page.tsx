import { AdminProfile } from "@/components/admin/profile/admin-profile";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account — personal details, photo, password, email, and
          preferences.
        </p>
      </div>
      <AdminProfile />
    </div>
  );
}
