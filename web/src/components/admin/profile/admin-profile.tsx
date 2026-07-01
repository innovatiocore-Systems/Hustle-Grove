"use client";

import { useProfile } from "@/lib/profile/use-profile";
import { ErrorState } from "@/components/states/states";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileInfoCard } from "@/components/admin/profile/profile-info-card";
import { ChangePasswordCard } from "@/components/admin/profile/change-password-card";
import { ChangeEmailCard } from "@/components/admin/profile/change-email-card";
import { PreferencesCard } from "@/components/admin/profile/preferences-card";

function SectionSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-2 h-4 w-64" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminProfile() {
  const { profile, loading, error, reload, patch } = useProfile();

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionSkeleton rows={3} />
        <SectionSkeleton />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <ErrorState
        description={error ?? "We couldn't load your profile."}
        onRetry={reload}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProfileInfoCard profile={profile} onSaved={patch} />
      <ChangePasswordCard />
      <ChangeEmailCard currentEmail={profile.email} />
      <PreferencesCard profile={profile} onSaved={patch} />
    </div>
  );
}
