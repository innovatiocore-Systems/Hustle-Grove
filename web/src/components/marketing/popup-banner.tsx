"use client";

import * as React from "react";
import { X } from "lucide-react";

import { useSiteSettings } from "@/components/site-settings-provider";
import { Button } from "@/components/ui/button";

export function PopupBanner() {
  const { popupEnabled, popupTitle, popupMessage } = useSiteSettings();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!popupEnabled || !popupMessage.trim()) return;
    // Key includes a hash of the message — changing the message re-shows the popup
    const key = `hg-popup-${popupMessage.trim().length}-${popupMessage.trim().charCodeAt(0)}`;
    if (sessionStorage.getItem(key)) return;
    setVisible(true);
  }, [popupEnabled, popupMessage]);

  const dismiss = () => {
    setVisible(false);
    const key = `hg-popup-${popupMessage.trim().length}-${popupMessage.trim().charCodeAt(0)}`;
    sessionStorage.setItem(key, "1");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-2xl border border-border/70 bg-card p-8 shadow-2xl">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        {popupTitle.trim() && (
          <h2 className="font-display text-2xl font-bold text-foreground">
            {popupTitle}
          </h2>
        )}

        <p
          className="mt-3 leading-relaxed text-muted-foreground"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {popupMessage}
        </p>

        <Button onClick={dismiss} className="mt-6 w-full" size="lg">
          Got it, let&apos;s go!
        </Button>
      </div>
    </div>
  );
}
