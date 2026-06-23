"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useInquiries } from "@/lib/inquiries/use-inquiries";
import { INQUIRY_STATUSES, type Inquiry, type InquiryStatus } from "@/lib/inquiries/types";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { EmptyState, ErrorState } from "@/components/states/states";
import {
  InquiryStatusBadge,
  relativeTime,
  shortDate,
} from "@/components/admin/inquiry-status";
import { InquiryDetailDialog } from "@/components/admin/inquiry-detail-dialog";

type StatusFilter = "All" | InquiryStatus;

export function InquiriesManager() {
  const { inquiries, loading, error, reload, setStatus } = useInquiries();
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<StatusFilter>("All");
  const [active, setActive] = React.useState<Inquiry | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (filter !== "All" && i.status !== filter) return false;
      if (!q) return true;
      return [i.fullName, i.company, i.email, i.roomName, i.location]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [inquiries, query, filter]);

  // Keep the open dialog in sync with optimistic status changes.
  const activeLive = active
    ? inquiries.find((i) => i.id === active.id) ?? null
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Inquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {inquiries.length} total ·{" "}
            {inquiries.filter((i) => i.status === "New").length} new
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, room…"
            className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <Select
          className="sm:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value as StatusFilter)}
        >
          <option value="All">All statuses</option>
          {INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-24">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <ErrorState description={error} onRetry={reload} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={inquiries.length === 0 ? "No inquiries yet" : "No matches"}
          description={
            inquiries.length === 0
              ? "Inquiries submitted from the website will appear here."
              : "Try a different search or filter."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => (
                <TableRow
                  key={i.id}
                  onClick={() => setActive(i)}
                  className={cn("cursor-pointer")}
                >
                  <TableCell>
                    <p className="font-medium text-foreground">{i.fullName}</p>
                    <p className="text-xs text-muted-foreground">{i.email}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {i.company ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {i.roomName ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {shortDate(i.requestedDate)}
                    {i.requestedTime ? ` · ${i.requestedTime}` : ""}
                  </TableCell>
                  <TableCell>
                    <InquiryStatusBadge status={i.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {relativeTime(i.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <InquiryDetailDialog
        inquiry={activeLive}
        onClose={() => setActive(null)}
        onStatusChange={setStatus}
      />
    </div>
  );
}
