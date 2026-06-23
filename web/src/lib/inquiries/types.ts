import type { Tables } from "@/lib/supabase/types";

/** Inquiry workflow status — mirrors the `inquiry_status` enum in Postgres. */
export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Closed";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Closed",
];

/** The CRM pipeline stages (Closed is treated as an archived/terminal state). */
export const INQUIRY_PIPELINE: InquiryStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Converted",
];

/**
 * Domain model used across the app. Camel-cased mapping of the Supabase row so
 * components never deal with snake_case columns directly.
 */
export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  roomId: string | null;
  roomName: string | null;
  location: string | null;
  requestedDate: string | null;
  requestedTime: string | null;
  message: string | null;
  status: InquiryStatus;
  createdAt: string;
}

export type InquiryRow = Tables<"inquiries">;

export function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    roomId: row.room_id,
    roomName: row.room_name,
    location: row.location,
    requestedDate: row.requested_date,
    requestedTime: row.requested_time,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}
