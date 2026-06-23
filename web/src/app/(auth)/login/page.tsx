"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Demo-only: validation and the real API call are disabled. Signing in just
// sets a fake Member session and drops you straight into the dashboard.
export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSession({
      accessToken: "demo-token",
      refreshToken: "demo-refresh-token",
      accessTokenExpiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      user: {
        id: "demo-user",
        email: "demo@havenworkspaces.com",
        firstName: "Demo",
        lastName: "User",
        fullName: "Demo User",
        isActive: true,
        emailConfirmed: true,
        roles: ["Member"],
      },
    });
    toast.success("Welcome back!");
    router.replace("/dashboard");
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your Hustle Grove account.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
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
          Sign in
          <ArrowRight className="size-4" />
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
