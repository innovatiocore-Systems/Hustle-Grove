import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { RequireAuth } from "@/lib/auth/require-auth";
import { ADMIN_ROLES } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Operations and analytics for Haven Workspaces.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth roles={ADMIN_ROLES} redirectTo="/admin-login">
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
