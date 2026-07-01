"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { updateProfile, uploadAvatar, deleteAvatarObject } from "@/lib/profile/api";
import { profileInfoSchema, type ProfileInfoValues } from "@/lib/profile/schemas";
import { formatAccountDate } from "@/lib/profile/format";
import type { Profile } from "@/lib/profile/types";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarUploader } from "@/components/admin/profile/avatar-uploader";
import { ReadOnlyField } from "@/components/admin/profile/read-only-field";
import {
  ProfileSection,
  FieldError,
} from "@/components/admin/profile/profile-section";

export function ProfileInfoCard({
  profile,
  onSaved,
}: {
  profile: Profile;
  onSaved: (partial: Partial<Profile>) => void;
}) {
  const { updateUser } = useAuth();

  const defaults: ProfileInfoValues = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    displayName: profile.displayName,
    phone: profile.phone,
    jobTitle: profile.jobTitle,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileInfoValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: defaults,
  });

  // Avatar is managed outside RHF: pick → local preview → upload only on save.
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = React.useState(false);

  // Revoke the object URL when the preview changes or the card unmounts.
  React.useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const displayUrl = avatarPreview ?? (avatarRemoved ? null : profile.avatarUrl);
  const avatarDirty = avatarFile !== null || avatarRemoved;
  const dirty = isDirty || avatarDirty;

  useUnsavedChangesWarning(dirty);

  const onSelectAvatar = (file: File) => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
    setAvatarRemoved(false);
  };

  const onRemoveAvatar = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
    setAvatarRemoved(true);
  };

  const clearAvatarState = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
    setAvatarRemoved(false);
  };

  const onCancel = () => {
    reset(defaults);
    clearAvatarState();
  };

  const onSubmit = async (values: ProfileInfoValues) => {
    let finalUrl = profile.avatarUrl;

    if (avatarFile) {
      const up = await uploadAvatar(avatarFile, profile.avatarUrl);
      if (!up.ok || !up.data) {
        toast.error("Couldn't upload your photo", { description: up.message });
        return;
      }
      finalUrl = up.data;
    } else if (avatarRemoved && profile.avatarUrl) {
      await deleteAvatarObject(profile.avatarUrl); // best-effort
      finalUrl = null;
    }

    const res = await updateProfile({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      displayName: (values.displayName ?? "").trim(),
      phone: (values.phone ?? "").trim(),
      jobTitle: (values.jobTitle ?? "").trim(),
      avatarUrl: finalUrl,
    });
    if (!res.ok) {
      toast.error("Couldn't save your profile", { description: res.message });
      return;
    }

    const saved: Partial<Profile> = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      displayName: (values.displayName ?? "").trim(),
      phone: (values.phone ?? "").trim(),
      jobTitle: (values.jobTitle ?? "").trim(),
      avatarUrl: finalUrl,
    };
    onSaved(saved);

    // Keep the shell header in sync (name + avatar).
    const fullName =
      `${saved.firstName} ${saved.lastName}`.trim() || profile.email;
    updateUser({
      firstName: saved.firstName,
      lastName: saved.lastName,
      fullName,
      displayName: saved.displayName || null,
      avatarUrl: finalUrl,
    });

    reset({
      firstName: saved.firstName!,
      lastName: saved.lastName!,
      displayName: saved.displayName!,
      phone: saved.phone!,
      jobTitle: saved.jobTitle!,
    });
    clearAvatarState();
    toast.success("Profile updated");
  };

  const busy = isSubmitting;

  return (
    <ProfileSection
      title="Profile information"
      description="Your name, photo and contact details for the admin team."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <AvatarUploader
          displayUrl={displayUrl}
          hasImage={!!displayUrl}
          disabled={busy}
          onSelect={onSelectAvatar}
          onRemove={onRemoveAvatar}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              className="mt-1.5"
              aria-invalid={!!errors.firstName}
              {...register("firstName")}
            />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              className="mt-1.5"
              aria-invalid={!!errors.lastName}
              {...register("lastName")}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
          <div>
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              className="mt-1.5"
              placeholder="How your name appears"
              {...register("displayName")}
            />
            <FieldError message={errors.displayName?.message} />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              className="mt-1.5"
              placeholder="+61 2 6100 0142"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            <FieldError message={errors.phone?.message} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="jobTitle">Job title</Label>
            <Input
              id="jobTitle"
              className="mt-1.5"
              placeholder="Community Manager"
              {...register("jobTitle")}
            />
            <FieldError message={errors.jobTitle?.message} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ReadOnlyField label="Email address" value={profile.email} />
          <ReadOnlyField label="Role">
            <Badge variant="gold">{profile.role}</Badge>
          </ReadOnlyField>
          <ReadOnlyField
            label="Account created"
            value={formatAccountDate(profile.createdAt, {
              timezone: profile.timezone,
              dateFormat: profile.dateFormat,
            })}
          />
          <ReadOnlyField
            label="Last login"
            value={formatAccountDate(profile.lastLoginAt, {
              timezone: profile.timezone,
              dateFormat: profile.dateFormat,
            })}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={busy || !dirty}>
            {busy ? (
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
            onClick={onCancel}
            disabled={busy || !dirty}
          >
            Cancel
          </Button>
        </div>
      </form>
    </ProfileSection>
  );
}
