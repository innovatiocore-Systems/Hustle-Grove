"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { homePathFor } from "@/lib/auth/roles";

/**
 * Client-side route guard.
 *  - Not authenticated  → redirect to /login
 *  - Authenticated but missing a required role → redirect to their own home
 */
export function RequireAuth({
  children,
  roles,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  roles?: string[];
  redirectTo?: string;
}) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  const hasRole =
    !roles || (user?.roles ?? []).some((r) => roles.includes(r));

  React.useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(redirectTo);
    } else if (!hasRole) {
      router.replace(homePathFor(user?.roles));
    }
  }, [loading, isAuthenticated, hasRole, user, router, redirectTo]);

  if (loading || !isAuthenticated || !hasRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Loader2 className="size-7 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
