"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

import { LeadModalProvider } from "@/components/lead/lead-modal-provider";
import { CommandPalette } from "@/components/command-palette";
import { AuthProvider } from "@/lib/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <LeadModalProvider>
          {children}
          <CommandPalette />
        </LeadModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
