"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { value: string; label: string; count?: number }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const active = value === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-gradient text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  active ? "bg-white/20" : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
