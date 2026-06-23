"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { FEATURES } from "@/lib/features";

/**
 * Demo guard for member-only routes (login, register, the member dashboard).
 *
 * When `FEATURES.memberAccess` is false the route is hidden and the visitor is
 * bounced to the marketing home page. The wrapped pages stay in the codebase
 * untouched — flip the flag to restore them instantly.
 */
export function MemberGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  React.useEffect(() => {
    if (!FEATURES.memberAccess) router.replace("/");
  }, [router]);

  if (!FEATURES.memberAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Loader2 className="size-7 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
