"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";

import { changeEmail } from "@/lib/profile/api";
import { changeEmailSchema, type ChangeEmailValues } from "@/lib/profile/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ProfileSection,
  FieldError,
} from "@/components/admin/profile/profile-section";

export function ChangeEmailCard({ currentEmail }: { currentEmail: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "", currentPassword: "" },
  });

  const onSubmit = async (values: ChangeEmailValues) => {
    const res = await changeEmail({
      newEmail: values.newEmail.trim(),
      currentPassword: values.currentPassword,
    });
    if (!res.ok) {
      toast.error("Couldn't change your email", { description: res.message });
      return;
    }
    reset({ newEmail: "", currentPassword: "" });
    toast.success("Confirmation link sent", {
      description: `Check ${values.newEmail.trim()} to confirm the change. Your email stays the same until then.`,
    });
  };

  return (
    <ProfileSection
      title="Change email"
      description="Update the email address you use to sign in."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-4"
        noValidate
      >
        <div>
          <Label>Current email</Label>
          <p className="mt-1.5 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground">
            {currentEmail}
          </p>
        </div>

        <div>
          <Label htmlFor="newEmail">New email</Label>
          <Input
            id="newEmail"
            type="email"
            className="mt-1.5"
            placeholder="you@hustlegrove.com"
            aria-invalid={!!errors.newEmail}
            {...register("newEmail")}
          />
          <FieldError message={errors.newEmail?.message} />
        </div>

        <div>
          <Label htmlFor="emailCurrentPassword">Current password</Label>
          <Input
            id="emailCurrentPassword"
            type="password"
            autoComplete="current-password"
            className="mt-1.5"
            placeholder="Confirm it's you"
            aria-invalid={!!errors.currentPassword}
            {...register("currentPassword")}
          />
          <FieldError message={errors.currentPassword?.message} />
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            We&apos;ll email a confirmation link to the new address. Your email
            only changes once you click it.
          </p>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Update email"
          )}
        </Button>
      </form>
    </ProfileSection>
  );
}
