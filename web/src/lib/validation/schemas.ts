import { z } from "zod";

/**
 * Shared zod schemas so client-side validation is consistent across every form
 * and mirrors the backend FluentValidation rules.
 */

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .max(256, "Email is too long")
  .email("Enter a valid email address");

/** Strong password — matches the API policy (8+, upper, lower, digit). */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be 128 characters or fewer")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[0-9]/, "Add a digit");

/** Login only checks the password is present (never reveals the policy). */
export const loginPasswordSchema = z.string().min(1, "Enter your password");

export const nameSchema = (field = "Name") =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .max(100, `${field} must be 100 characters or fewer`)
    .regex(/^[\p{L}\p{M} .'-]+$/u, `${field} contains invalid characters`);

export const optionalText = (max = 200) =>
  z.string().trim().max(max, `Must be ${max} characters or fewer`).optional().or(z.literal(""));

export const phoneSchema = z
  .string()
  .trim()
  .max(32, "Phone number is too long")
  .regex(/^[0-9\s+().-]+$/, "Phone number contains invalid characters")
  .optional()
  .or(z.literal(""));

export const roleNameSchema = z
  .string()
  .trim()
  .min(1, "Role name is required")
  .max(100, "Role name must be 100 characters or fewer")
  .regex(/^[\p{L}\p{N} ._-]+$/u, "Role name contains invalid characters");

/**
 * Public inquiry submission. Used by the marketing inquiry form, the room
 * availability flow and the "Book a tour" modal. The room/date/time fields are
 * optional because not every entry point captures them.
 */
export const inquirySchema = z.object({
  fullName: nameSchema("Full name"),
  email: emailSchema,
  phone: phoneSchema,
  company: optionalText(120),
  roomId: optionalText(120),
  roomName: optionalText(160),
  location: optionalText(160),
  requestedDate: z.string().trim().max(40).optional().or(z.literal("")),
  requestedTime: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
