"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/components/site-settings-provider";

function LogoMark({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      style={{ width: size, height: size }}
      className={cn(className)}
      fill="none"
      aria-hidden
    >
      <g
        className="stroke-violet"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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

export function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "light";
  className?: string;
}) {
  const { name, logoUrl, logoSize } = useSiteSettings();

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${name} home`}
    >
      {logoUrl ? (
        // An uploaded logo replaces the default lockup entirely.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          style={{ height: logoSize }}
          className="w-auto max-w-[12rem] object-contain"
        />
      ) : (
        <>
          <LogoMark size={logoSize} />
          <span
            className={cn(
              "font-display text-xl tracking-tight",
              variant === "light" ? "text-white" : "text-foreground"
            )}
          >
            {name}
          </span>
        </>
      )}
    </Link>
  );
}
