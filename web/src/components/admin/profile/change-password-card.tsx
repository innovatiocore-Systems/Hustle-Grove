"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { changePassword } from "@/lib/profile/api";
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "@/lib/profile/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordStrengthMeter } from "@/components/admin/profile/password-strength-meter";
import {
  ProfileSection,
  FieldError,
} from "@/components/admin/profile/profile-section";

/** Password field with a show/hide toggle. */
function PasswordInput({
  id,
  autoComplete,
  invalid,
  registration,
}: {
  id: string;
  autoComplete: string;
  invalid?: boolean;
  registration: ReturnType<ReturnType<typeof useForm<ChangePasswordValues>>["register"]>;
}) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        className="mt-1.5 pr-11"
        aria-invalid={invalid}
        {...registration}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted mt-[3px]"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function ChangePasswordCard() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const newPassword = useWatch({ control, name: "newPassword" }) ?? "";

  const onSubmit = async (values: ChangePasswordValues) => {
    const res = await changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    if (!res.ok) {
      toast.error("Couldn't change your password", { description: res.message });
      return;
    }
    reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast.success("Password updated", {
      description: "Use your new password next time you sign in.",
    });
  };

  return (
    <ProfileSection
      title="Change password"
      description="Choose a strong password you don't use anywhere else."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-4"
        noValidate
      >
        <div>
          <Label htmlFor="currentPassword">Current password</Label>
          <PasswordInput
            id="currentPassword"
            autoComplete="current-password"
            invalid={!!errors.currentPassword}
            registration={register("currentPassword")}
          />
          <FieldError message={errors.currentPassword?.message} />
        </div>

        <div>
          <Label htmlFor="newPassword">New password</Label>
          <PasswordInput
            id="newPassword"
            autoComplete="new-password"
            invalid={!!errors.newPassword}
            registration={register("newPassword")}
          />
          <PasswordStrengthMeter value={newPassword} />
          <FieldError message={errors.newPassword?.message} />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            invalid={!!errors.confirmPassword}
            registration={register("confirmPassword")}
          />
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Updating…
            </>
          ) : (
            "Update password"
          )}
        </Button>
      </form>
    </ProfileSection>
  );
}
