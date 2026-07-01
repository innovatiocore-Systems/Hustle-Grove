"use client";

import * as React from "react";
import { toast } from "sonner";
import { Upload, Trash2, User } from "lucide-react";

import { AVATAR_ACCEPT, AVATAR_MAX_BYTES } from "@/lib/profile/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/**
 * Presentational avatar picker. Validates type/size on selection and hands the
 * raw File up to the parent, which previews it locally and only uploads on save
 * (so the image is previewed before it's persisted).
 */
export function AvatarUploader({
  displayUrl,
  hasImage,
  disabled,
  onSelect,
  onRemove,
}: {
  /** Current image to show — a local preview or the saved URL. */
  displayUrl: string | null;
  /** Whether there's an image to remove (preview or saved). */
  hasImage: boolean;
  disabled?: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const fileRef = React.useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!AVATAR_ACCEPT.includes(file.type as (typeof AVATAR_ACCEPT)[number])) {
      toast.error("Unsupported image type", {
        description: "Please choose a JPG, PNG, or WEBP file.",
      });
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      toast.error("Image is too large", {
        description: "Please choose a file of 5 MB or smaller.",
      });
      return;
    }
    onSelect(file);
  };

  return (
    <div>
      <Label className="mb-1.5">Profile photo</Label>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayUrl}
              alt="Profile photo preview"
              className="size-full object-cover"
            />
          ) : (
            <User className="size-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept={AVATAR_ACCEPT.join(",")}
            className="hidden"
            onChange={onPick}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={disabled}
          >
            <Upload className="size-4" />
            {hasImage ? "Replace" : "Upload"}
          </Button>
          {hasImage && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={disabled}
            >
              <Trash2 className="size-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        JPG, PNG, or WEBP up to 5 MB. Changes apply when you save.
      </p>
    </div>
  );
}
