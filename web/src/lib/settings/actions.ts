"use server";

import { updateTag } from "next/cache";

import { SITE_SETTINGS_TAG } from "@/lib/settings/server";

/**
 * Immediately invalidate the cached site settings so server components re-read
 * them on the next render (the admin should see their save right away).
 */
export async function revalidateSiteSettings(): Promise<void> {
  updateTag(SITE_SETTINGS_TAG);
}
