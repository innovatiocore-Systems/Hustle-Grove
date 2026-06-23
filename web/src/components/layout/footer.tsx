import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import { site, footerNav } from "@/data/site";
import { FEATURES } from "@/lib/features";
import { Logo } from "@/components/layout/logo";
import { getSiteSettings } from "@/lib/settings/server";

export async function Footer() {
  const settings = await getSiteSettings();

  // In the demo, member-portal links are hidden along with the rest of the
  // member experience (see FEATURES.memberAccess).
  const columns = footerNav.map((col) => ({
    ...col,
    links: col.links.filter(
      (link) => FEATURES.memberAccess || !link.href.startsWith("/dashboard")
    ),
  }));

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {site.tagline} Premium workspaces and a community designed to help
              modern teams do their best work.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sidebar-primary" />
                {settings.address}
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-sidebar-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-sidebar-primary" />
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href="#" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
