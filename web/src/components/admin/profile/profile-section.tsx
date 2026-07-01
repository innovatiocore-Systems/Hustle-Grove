import * as React from "react";

/** Card chrome shared by the profile sections — matches `admin-settings.tsx`. */
export function ProfileSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

/** Inline field-error line, consistent with the marketing inquiry form. */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}
