"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PASSWORD_RULES, passwordScore } from "@/lib/profile/schemas";

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"];
const BAR_COLORS = [
  "bg-destructive",
  "bg-destructive",
  "bg-amber-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-emerald-600",
];

/** Live strength bar + rule checklist for the new-password field. */
export function PasswordStrengthMeter({ value }: { value: string }) {
  const score = passwordScore(value); // 0–5

  return (
    <div className="mt-2 space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="flex h-1.5 flex-1 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-full transition-colors",
                i < score ? BAR_COLORS[score] : "bg-muted"
              )}
            />
          ))}
        </div>
        <span className="w-20 shrink-0 text-right text-xs font-medium text-muted-foreground">
          {value ? LABELS[score] : ""}
        </span>
      </div>

      <ul className="grid gap-1 sm:grid-cols-2">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(value);
          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-1.5 text-xs",
                met ? "text-emerald-600" : "text-muted-foreground"
              )}
            >
              {met ? (
                <Check className="size-3.5 shrink-0" />
              ) : (
                <X className="size-3.5 shrink-0" />
              )}
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
