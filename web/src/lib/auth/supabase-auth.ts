import { getSupabase } from "@/lib/supabase/client";
import type { AuthResponse, AuthUser } from "@/lib/auth/api";

export interface SupabaseAuthResult {
  ok: boolean;
  message?: string;
  data?: AuthResponse;
}

/**
 * Sign in with Supabase Auth (email + password) and resolve the app-level
 * session: the access/refresh tokens plus an {@link AuthUser} whose `roles`
 * come from the user's `profiles` row. Used by the admin sign-in flow.
 */
export async function signInWithSupabase(
  email: string,
  password: string
): Promise<SupabaseAuthResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session || !data.user) {
    return { ok: false, message: error?.message ?? "Invalid email or password." };
  }

  // Role + names live in the profile row (readable under RLS now that we're
  // signed in). Fall back to the JWT user metadata if the row is missing.
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, display_name, avatar_url, role, is_active")
    .eq("id", data.user.id)
    .single();

  const meta = (data.user.user_metadata ?? {}) as Record<string, string>;
  const firstName = profile?.first_name || meta.first_name || "";
  const lastName = profile?.last_name || meta.last_name || "";
  const role = profile?.role || meta.role || "Member";
  const userEmail = data.user.email ?? email;

  const user: AuthUser = {
    id: data.user.id,
    email: userEmail,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim() || userEmail,
    displayName: profile?.display_name || null,
    avatarUrl: profile?.avatar_url || null,
    isActive: profile?.is_active ?? true,
    emailConfirmed: Boolean(data.user.email_confirmed_at),
    roles: [role],
  };

  return {
    ok: true,
    data: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      accessTokenExpiresAt: new Date(
        (data.session.expires_at ?? 0) * 1000
      ).toISOString(),
      user,
    },
  };
}

/** Clear the Supabase session (call alongside the local logout). */
export async function signOutSupabase(): Promise<void> {
  await getSupabase()?.auth.signOut();
}
