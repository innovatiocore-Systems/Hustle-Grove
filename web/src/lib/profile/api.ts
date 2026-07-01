import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { mapProfile, type DateFormat, type Profile } from "@/lib/profile/types";

const NOT_CONFIGURED = "Supabase isn't configured.";
const NO_SESSION =
  "Your session has expired. Please sign out and sign in again.";

/**
 * Returns the browser client only once its persisted auth session is restored,
 * plus the current user. Mirrors the guard in `src/lib/settings/api.ts`.
 *
 * IMPORTANT: use `getSession()` (not `getUser()`). supabase-js resolves the
 * token for Storage/PostgREST via `getSession()` and falls back to the anon /
 * publishable key when the in-memory session isn't primed. `getUser()` only
 * validates over the network without hydrating that session, so a subsequent
 * `storage.upload` could go out as `anon` and RLS would reject it. Calling
 * `getSession()` here primes the session the upload relies on.
 */
async function getAuthedClient(): Promise<
  | {
      ok: true;
      supabase: SupabaseClient<Database>;
      user: {
        id: string;
        email: string;
        createdAt: string;
        lastLoginAt: string | null;
        emailConfirmed: boolean;
      };
    }
  | { ok: false; message: string }
> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: NOT_CONFIGURED };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) return { ok: false, message: NO_SESSION };

  const user = session.user;
  return {
    ok: true,
    supabase,
    user: {
      id: user.id,
      email: user.email ?? "",
      createdAt: user.created_at,
      lastLoginAt: user.last_sign_in_at ?? null,
      emailConfirmed: Boolean(user.email_confirmed_at),
    },
  };
}

export interface ProfileResult<T = undefined> {
  ok: boolean;
  message?: string;
  data?: T;
}

/** The current admin's profile (editable columns + read-only auth facts). */
export async function getProfile(): Promise<ProfileResult<Profile>> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const { data, error } = await authed.supabase
    .from("profiles")
    .select("*")
    .eq("id", authed.user.id)
    .single();

  if (error) return { ok: false, message: error.message };

  return {
    ok: true,
    data: mapProfile(data, {
      email: authed.user.email,
      createdAt: authed.user.createdAt,
      lastLoginAt: authed.user.lastLoginAt,
      emailConfirmed: authed.user.emailConfirmed,
    }),
  };
}

/** Persist the editable profile fields (role/is_active are frozen by a DB trigger). */
export async function updateProfile(input: {
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
  jobTitle: string;
  avatarUrl: string | null;
}): Promise<ProfileResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const { error } = await authed.supabase
    .from("profiles")
    .update({
      first_name: input.firstName,
      last_name: input.lastName,
      display_name: input.displayName,
      phone: input.phone,
      job_title: input.jobTitle,
      avatar_url: input.avatarUrl,
    })
    .eq("id", authed.user.id);

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

/** Persist personal preferences (timezone + date format). */
export async function updatePreferences(input: {
  timezone: string;
  dateFormat: DateFormat;
}): Promise<ProfileResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const { error } = await authed.supabase
    .from("profiles")
    .update({ timezone: input.timezone, date_format: input.dateFormat })
    .eq("id", authed.user.id);

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

/** Storage path of a previously uploaded avatar, derived from its public URL. */
function avatarPathFromUrl(url: string | null): string | null {
  if (!url) return null;
  const marker = "/avatars/";
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

/**
 * Upload a new avatar to the user's own folder in the public `avatars` bucket
 * and return its public URL. Best-effort removes the previous object so we don't
 * accumulate orphans when replacing.
 */
export async function uploadAvatar(
  file: File,
  previousUrl: string | null
): Promise<ProfileResult<string>> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${authed.user.id}/avatar-${Date.now()}.${ext}`;

  // `upsert:false` — each filename is unique (timestamped), so there's never a
  // conflict. Upsert issues an INSERT..ON CONFLICT that also evaluates the
  // UPDATE storage policy and is rejected by our owner-folder RLS; a plain
  // insert passes cleanly. The previous object is removed below instead.
  const { error } = await authed.supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: false, cacheControl: "3600" });
  if (error) return { ok: false, message: error.message };

  const prev = avatarPathFromUrl(previousUrl);
  if (prev && prev !== path) {
    await authed.supabase.storage.from("avatars").remove([prev]);
  }

  const { data } = authed.supabase.storage.from("avatars").getPublicUrl(path);
  return { ok: true, data: data.publicUrl };
}

/** Best-effort delete of the stored avatar object (used by "Remove" on save). */
export async function deleteAvatarObject(
  url: string | null
): Promise<ProfileResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const path = avatarPathFromUrl(url);
  if (!path) return { ok: true };

  const { error } = await authed.supabase.storage.from("avatars").remove([path]);
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

/**
 * Re-authenticate the user with their current password, then set a new one.
 * Supabase has no dedicated re-auth for password changes, so a fresh
 * `signInWithPassword` is the canonical way to prove the current credential.
 */
export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<ProfileResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const { error: reauthError } = await authed.supabase.auth.signInWithPassword({
    email: authed.user.email,
    password: input.currentPassword,
  });
  if (reauthError) {
    return { ok: false, message: "Current password is incorrect." };
  }

  const { error } = await authed.supabase.auth.updateUser({
    password: input.newPassword,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

/**
 * Re-authenticate, then request an email change. Supabase sends a confirmation
 * link to the new address; the change only takes effect once confirmed.
 */
export async function changeEmail(input: {
  newEmail: string;
  currentPassword: string;
}): Promise<ProfileResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  if (input.newEmail.toLowerCase() === authed.user.email.toLowerCase()) {
    return { ok: false, message: "That's already your email address." };
  }

  const { error: reauthError } = await authed.supabase.auth.signInWithPassword({
    email: authed.user.email,
    password: input.currentPassword,
  });
  if (reauthError) {
    return { ok: false, message: "Current password is incorrect." };
  }

  const { error } = await authed.supabase.auth.updateUser({
    email: input.newEmail,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}
