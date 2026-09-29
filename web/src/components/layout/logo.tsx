"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { useSiteSettings } from "@/components/site-settings-provider";

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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          style={{ height: logoSize }}
          className="w-auto max-w-[12rem] object-contain"
        />
      ) : (
        <Image
          src="/logo-badge.png"
          alt=""
          width={logoSize + 12}
          height={logoSize + 12}
          priority
          className="shrink-0 rounded-full"
        />
      )}
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        {site.shortName}
      </span>
    </Link>
  );
}
