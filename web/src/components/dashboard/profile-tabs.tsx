"use client";

import * as React from "react";
import { toast } from "sonner";

import { member } from "@/data/dashboard";
import { Tabs } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5">{label}</Label>
      {children}
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
  onSave,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 space-y-5">{children}</div>
      <div className="mt-6 flex gap-3">
        <Button type="button" onClick={onSave}>
          Save changes
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}

const notificationCategories = [
  { key: "bookings", label: "Booking confirmations & reminders" },
  { key: "invoices", label: "Invoice & payment reminders" },
  { key: "events", label: "Event invites & RSVPs" },
  { key: "community", label: "Community digest" },
  { key: "product", label: "Product updates & offers" },
];

export function ProfileTabs() {
  const [tab, setTab] = React.useState("personal");
  const [first, ...rest] = member.name.split(" ");
  const [notifs, setNotifs] = React.useState<Record<string, boolean>>({
    bookings: true,
    invoices: true,
    events: true,
    community: false,
    product: false,
  });
  const saved = () => toast.success("Changes saved");

  return (
    <div className="space-y-6">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "personal", label: "Personal" },
          { value: "company", label: "Company" },
          { value: "preferences", label: "Preferences" },
          { value: "notifications", label: "Notifications" },
        ]}
      />

      {tab === "personal" && (
        <SectionCard
          title="Personal information"
          description="Update your name and contact details."
          onSave={saved}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name">
              <Input defaultValue={first} />
            </Field>
            <Field label="Last name">
              <Input defaultValue={rest.join(" ")} />
            </Field>
            <Field label="Email">
              <Input type="email" defaultValue={member.email} />
            </Field>
            <Field label="Phone">
              <Input defaultValue="+1 (415) 555-0142" />
            </Field>
            <Field label="Job title">
              <Input defaultValue="Operations Lead" />
            </Field>
          </div>
        </SectionCard>
      )}

      {tab === "company" && (
        <SectionCard
          title="Company information"
          description="Details about your organisation for billing and invoices."
          onSave={saved}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company name">
              <Input defaultValue={member.company} />
            </Field>
            <Field label="Team size">
              <Select defaultValue="11-50">
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>200+</option>
              </Select>
            </Field>
            <Field label="Industry">
              <Select defaultValue="Technology">
                <option>Technology</option>
                <option>Finance</option>
                <option>Design & Creative</option>
                <option>Professional Services</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="Website">
              <Input defaultValue="northwindlabs.com" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Billing address">
                <Input defaultValue="548 Market Street, San Francisco, CA 94104" />
              </Field>
            </div>
          </div>
        </SectionCard>
      )}

      {tab === "preferences" && (
        <SectionCard
          title="Preferences"
          description="Personalise your account defaults."
          onSave={saved}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Language">
              <Select defaultValue="English (US)">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Français</option>
                <option>Deutsch</option>
              </Select>
            </Field>
            <Field label="Timezone">
              <Select defaultValue="Pacific Time (PT)">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </Select>
            </Field>
            <Field label="Default location">
              <Select defaultValue={member.homeLocation}>
                <option>{member.homeLocation}</option>
                <option>SoMa Collective</option>
                <option>Tribeca House</option>
              </Select>
            </Field>
            <Field label="Currency">
              <Select defaultValue="USD ($)">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </Select>
            </Field>
          </div>
        </SectionCard>
      )}

      {tab === "notifications" && (
        <SectionCard
          title="Notification settings"
          description="Choose what we email you about. You can change these any time."
          onSave={saved}
        >
          <div className="divide-y divide-border/70">
            {notificationCategories.map((c) => (
              <div key={c.key} className="flex items-center justify-between py-4 first:pt-0">
                <span className="text-sm text-foreground">{c.label}</span>
                <Switch
                  checked={notifs[c.key]}
                  onChange={(v) => setNotifs((p) => ({ ...p, [c.key]: v }))}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
