"use client";

import * as React from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { locations } from "@/data/locations";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export type LeadType = "tour" | "proposal" | "sales" | "brochure";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  options?: string[];
};

const locationNames = locations.map((l) => l.name);

const configs: Record<
  LeadType,
  { title: string; description: string; submit: string; fields: Field[] }
> = {
  tour: {
    title: "Book a Tour",
    description: "Pick a location and time — we'll confirm within one business day.",
    submit: "Request tour",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      { name: "location", label: "Location", type: "select", options: locationNames, full: true },
      { name: "date", label: "Preferred date", type: "date" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "message", label: "Anything we should know?", type: "textarea", full: true },
    ],
  },
  proposal: {
    title: "Request a Proposal",
    description: "Tell us about your team and we'll send a tailored proposal.",
    submit: "Request proposal",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "team", label: "Team size", type: "text", placeholder: "e.g. 25" },
      { name: "message", label: "Requirements", type: "textarea", full: true },
    ],
  },
  sales: {
    title: "Contact Sales",
    description: "Talk to our enterprise team about a custom workspace.",
    submit: "Contact sales",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "message", label: "How can we help?", type: "textarea", full: true },
    ],
  },
  brochure: {
    title: "Download Brochure",
    description: "Get our workspace brochure delivered straight to your inbox.",
    submit: "Send me the brochure",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
    ],
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
  const [submitting, setSubmitting] = React.useState(false);
  const config = type ? configs[type] : null;

  const open = React.useCallback((t: LeadType) => setType(t), []);
  const close = React.useCallback(() => setType(null), []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    close();
    if (type === "brochure") {
      toast.success("Brochure on its way!", {
        description: `We've emailed it to ${data.get("email")}.`,
      });
    } else {
      toast.success("Thanks — we've received your request.", {
        description: "Our team will be in touch within one business day.",
      });
    }
  };

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <Dialog open={!!config} onClose={close}>
        {config && (
          <>
            <DialogHeader
              title={config.title}
              description={config.description}
              onClose={close}
            />
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {config.fields.map((f) => (
                  <div key={f.name} className={f.full ? "sm:col-span-2" : undefined}>
                    <Label htmlFor={f.name}>{f.label}</Label>
                    {f.type === "textarea" ? (
                      <Textarea
                        id={f.name}
                        name={f.name}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="mt-1.5 min-h-24"
                      />
                    ) : f.type === "select" ? (
                      <Select id={f.name} name={f.name} className="mt-1.5" defaultValue="">
                        <option value="" disabled>
                          Select a location
                        </option>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="mt-1.5"
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Sending…" : config.submit}
                {!submitting && <Send className="size-4" />}
              </Button>
            </form>
          </>
        )}
      </Dialog>
    </LeadContext.Provider>
  );
}
