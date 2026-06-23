"use client";

import * as React from "react";
import { Loader2, ChevronRight } from "lucide-react";

import { useInquiries } from "@/lib/inquiries/use-inquiries";
import {
  INQUIRY_PIPELINE,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/inquiries/types";
import { ErrorState } from "@/components/states/states";
import { statusDot, relativeTime } from "@/components/admin/inquiry-status";
import { InquiryDetailDialog } from "@/components/admin/inquiry-detail-dialog";

/** The next stage in the pipeline, or null at the end. */
function nextStage(status: InquiryStatus): InquiryStatus | null {
  const idx = INQUIRY_PIPELINE.indexOf(status);
  if (idx === -1 || idx >= INQUIRY_PIPELINE.length - 1) return null;
  return INQUIRY_PIPELINE[idx + 1];
}

export function LeadsBoard() {
  const { inquiries, loading, error, reload, setStatus } = useInquiries();
  const [active, setActive] = React.useState<Inquiry | null>(null);

  const activeLive = active
    ? inquiries.find((i) => i.id === active.id) ?? null
    : null;

  // Closed leads are archived out of the pipeline view.
  const columns = INQUIRY_PIPELINE;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-foreground">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Move inquiries through the pipeline as you qualify and convert them.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-border/70 bg-card py-24">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <ErrorState description={error} onRetry={reload} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((stage) => {
            const leads = inquiries.filter((i) => i.status === stage);
            return (
              <div key={stage} className="flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${statusDot[stage]}`} />
                    <span className="text-sm font-semibold text-foreground">
                      {stage}
                    </span>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {leads.length}
                  </span>
                </div>
                <div className="flex-1 space-y-3 rounded-2xl bg-muted/40 p-3">
                  {leads.length === 0 ? (
                    <p className="py-6 text-center text-xs text-muted-foreground">
                      No leads
                    </p>
                  ) : (
                    leads.map((lead) => {
                      const next = nextStage(lead.status);
                      return (
                        <div
                          key={lead.id}
                          className="rounded-xl border border-border/70 bg-card p-3 shadow-sm"
                        >
                          <button
                            type="button"
                            onClick={() => setActive(lead)}
                            className="block w-full text-left"
                          >
                            <p className="text-sm font-medium text-foreground">
                              {lead.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {lead.company ?? lead.email}
                            </p>
                            {lead.roomName && (
                              <p className="mt-2 text-xs text-muted-foreground">
                                {lead.roomName}
                              </p>
                            )}
                          </button>
                          <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2">
                            <span className="text-[0.7rem] text-muted-foreground">
                              {relativeTime(lead.createdAt)}
                            </span>
                            {next && (
                              <button
                                type="button"
                                onClick={() => setStatus(lead.id, next)}
                                className="inline-flex items-center gap-0.5 text-[0.7rem] font-semibold text-primary hover:underline"
                              >
                                {next}
                                <ChevronRight className="size-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
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
