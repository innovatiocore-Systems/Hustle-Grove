import { z } from "zod";

/** Individual password rules — reused by the strength meter and the schema. */
export const PASSWORD_RULES = [
  { label: "At least 12 characters", test: (v: string) => v.length >= 12 },
  { label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "A lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "A number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "A special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
] as const;

/** How many of the password rules a value satisfies (0–5). */
export function passwordScore(value: string): number {
  return PASSWORD_RULES.reduce((n, r) => n + (r.test(value) ? 1 : 0), 0);
}

const strongPassword = z
  .string()
  .min(12, "Use at least 12 characters")
  .refine((v) => /[A-Z]/.test(v), "Add an uppercase letter")
  .refine((v) => /[a-z]/.test(v), "Add a lowercase letter")
  .refine((v) => /[0-9]/.test(v), "Add a number")
  .refine((v) => /[^A-Za-z0-9]/.test(v), "Add a special character");

export const profileInfoSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  displayName: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(32, "Phone number is too long")
    .regex(/^[0-9\s+().-]*$/, "Phone number contains invalid characters")
    .optional()
    .or(z.literal("")),
  jobTitle: z.string().trim().max(80).optional().or(z.literal("")),
});
export type ProfileInfoValues = z.infer<typeof profileInfoSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: strongPassword,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    path: ["newPassword"],
    message: "New password must differ from the current one",
  });
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  currentPassword: z.string().min(1, "Enter your current password to confirm"),
});
export type ChangeEmailValues = z.infer<typeof changeEmailSchema>;

export const preferencesSchema = z.object({
  timezone: z.string().min(1, "Select a timezone"),
  dateFormat: z.enum(["12h", "24h"]),
});
export type PreferencesValues = z.infer<typeof preferencesSchema>;
