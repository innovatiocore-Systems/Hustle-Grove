"use client";

import * as React from "react";
import { X } from "lucide-react";

import { useSiteSettings } from "@/components/site-settings-provider";
import { Button } from "@/components/ui/button";

function PopupLogo({
  name,
  logoUrl,
  logoSize,
}: {
  name: string;
  logoUrl: string | null;
  logoSize: number;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={name}
        style={{ height: Math.min(logoSize, 48) }}
        className="w-auto max-w-[10rem] object-contain"
      />
    );
  }
  // Default mark
  return (
    <svg
      viewBox="0 0 32 32"
      style={{ width: 40, height: 40 }}
      fill="none"
      aria-hidden
    >
      <g className="stroke-violet" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 30V16.5" strokeWidth="2.1" />
        <path d="M16 22l-6.4-5.4" />
        <path d="M16 22l6.4-5.4" />
        <path d="M16 18l-4.6-6" />
        <path d="M16 18l4.6-6" />
        <path d="M16 17V8" />
      </g>
      <g>
        <circle cx="16" cy="7.4" r="1.8" className="fill-primary" />
        <circle cx="9.6" cy="17.1" r="1.8" className="fill-primary" />
        <circle cx="22.4" cy="17.1" r="1.8" className="fill-violet" />
        <circle cx="11.4" cy="12" r="1.5" className="fill-violet" />
        <circle cx="20.6" cy="12" r="1.5" className="fill-primary" />
      </g>
    </svg>
  );
}

export function PopupBanner() {
  const { name, logoUrl, logoSize, popupEnabled, popupTitle, popupMessage } =
    useSiteSettings();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!popupEnabled || !popupMessage.trim()) return;
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

        {/* Logo */}
        <div className="mb-5 flex items-center gap-3">
          <PopupLogo name={name} logoUrl={logoUrl} logoSize={logoSize} />
          <span className="font-display text-base font-semibold text-foreground leading-tight">
            {name}
          </span>
        </div>

        <div className="h-px bg-border/60 mb-5" />

        {popupTitle.trim() && (
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            {popupTitle}
          </h2>
        )}

        <p className="leading-relaxed text-muted-foreground" style={{ whiteSpace: "pre-wrap" }}>
          {popupMessage}
        </p>

        <Button onClick={dismiss} className="mt-6 w-full" size="lg">
          Got it, let&apos;s go!
        </Button>
      </div>
    </div>
  );
}
