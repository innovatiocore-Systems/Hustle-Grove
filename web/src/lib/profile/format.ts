import type { DateFormat } from "@/lib/profile/types";

/**
 * Format an ISO timestamp for display in the profile using the user's own
 * timezone and 12h/24h preference. Falls back gracefully on bad input.
 */
export function formatAccountDate(
  iso: string | null,
  opts: { timezone?: string; dateFormat?: DateFormat }
): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: opts.dateFormat === "12h",
      timeZone: opts.timezone || undefined,
    }).format(date);
  } catch {
    // Invalid timezone string, etc. — retry without the timezone.
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: opts.dateFormat === "12h",
    }).format(date);
  }
}
