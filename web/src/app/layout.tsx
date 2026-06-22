import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hustlegrove Workspaces — Work your way. Grow your way.",
    template: "%s · Hustlegrove Workspaces",
  },
  description:
    "Flexible private offices, dedicated desks, hot desks and meeting rooms designed for modern teams to do their best work.",
  keywords: [
    "coworking",
    "private office",
    "flexible workspace",
    "dedicated desk",
    "meeting rooms",
    "Hustlegrove Workspaces",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
