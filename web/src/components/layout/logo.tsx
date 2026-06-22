import Link from "next/link";

import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-9", className)} aria-hidden>
      <rect x="4.5" y="4" width="6.5" height="24" rx="3.25" className="fill-primary" />
      <rect x="21" y="4" width="6.5" height="24" rx="3.25" className="fill-violet" />
      <rect x="8.5" y="12.25" width="15" height="6.5" rx="3.25" className="fill-primary" />
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
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Hustlegrove Workspaces home"
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl tracking-tight",
            variant === "light" ? "text-white" : "text-foreground"
          )}
        >
          Hustlegrove
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-bold uppercase tracking-[0.22em]",
            variant === "light" ? "text-white/55" : "text-muted-foreground"
          )}
        >
          Workspaces
        </span>
      </span>
    </Link>
  );
}
