import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/types";

/**
 * Browser Supabase client (publishable/anon key — safe to expose).
 *
 * The demo persists inquiries here. If the environment variables are missing
 * the client is `null` and callers fall back gracefully so the UI never hard
 * crashes during a demo.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient<Database>(url as string, anonKey as string, {
      auth: {
        // Persist + refresh the session so the admin stays signed in across
        // reloads and the JWT is available for RLS-protected reads.
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return client;
}
