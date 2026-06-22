import { member } from "@/data/dashboard";
import { Badge } from "@/components/ui/badge";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, company and notification settings.
        </p>
      </div>

      {/* Identity header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-gradient text-xl font-semibold text-white">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <p className="font-display text-xl text-foreground">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{member.plan}</Badge>
          <Badge variant="muted">Member since {member.memberSince}</Badge>
        </div>
      </div>

      <ProfileTabs />
    </div>
  );
}
