"use client";

import * as React from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

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
        style={{ height: Math.min(logoSize, 36) }}
        className="w-auto max-w-[8rem] object-contain"
      />
    );
  }
  return (
    <svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }} fill="none" aria-hidden>
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
    if (popupEnabled && popupMessage.trim()) setVisible(true);
  }, [popupEnabled, popupMessage]);

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* Gold top bar */}
        <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #a07820, #c8a832 40%, #e8c840 60%, #c8a832)" }} />

        {/* Card body — dark */}
        <div className="relative bg-[#13131a]">

          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full blur-3xl" style={{ background: "rgba(30,96,24,0.22)" }} />
          <div className="pointer-events-none absolute -left-12 -bottom-12 size-48 rounded-full blur-2xl" style={{ background: "rgba(200,168,50,0.12)" }} />

          {/* Dot grid overlay */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-25" />

          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white/70"
          >
            <X className="size-4" />
          </button>

          <div className="relative px-7 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8">

            {/* Brand badge */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10" style={{ background: "rgba(30,96,24,0.25)" }}>
                <PopupLogo name={name} logoUrl={logoUrl} logoSize={logoSize} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#c8a832" }}>
                  Welcome to
                </p>
                <p className="text-sm font-bold leading-tight text-white">{name}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-7 flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
              <Sparkles className="size-3.5" style={{ color: "#c8a832" }} />
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Title */}
            {popupTitle.trim() && (
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-[1.75rem] mb-3">
                {popupTitle}
              </h2>
            )}

            {/* Message */}
            <p
              className="text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(255,255,255,0.55)", whiteSpace: "pre-wrap" }}
            >
              {popupMessage}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={dismiss} size="lg" className="flex-1 gap-2 shadow-lg">
                Explore the space
                <ArrowRight className="size-4" />
              </Button>
              <button
                onClick={dismiss}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.38)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
