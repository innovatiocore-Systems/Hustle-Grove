import * as React from "react";
import { Inbox, AlertTriangle, CheckCircle2, RefreshCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function StateShell({
  icon,
  tone,
  title,
  description,
  action,
  className,
}: {
  icon: React.ReactNode;
  tone: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center",
        className
      )}
    >
      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl",
          tone
        )}
      >
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  icon,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <StateShell
      icon={icon ?? <Inbox className="size-6 text-muted-foreground" />}
      tone="bg-muted text-muted-foreground"
      title={title}
      description={description}
      action={action}
      className={className}
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <StateShell
      icon={<AlertTriangle className="size-6 text-destructive" />}
      tone="bg-destructive/10 text-destructive"
      title={title}
      description={description}
      action={
        onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCcw className="size-4" />
            Try again
          </Button>
        ) : undefined
      }
      className={className}
    />
  );
}

export function SuccessState({
  title = "All done",
  description,
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <StateShell
      icon={<CheckCircle2 className="size-6 text-emerald-600" />}
      tone="bg-emerald-100 text-emerald-600"
      title={title}
      description={description}
      action={action}
      className={className}
    />
  );
}
