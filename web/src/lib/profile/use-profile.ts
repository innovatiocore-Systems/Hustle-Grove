"use client";

import * as React from "react";

import { getProfile } from "@/lib/profile/api";
import type { Profile } from "@/lib/profile/types";

/**
 * Loads the signed-in admin's profile for every profile surface. Holds the
 * canonical `profile` in state; sub-forms persist via `lib/profile/api` and then
 * call `patch` to reflect the saved values locally without a full refetch.
 * Mirrors the shape/behaviour of `src/lib/inquiries/use-inquiries.ts`.
 */
export function useProfile() {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getProfile();
    if (res.ok && res.data) setProfile(res.data);
    else setError(res.message ?? "Failed to load your profile.");
    setLoading(false);
  }, []);

  // Initial fetch. State is only set after the await resolves, so this never
  // triggers a synchronous setState-in-effect cascade.
  React.useEffect(() => {
    let active = true;
    getProfile().then((res) => {
      if (!active) return;
      if (res.ok && res.data) setProfile(res.data);
      else setError(res.message ?? "Failed to load your profile.");
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  /** Merge saved fields into the local profile (post-save reflection). */
  const patch = React.useCallback((partial: Partial<Profile>) => {
    setProfile((p) => (p ? { ...p, ...partial } : p));
  }, []);

  return { profile, loading, error, reload: load, patch };
}
