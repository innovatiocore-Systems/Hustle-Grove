"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { homePathFor } from "@/lib/auth/roles";
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  optionalText,
  phoneSchema,
} from "@/lib/validation/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  email: emailSchema,
  password: passwordSchema,
  jobTitle: optionalText(150),
  companyName: optionalText(200),
  phoneNumber: phoneSchema,
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await registerUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      jobTitle: values.jobTitle || null,
      companyName: values.companyName || null,
      phoneNumber: values.phoneNumber || null,
    });
    if (res.ok) {
      toast.success("Account created — you're signed in!");
      router.replace(homePathFor(res.user?.roles));
    } else {
      setFormError(res.errors?.join(" ") ?? res.message ?? "Registration failed.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join Haven Workspaces in less than a minute.
      </p>

      {formError && (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" className="mt-1.5" placeholder="Ada" {...register("firstName")} />
            {errors.firstName && (
              <p className="mt-1.5 text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" className="mt-1.5" placeholder="Lovelace" {...register("lastName")} />
            {errors.lastName && (
              <p className="mt-1.5 text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5" placeholder="you@company.com" {...register("email")} />
          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" className="mt-1.5" placeholder="At least 8 characters" {...register("password")} />
          {errors.password && (
            <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="jobTitle">Job title (optional)</Label>
            <Input id="jobTitle" className="mt-1.5" placeholder="Engineer" {...register("jobTitle")} />
          </div>
          <div>
            <Label htmlFor="companyName">Company (optional)</Label>
            <Input id="companyName" className="mt-1.5" placeholder="Acme Inc." {...register("companyName")} />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
