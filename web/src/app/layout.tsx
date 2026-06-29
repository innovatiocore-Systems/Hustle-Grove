import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { getSiteSettings } from "@/lib/settings/server";
import { site } from "@/data/site";

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

const TITLE_DEFAULT =
  "The Hustle Grove Workspace — Where ambition takes root.";
const DESCRIPTION =
  "Flexible private offices, dedicated desks, hot desks and meeting rooms designed for modern teams to do their best work.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE_DEFAULT,
    template: "%s · Hustle Grove",
  },
  description: DESCRIPTION,
  keywords: [
    "coworking",
    "private office",
    "flexible workspace",
    "dedicated desk",
    "meeting rooms",
    "Hustle Grove Workspaces",
    "Canberra coworking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: site.url,
    locale: "en_AU",
    images: [
      {
        url: "/hero-lounge.png",
        width: 1536,
        height: 1024,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: ["/hero-lounge.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers siteSettings={siteSettings}>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
