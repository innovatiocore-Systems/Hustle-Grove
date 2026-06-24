"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { isStaff } from "@/lib/auth/roles";
import { signInWithSupabase, signOutSupabase } from "@/lib/auth/supabase-auth";
import { FEATURES } from "@/lib/features";
import { Logo } from "@/components/layout/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setSession, isAuthenticated, loading, user, logout } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isAdminUser = isStaff(user?.roles);

  React.useEffect(() => {
    if (loading) return;
    if (isAuthenticated && isAdminUser) {
      // Already signed in as staff → go straight to the portal.
      router.replace("/admin");
    } else if (isAuthenticated && !isAdminUser) {
      // Stale non-admin token (e.g. member session) — clear it so the
      // login form appears instead of bouncing through /dashboard → /.
      logout();
    }
  }, [loading, isAuthenticated, isAdminUser, router, logout]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setSubmitting(true);
    const res = await signInWithSupabase(email.trim(), password);

    if (!res.ok || !res.data) {
      setError(res.message ?? "Couldn't sign you in.");
      setSubmitting(false);
      return;
    }

    // The admin portal is staff-only — block members who authenticate here.
    if (!isStaff(res.data.user.roles)) {
      await signOutSupabase();
      setError("This account doesn't have admin access.");
      setSubmitting(false);
      return;
    }

    setSession(res.data);
    toast.success("Welcome to the admin portal");
    router.replace("/admin");
  };

  if (loading || (isAuthenticated && isAdminUser)) {
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
              placeholder="admin@hustlegrove.com"
              className="mt-1.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in to admin
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        {FEATURES.memberAccess && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not an admin?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Member sign in
            </Link>
          </p>
        )}

        <p className="mt-6 rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
          Admin access only. Contact your workspace owner if you need an account.
        </p>
      </div>
    </div>
  );
}
