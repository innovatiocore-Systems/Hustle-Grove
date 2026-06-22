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

// Demo-only: validation and the real API call are disabled. Creating an account
// just sets a fake Member session and drops you straight into the dashboard.
export default function RegisterPage() {
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
    toast.success("Account created — you're signed in!");
    router.replace("/dashboard");
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join Haven Workspaces in less than a minute.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" className="mt-1.5" placeholder="Ada" />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" className="mt-1.5" placeholder="Lovelace" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5" placeholder="you@company.com" />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" className="mt-1.5" placeholder="At least 8 characters" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="jobTitle">Job title (optional)</Label>
            <Input id="jobTitle" className="mt-1.5" placeholder="Engineer" />
          </div>
          <div>
            <Label htmlFor="companyName">Company (optional)</Label>
            <Input id="companyName" className="mt-1.5" placeholder="Acme Inc." />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Create account
          <ArrowRight className="size-4" />
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
