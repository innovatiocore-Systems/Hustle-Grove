import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
}

/** Card skeleton used for loading grids (workspaces, locations, events). */
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-border/70 p-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  );
}
