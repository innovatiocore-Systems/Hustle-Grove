import { getSiteSettings } from "@/lib/settings/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PopupBanner } from "@/components/marketing/popup-banner";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <PopupBanner />
      <Navbar resourcesVisible={settings.resourcesVisible} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
