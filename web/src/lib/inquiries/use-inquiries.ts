"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  listInquiries,
  updateInquiryStatus as apiUpdateStatus,
} from "@/lib/inquiries/api";
import type { Inquiry, InquiryStatus } from "@/lib/inquiries/types";

/**
 * Shared client hook backing every admin inquiry surface (table, CRM pipeline,
 * dashboard overview). Loads from Supabase and updates status optimistically.
 */
export function useInquiries() {
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listInquiries();
    if (res.ok && res.data) setInquiries(res.data);
    else setError(res.error ?? "Failed to load inquiries.");
    setLoading(false);
  }, []);

  // Initial fetch. State is only set after the await resolves, so this never
  // triggers a synchronous setState-in-effect cascade.
  React.useEffect(() => {
    let active = true;
    listInquiries().then((res) => {
      if (!active) return;
      if (res.ok && res.data) setInquiries(res.data);
      else setError(res.error ?? "Failed to load inquiries.");
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const setStatus = React.useCallback(
    async (id: string, status: InquiryStatus) => {
      const previous = inquiries;
      // Optimistic update.
      setInquiries((rows) =>
        rows.map((r) => (r.id === id ? { ...r, status } : r))
      );
      const res = await apiUpdateStatus(id, status);
      if (!res.ok) {
        setInquiries(previous);
        toast.error("Couldn't update status", {
          description: res.error ?? "Please try again.",
        });
        return;
      }
      toast.success(`Marked as ${status}`);
    },
    [inquiries]
  );

  return { inquiries, loading, error, reload: load, setStatus };
}
