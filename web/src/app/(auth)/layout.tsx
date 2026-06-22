import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users, Sparkles } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { GuestOnly } from "@/lib/auth/guest-only";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="bg-stats-gradient relative hidden flex-col justify-between p-12 lg:flex">
        <Logo variant="light" />
        <div className="max-w-md">
          <h1 className="font-display text-4xl leading-tight text-white">
            User management for modern workspaces
          </h1>
          <p className="mt-4 text-white/70">
            Secure authentication, role-based access and a complete member
            directory — powered by the Haven Workspaces API.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-white" />
              JWT authentication with refresh tokens
            </li>
            <li className="flex items-center gap-3">
              <Users className="size-5 text-white" />
              Role-based access control
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="size-5 text-white" />
              Member profiles & admin tools
            </li>
          </ul>
        </div>
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Haven Workspaces
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>
            <GuestOnly>{children}</GuestOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
