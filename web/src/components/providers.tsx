"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

import { LeadModalProvider } from "@/components/lead/lead-modal-provider";
import { CommandPalette } from "@/components/command-palette";
import { SiteSettingsProvider } from "@/components/site-settings-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/lib/settings/types";

export function Providers({
  children,
  siteSettings = DEFAULT_SITE_SETTINGS,
}: {
  children: React.ReactNode;
  siteSettings?: SiteSettings;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SiteSettingsProvider value={siteSettings}>
        <AuthProvider>
          <LeadModalProvider>
            {children}
            <CommandPalette />
          </LeadModalProvider>
        </AuthProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}
