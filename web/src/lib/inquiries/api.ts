import { getSupabase } from "@/lib/supabase/client";
import type { InquiryInput } from "@/lib/validation/schemas";
import {
  mapInquiry,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/inquiries/types";

export interface Result<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

const NOT_CONFIGURED =
  "Supabase isn't configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.";

function clean(value?: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Persist a new inquiry from any public entry point. */
export async function createInquiry(input: InquiryInput): Promise<Result<Inquiry>> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      full_name: input.fullName.trim(),
      email: input.email.trim(),
      phone: clean(input.phone),
      company: clean(input.company),
      room_id: clean(input.roomId),
      room_name: clean(input.roomName),
      location: clean(input.location),
      requested_date: clean(input.requestedDate),
      requested_time: clean(input.requestedTime),
      message: clean(input.message),
    })
    .select()
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: mapInquiry(data) };
}

/** Fetch all inquiries (admin), newest first. */
export async function listInquiries(): Promise<Result<Inquiry[]>> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []).map(mapInquiry) };
}

/** Permanently delete an inquiry (admin only — enforced by RLS). */
export async function deleteInquiry(id: string): Promise<Result<null>> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: null };
}

/** Update an inquiry's workflow status (admin / CRM). */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<Result<Inquiry>> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, data: mapInquiry(data) };
}
