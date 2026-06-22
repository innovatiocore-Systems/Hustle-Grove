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
import { emailSchema, loginPasswordSchema } from "@/lib/validation/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await login(values.email, values.password);
    if (res.ok) {
      toast.success("Welcome back!");
      router.replace(homePathFor(res.user?.roles));
    } else {
      setFormError(res.message ?? "Login failed.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your Haven Workspaces account.
      </p>

      {formError && (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="mt-1.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-1.5"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>

      <p className="mt-8 rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
        Administrator?{" "}
        <Link href="/admin-login" className="font-semibold text-foreground hover:underline">
          Sign in to the admin portal
        </Link>
      </p>
    </div>
  );
}
