"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Loader2, Sun, Moon, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { updatePreferences } from "@/lib/profile/api";
import { TIMEZONES, type DateFormat, type Profile } from "@/lib/profile/types";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/admin/profile/profile-section";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function PreferencesCard({
  profile,
  onSaved,
}: {
  profile: Profile;
  onSaved: (partial: Partial<Profile>) => void;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const [timezone, setTimezone] = React.useState(profile.timezone);
  const [dateFormat, setDateFormat] = React.useState<DateFormat>(
    profile.dateFormat
  );
  const [saving, setSaving] = React.useState(false);

  const dirty =
    timezone !== profile.timezone || dateFormat !== profile.dateFormat;

  useUnsavedChangesWarning(dirty);

  const onSave = async () => {
    setSaving(true);
    const res = await updatePreferences({ timezone, dateFormat });
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save preferences", { description: res.message });
      return;
    }
    onSaved({ timezone, dateFormat });
    toast.success("Preferences saved");
  };

  return (
    <ProfileSection
      title="Personal preferences"
      description="Tailor the dashboard to how you like to work."
    >
      <div className="space-y-6">
        <div>
          <Label className="mb-1.5">Theme</Label>
          <div className="inline-flex gap-1 rounded-xl border border-border bg-card p-1">
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = mounted && theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTheme(opt.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-gradient text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {opt.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Applied instantly and remembered on this device.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="timezone" className="mb-1.5">
              Timezone
            </Label>
            <Select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="dateFormat" className="mb-1.5">
              Time format
            </Label>
            <Select
              id="dateFormat"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value as DateFormat)}
            >
              <option value="24h">24-hour (14:30)</option>
              <option value="12h">12-hour (2:30 PM)</option>
            </Select>
          </div>
        </div>

        <Button type="button" onClick={onSave} disabled={saving || !dirty}>
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save preferences"
          )}
        </Button>
      </div>
    </ProfileSection>
  );
}
