"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  CalendarClock,
  DoorOpen,
} from "lucide-react";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { InquiryStatusBadge, relativeTime, shortDate } from "@/components/admin/inquiry-status";
import { INQUIRY_STATUSES, type Inquiry, type InquiryStatus } from "@/lib/inquiries/types";

function Row({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium text-primary hover:underline">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

export function InquiryDetailDialog({
  inquiry,
  onClose,
  onStatusChange,
}: {
  inquiry: Inquiry | null;
  onClose: () => void;
  onStatusChange: (id: string, status: InquiryStatus) => void;
}) {
  const schedule = [inquiry?.requestedDate ? shortDate(inquiry.requestedDate) : null, inquiry?.requestedTime]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog open={!!inquiry} onClose={onClose} align="top" className="max-w-xl">
      {inquiry && (
        <>
          <DialogHeader
            title={inquiry.fullName}
            description={`Received ${relativeTime(inquiry.createdAt)}`}
            onClose={onClose}
          />
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              <InquiryStatusBadge status={inquiry.status} />
              <div className="flex items-center gap-2">
                <Label htmlFor="detail-status" className="text-xs text-muted-foreground">
                  Update status
                </Label>
                <Select
                  id="detail-status"
                  className="h-9 w-40"
                  value={inquiry.status}
                  onChange={(e) =>
                    onStatusChange(inquiry.id, e.target.value as InquiryStatus)
                  }
                >
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-4 divide-y divide-border/60">
              <Row icon={Mail} label="Email" value={inquiry.email} href={`mailto:${inquiry.email}`} />
              <Row icon={Phone} label="Phone" value={inquiry.phone} href={inquiry.phone ? `tel:${inquiry.phone}` : undefined} />
              <Row icon={Building2} label="Company" value={inquiry.company} />
              <Row icon={DoorOpen} label="Room / interest" value={inquiry.roomName} />
              <Row icon={MapPin} label="Location" value={inquiry.location} />
              <Row icon={CalendarClock} label="Requested" value={schedule || null} />
            </div>

            {inquiry.message && (
              <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Message</p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {inquiry.message}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
