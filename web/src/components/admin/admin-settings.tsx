"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, Loader2, Trash2 } from "lucide-react";

import type { SiteSettings } from "@/lib/settings/types";
import { updateSiteSettings, uploadLogo } from "@/lib/settings/api";
import { revalidateSiteSettings } from "@/lib/settings/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

export function AdminSettings({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [name, setName] = React.useState(initial.name);
  const [address, setAddress] = React.useState(initial.address);
  const [logoUrl, setLogoUrl] = React.useState<string | null>(initial.logoUrl);
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const dirty =
    name !== initial.name ||
    address !== initial.address ||
    logoUrl !== initial.logoUrl;

  const onPickLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (PNG, SVG, JPG…).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be 2 MB or smaller.");
      return;
    }

    setUploading(true);
    const res = await uploadLogo(file);
    setUploading(false);

    if (!res.ok || !res.url) {
      toast.error("Upload failed", { description: res.message });
      return;
    }
    setLogoUrl(res.url);
    toast.success("Logo uploaded — save to apply it across the site.");
  };

  const onSave = async () => {
    if (!name.trim()) {
      toast.error("Website name is required.");
      return;
    }

    setSaving(true);
    const res = await updateSiteSettings({
      name: name.trim(),
      address: address.trim(),
      logoUrl,
    });

    if (!res.ok) {
      setSaving(false);
      toast.error("Couldn't save settings", { description: res.message });
      return;
    }

    await revalidateSiteSettings();
    router.refresh();
    setSaving(false);
    toast.success("Settings saved");
  };

  const reset = () => {
    setName(initial.name);
    setAddress(initial.address);
    setLogoUrl(initial.logoUrl);
  };

  return (
    <div className="space-y-6">
      <Card
        title="Branding"
        description="Set the logo, name, and address used across the website."
      >
        <div className="space-y-6">
          <div>
            <Label className="mb-1.5">Website logo</Label>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-40 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-muted/40">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt="Site logo"
                    className="h-12 w-auto max-w-[9rem] object-contain"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No logo set
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickLogo}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="size-4" />
                      {logoUrl ? "Replace logo" : "Upload logo"}
                    </>
                  )}
                </Button>
                {logoUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setLogoUrl(null)}
                    disabled={uploading}
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              PNG, SVG, or JPG up to 2 MB. Leave empty to use the default mark.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5" htmlFor="site-name">
                Website name
              </Label>
              <Input
                id="site-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hustle Grove Workspaces"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1.5" htmlFor="site-address">
                Address
              </Label>
              <Textarea
                id="site-address"
                className="min-h-20"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="548 Market Street, Suite 400, San Francisco, CA 94104"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="button" onClick={onSave} disabled={saving || uploading || !dirty}>
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          disabled={saving || !dirty}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
