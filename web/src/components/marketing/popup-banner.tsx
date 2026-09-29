"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowRight, Bell } from "lucide-react";

import { useSiteSettings } from "@/components/site-settings-provider";

const GOLD = "#c8a832";

/** Renders the title with the final word on its own line in gold ("Opening / Soon"). */
function Headline({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <h2 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
      {lead && <span className="block">{lead}</span>}
      <span className="block bg-gradient-to-r from-[#c8a832] to-[#e3c24a] bg-clip-text text-transparent">
        {last}
      </span>
    </h2>
  );
}

/** Faint circuit-branch lines behind the badge. */
function CircuitLines() {
  const nodes: [number, number][] = [
    [60, 70], [150, 40], [230, 90], [40, 190], [250, 200], [90, 300], [210, 320], [270, 280],
  ];
  return (
    <svg
      viewBox="0 0 300 380"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      <g stroke="rgba(160,200,90,0.22)" strokeWidth="1.2">
        {nodes.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M150 380 C150 260 ${x} ${y + 60} ${x} ${y}`} />
        ))}
      </g>
      <g fill="rgba(160,200,90,0.28)">
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
        ))}
      </g>
    </svg>
  );
}

export function PopupBanner() {
  const { name, popupEnabled, popupTitle, popupMessage } = useSiteSettings();
  const [dismissed, setDismissed] = React.useState(false);

  const dismiss = () => setDismissed(true);

  const visible = popupEnabled && popupMessage.trim().length > 0 && !dismissed;
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative my-auto grid w-full max-w-[40rem] animate-in fade-in zoom-in-95 overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] duration-300 md:grid-cols-[1.15fr_0.85fr]"
        style={{
          background:
            "radial-gradient(circle at 78% 30%, rgba(90,120,40,0.35) 0%, transparent 55%), linear-gradient(135deg, #111a15 0%, #0e1311 60%, #0c100e 100%)",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* Content */}
        <div className="relative flex flex-col p-7 sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
            Welcome to
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
            {name}
          </p>
          <span className="mt-5 block h-px w-9" style={{ background: GOLD }} />

          <div className="mt-5">
            {popupTitle.trim() && <Headline title={popupTitle} />}
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed text-white/65"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {popupMessage}
            </p>
          </div>

          <button
            onClick={dismiss}
            className="mt-8 flex w-full max-w-[13.5rem] items-center justify-between rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(200,168,50,0.25)] ring-1 ring-white/10 transition-[filter] hover:brightness-110"
            style={{ background: "linear-gradient(90deg, #2f4a1c 0%, #7a7a22 55%, #c8961e 100%)" }}
          >
            Explore the space
            <ArrowRight className="size-4" />
          </button>
          <button
            onClick={dismiss}
            className="mt-5 flex w-fit items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white/90"
          >
            <Bell className="size-4" />
            Notify me later
          </button>
        </div>

        {/* Badge panel */}
        <div className="relative hidden items-center justify-center md:flex">
          <CircuitLines />
          <div
            className="absolute size-48 rounded-full blur-3xl"
            style={{ background: "rgba(200,168,50,0.18)" }}
          />
          <Image
            src="/logo-badge.png"
            alt={name}
            width={256}
            height={256}
            className="relative size-32 rounded-full ring-2 ring-[#c8a832] ring-offset-2 ring-offset-black/40 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
