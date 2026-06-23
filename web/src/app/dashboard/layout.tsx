import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RequireAuth } from "@/lib/auth/require-auth";
import { MemberGate } from "@/lib/auth/member-gate";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Manage your bookings, workspaces and invoices with Hustle Grove.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemberGate>
      <RequireAuth>
        <DashboardShell>{children}</DashboardShell>
      </RequireAuth>
    </MemberGate>
  );
}
