"use client";

import * as React from "react";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { InquiryForm } from "@/components/marketing/inquiry-form";

export type LeadType = "tour" | "proposal" | "sales";

const configs: Record<
  LeadType,
  { title: string; description: string; submit: string; defaultInterest?: string }
> = {
  tour: {
    title: "Book a Tour",
    description:
      "Tell us about your team and we'll arrange a time to show you around — we'll confirm within one business day.",
    submit: "Request tour",
  },
  proposal: {
    title: "Request a Proposal",
    description: "Tell us about your team and we'll send a tailored proposal.",
    submit: "Request proposal",
    defaultInterest: "Enterprise / Custom",
  },
  sales: {
    title: "Contact Sales",
    description: "Talk to our team about a custom workspace for your business.",
    submit: "Contact sales",
    defaultInterest: "Enterprise / Custom",
  },
};

const LeadContext = React.createContext<{ open: (type: LeadType) => void }>({
  open: () => {},
});

export function useLeadModal() {
  return React.useContext(LeadContext);
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = React.useState<LeadType | null>(null);
  const config = type ? configs[type] : null;

  const open = React.useCallback((t: LeadType) => setType(t), []);
  const close = React.useCallback(() => setType(null), []);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      {/* Every lead CTA opens the same shared InquiryForm so the inquiry
          experience is uniform across the site — only the heading and submit
          label change per intent. */}
      <Dialog open={!!config} onClose={close}>
        {config && (
          <>
            <DialogHeader
              title={config.title}
              description={config.description}
              onClose={close}
            />
            <InquiryForm
              embedded
              submitLabel={config.submit}
              defaultInterest={config.defaultInterest}
              onSuccess={close}
            />
          </>
        )}
      </Dialog>
    </LeadContext.Provider>
  );
}
