"use client";

import * as React from "react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const toggles = [
  { key: "newInquiry", label: "Email me on new inquiries" },
  { key: "tourBooked", label: "Notify team when a tour is booked" },
  { key: "paymentFailed", label: "Alert on failed payments" },
  { key: "weeklyReport", label: "Send weekly performance report" },
];

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function AdminSettings() {
  const [state, setState] = React.useState<Record<string, boolean>>({
    newInquiry: true,
    tourBooked: true,
    paymentFailed: true,
    weeklyReport: false,
  });
  const save = () => toast.success("Settings saved");

  return (
    <div className="space-y-6">
      <Card title="Organisation" description="General settings for your workspace brand.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5">Organisation name</Label>
            <Input defaultValue="Hustlegrove Workspaces" />
          </div>
          <div>
            <Label className="mb-1.5">Support email</Label>
            <Input type="email" defaultValue="hello@hustlegrove.com" />
          </div>
          <div>
            <Label className="mb-1.5">Default currency</Label>
            <Select defaultValue="USD ($)">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5">Timezone</Label>
            <Select defaultValue="Pacific Time (PT)">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>GMT</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card title="Notifications" description="Choose what the operations team is alerted about.">
        <div className="divide-y divide-border/70">
          {toggles.map((t) => (
            <div key={t.key} className="flex items-center justify-between py-4 first:pt-0">
              <span className="text-sm text-foreground">{t.label}</span>
              <Switch
                checked={state[t.key]}
                onChange={(v) => setState((p) => ({ ...p, [t.key]: v }))}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="button" onClick={save}>
          Save changes
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}
