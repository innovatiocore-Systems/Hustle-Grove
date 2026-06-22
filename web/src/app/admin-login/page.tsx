"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { homePathFor } from "@/lib/auth/roles";
import { Logo } from "@/components/layout/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Demo-only: validation and the real API call are disabled. Signing in just
// sets a fake Super Admin session and drops you into the admin portal.
export default function AdminLoginPage() {
  const router = useRouter();
  const { setSession, isAuthenticated, loading, user } = useAuth();

  // Already signed in → bounce to the right home.
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(homePathFor(user?.roles));
    }
  }, [loading, isAuthenticated, user, router]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSession({
      accessToken: "demo-token",
      refreshToken: "demo-refresh-token",
      accessTokenExpiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      user: {
        id: "demo-admin",
        email: "superadmin@haven.dev",
        firstName: "Super",
        lastName: "Admin",
        fullName: "Super Admin",
        isActive: true,
        emailConfirmed: true,
        roles: ["Super Admin"],
      },
    });
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

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@haven.dev"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1.5"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Sign in to admin
            <ArrowRight className="size-4" />
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
