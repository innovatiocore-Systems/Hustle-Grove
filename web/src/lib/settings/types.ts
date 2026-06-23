import { site } from "@/data/site";

/** Admin-editable site branding, persisted in `public.site_settings`. */
export interface SiteSettings {
  name: string;
  address: string;
  logoUrl: string | null;
  logoSize: number; // height in px, range 24–80
  popupEnabled: boolean;
  popupTitle: string;
  popupMessage: string;
}

/** Falls back to the static defaults when Supabase is unavailable. */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: site.name,
  address: site.headquarters,
  logoUrl: null,
  logoSize: 36,
  popupEnabled: false,
  popupTitle: "",
  popupMessage: "",
};
