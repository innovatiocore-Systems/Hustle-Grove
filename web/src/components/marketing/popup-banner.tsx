"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowRight, Sparkles, Leaf, Bell } from "lucide-react";

import { useSiteSettings } from "@/components/site-settings-provider";
import { Button } from "@/components/ui/button";

const GOLD = "#c8a832";

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
        style={{ height: Math.min(logoSize, 32) }}
        className="w-auto max-w-[7rem] object-contain"
      />
    );
  }
  return (
    <svg viewBox="0 0 32 32" style={{ width: 26, height: 26 }} fill="none" aria-hidden>
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

/** Renders the title with the final word in a gold gradient ("Opening Soon!"). */
function Headline({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <h2 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
      {lead && <span>{lead} </span>}
      <span className="bg-gradient-to-r from-[#c8a832] to-[#e8c840] bg-clip-text text-transparent">
        {last}
      </span>
    </h2>
  );
}

export function PopupBanner() {
  const { name, logoUrl, logoSize, popupEnabled, popupTitle, popupMessage } =
    useSiteSettings();
  const [dismissed, setDismissed] = React.useState(false);

  const dismiss = () => setDismissed(true);

  const visible = popupEnabled && popupMessage.trim().length > 0 && !dismissed;
  if (!visible) return null;

  const hasTitle = popupTitle.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="relative grid w-full max-w-3xl animate-in fade-in zoom-in-95 slide-in-from-bottom-6 overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] duration-300 sm:slide-in-from-bottom-0 md:grid-cols-[1.08fr_0.92fr]"
        style={{
          background:
            "linear-gradient(135deg, #0f1712 0%, #13131a 55%, #0d1410 100%)",
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/10 text-white/60 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* Content */}
        <div className="relative flex flex-col p-7 sm:p-9">
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 size-60 rounded-full blur-3xl"
            style={{ background: "rgba(30,96,24,0.25)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" />

          <div className="relative">
            {/* Brand header */}
            <div className="flex items-center gap-3">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10"
                style={{ background: "rgba(30,96,24,0.25)" }}
              >
                <PopupLogo name={name} logoUrl={logoUrl} logoSize={logoSize} />
              </div>
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: GOLD }}
                >
                  Welcome to
                </p>
                <p className="text-sm font-bold leading-tight text-white">{name}</p>
              </div>
            </div>

            {/* Centered headline block */}
            <div className="mt-8 text-center">
              {hasTitle && (
                <div className="mb-3 flex items-center justify-center gap-2.5">
                  <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.12)" }} />
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/55">
                    We&apos;re
                  </span>
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>
              )}

              {hasTitle && <Headline title={popupTitle} />}

              <div className="my-5 flex items-center justify-center gap-2">
                <span className="h-px w-10" style={{ background: "rgba(255,255,255,0.1)" }} />
                <Leaf className="size-3.5 text-primary" />
                <span className="h-px w-10" style={{ background: "rgba(255,255,255,0.1)" }} />
              </div>

              <p
                className="mx-auto max-w-sm text-sm leading-relaxed sm:text-base"
                style={{ color: "rgba(255,255,255,0.58)", whiteSpace: "pre-wrap" }}
              >
                {popupMessage}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button onClick={dismiss} size="lg" className="gap-2 shadow-lg">
              Explore the space
              <ArrowRight className="size-4" />
            </Button>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <button
              onClick={dismiss}
              className="flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white/85"
            >
              <Bell className="size-4" />
              Notify me later
            </button>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative hidden min-h-[340px] overflow-hidden md:block">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(30,96,24,0.45) 0%, rgba(13,20,16,0.2) 55%, transparent 80%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 size-72 rounded-full blur-3xl"
            style={{ background: "rgba(200,168,50,0.16)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
          <div className="relative flex h-full items-center justify-center p-8">
            <div
              className="absolute size-52 rounded-full blur-2xl"
              style={{ background: "rgba(200,168,50,0.18)" }}
            />
            <Image
              src="/hero-badge.png"
              alt={name}
              width={300}
              height={300}
              className="relative h-auto w-44 drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] lg:w-56"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
