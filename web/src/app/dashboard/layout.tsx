import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RequireAuth } from "@/lib/auth/require-auth";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Manage your bookings, workspaces and invoices with Haven Workspaces.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  );
}
