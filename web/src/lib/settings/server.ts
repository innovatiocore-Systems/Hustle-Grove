import "server-only";

import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/lib/settings/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cache tag — invalidate via {@link revalidateSiteSettings} after an edit. */
export const SITE_SETTINGS_TAG = "site-settings";

interface SiteSettingsRow {
  name: string;
  address: string;
  logo_url: string | null;
  logo_size: number | null;
  popup_enabled: boolean | null;
  popup_title: string | null;
  popup_message: string | null;
  resources_visible: boolean | null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!url || !anonKey) return DEFAULT_SITE_SETTINGS;

  try {
    const res = await fetch(
      `${url}/rest/v1/site_settings?select=name,address,logo_url,logo_size,popup_enabled,popup_title,popup_message,resources_visible&limit=1`,
      {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        next: { revalidate: 30, tags: [SITE_SETTINGS_TAG] },
      }
    );
    if (!res.ok) return DEFAULT_SITE_SETTINGS;

    const rows = (await res.json()) as SiteSettingsRow[];
    const row = rows[0];
    if (!row) return DEFAULT_SITE_SETTINGS;

    return {
      name: row.name || DEFAULT_SITE_SETTINGS.name,
      address: row.address ?? DEFAULT_SITE_SETTINGS.address,
      logoUrl: row.logo_url,
      logoSize: row.logo_size ?? DEFAULT_SITE_SETTINGS.logoSize,
      popupEnabled: row.popup_enabled ?? false,
      popupTitle: row.popup_title ?? "",
      popupMessage: row.popup_message ?? "",
      resourcesVisible: row.resources_visible ?? true,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
