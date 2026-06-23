"use client";

import * as React from "react";

import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/lib/settings/types";

const SiteSettingsContext = React.createContext<SiteSettings>(
  DEFAULT_SITE_SETTINGS
);

/**
 * Provides the server-fetched site branding to client components (logo, nav).
 * The value is seeded from the root layout, so SSR and the client render the
 * same thing — no hydration mismatch.
 */
export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return React.useContext(SiteSettingsContext);
}
