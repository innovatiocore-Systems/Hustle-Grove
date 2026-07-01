import type { Tables } from "@/lib/supabase/types";

export type DateFormat = "12h" | "24h";

/**
 * Domain model for the signed-in admin's own profile. Camel-cased mapping of
 * the editable `profiles` columns plus the read-only account facts that live on
 * the Supabase Auth user (email/created/last-login) rather than the profile row.
 */
export interface Profile {
  id: string;
  // Editable profile fields
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
  jobTitle: string;
  avatarUrl: string | null;
  timezone: string;
  dateFormat: DateFormat;
  // Read-only account facts
  email: string;
  role: string;
  emailConfirmed: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

type ProfileRow = Tables<"profiles">;

/** Merge the `profiles` row with the auth-user read-only facts into a Profile. */
export function mapProfile(
  row: ProfileRow,
  auth: {
    email: string;
    createdAt: string;
    lastLoginAt: string | null;
    emailConfirmed: boolean;
  }
): Profile {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    displayName: row.display_name,
    phone: row.phone,
    jobTitle: row.job_title,
    avatarUrl: row.avatar_url,
    timezone: row.timezone,
    dateFormat: (row.date_format === "12h" ? "12h" : "24h"),
    email: auth.email,
    role: row.role,
    emailConfirmed: auth.emailConfirmed,
    createdAt: auth.createdAt,
    lastLoginAt: auth.lastLoginAt,
  };
}

/** Accepted avatar image types and size cap. */
export const AVATAR_ACCEPT = ["image/jpeg", "image/png", "image/webp"] as const;
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * A pragmatic timezone shortlist for the preferences selector. Kept small and
 * relevant to the business (AU-first) rather than shipping the full IANA list.
 */
export const TIMEZONES: { value: string; label: string }[] = [
  { value: "Australia/Sydney", label: "Sydney (AEDT/AEST)" },
  { value: "Australia/Melbourne", label: "Melbourne (AEDT/AEST)" },
  { value: "Australia/Brisbane", label: "Brisbane (AEST)" },
  { value: "Australia/Adelaide", label: "Adelaide (ACDT/ACST)" },
  { value: "Australia/Perth", label: "Perth (AWST)" },
  { value: "Pacific/Auckland", label: "Auckland (NZDT/NZST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "America/New_York", label: "New York (ET)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PT)" },
  { value: "UTC", label: "UTC" },
];
