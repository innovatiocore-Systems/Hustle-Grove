import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

const NOT_CONFIGURED = "Supabase isn't configured.";
const NO_SESSION =
  "Your admin session has expired. Please sign out and sign in again.";

/**
 * Returns the client only once its auth session is restored. supabase-js loads
 * the persisted session asynchronously, so calling an authenticated write too
 * early sends it as `anon` and RLS rejects it. Awaiting `getSession()` forces
 * initialization and guarantees the JWT is attached.
 */
async function getAuthedClient(): Promise<
  | { ok: true; supabase: SupabaseClient<Database> }
  | { ok: false; message: string }
> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: NOT_CONFIGURED };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { ok: false, message: NO_SESSION };

  return { ok: true, supabase };
}

export interface SettingsResult {
  ok: boolean;
  message?: string;
}

/** Persist the editable branding fields (admin-only via RLS). */
export async function updateSiteSettings(input: {
  name: string;
  address: string;
  logoUrl: string | null;
  logoSize: number;
  popupEnabled: boolean;
  popupTitle: string;
  popupMessage: string;
}): Promise<SettingsResult> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const { error } = await authed.supabase
    .from("site_settings")
    .update({
      name: input.name,
      address: input.address,
      logo_url: input.logoUrl,
      logo_size: input.logoSize,
      popup_enabled: input.popupEnabled,
      popup_title: input.popupTitle,
      popup_message: input.popupMessage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

/** Upload a logo image to the public `branding` bucket; returns its URL. */
export async function uploadLogo(
  file: File
): Promise<{ ok: boolean; url?: string; message?: string }> {
  const authed = await getAuthedClient();
  if (!authed.ok) return { ok: false, message: authed.message };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `logo-${Date.now()}.${ext}`;

  const { error } = await authed.supabase.storage
    .from("branding")
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (error) return { ok: false, message: error.message };

  const { data } = authed.supabase.storage.from("branding").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
