import * as React from "react";

/**
 * A non-editable account fact (email, role, created date, last login). Rendered
 * in the muted "locked" style so it reads clearly as read-only.
 */
export function ReadOnlyField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-foreground">
        {children ?? value ?? "—"}
      </div>
    </div>
  );
}
