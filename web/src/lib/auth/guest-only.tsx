"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";
import { homePathFor } from "@/lib/auth/roles";

/**
 * Wraps guest-only pages (login, register). If the visitor is already
 * authenticated they are redirected to their role-based home.
 */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(homePathFor(user?.roles));
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
