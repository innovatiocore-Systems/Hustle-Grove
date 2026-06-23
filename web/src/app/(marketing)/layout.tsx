import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PopupBanner } from "@/components/marketing/popup-banner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PopupBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
