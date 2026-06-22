"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        checked ? "bg-brand-gradient" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
