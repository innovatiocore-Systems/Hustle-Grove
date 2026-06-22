"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

import { authApi } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/auth-context";
import { isStaff, homePathFor } from "@/lib/auth/roles";
import { emailSchema, loginPasswordSchema } from "@/lib/validation/schemas";
import { Logo } from "@/components/layout/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { setSession, isAuthenticated, loading, user } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);

  // Already signed in → bounce to the right home.
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(homePathFor(user?.roles));
    }
  }, [loading, isAuthenticated, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await authApi.login(values.email, values.password);

    if (!res.success || !res.data) {
      setFormError(res.message ?? "Login failed.");
      return;
    }

    // Enforce admin/staff access *before* establishing the session.
    if (!isStaff(res.data.user.roles)) {
      setFormError(
        "This account doesn't have admin access. Please use the member login."
      );
      return;
    }

    setSession(res.data);
    toast.success("Welcome to the admin portal");
    router.replace("/admin");
  };

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sidebar">
        <Loader2 className="size-7 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="bg-stats-gradient flex min-h-screen flex-col items-center justify-center p-6">
      <div className="absolute left-6 top-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-card p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" />
            Admin
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl text-foreground">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          For administrators and staff only.
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
              placeholder="admin@haven.dev"
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
              <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in to admin"}
            {!isSubmitting && <ArrowRight className="size-4" />}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not an admin?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Member sign in
          </Link>
        </p>

        <p className="mt-6 rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
          Demo admin: <span className="font-medium text-foreground">superadmin@haven.dev</span> /{" "}
          <span className="font-medium text-foreground">SuperAdmin123!</span>
        </p>
      </div>
    </div>
  );
}
