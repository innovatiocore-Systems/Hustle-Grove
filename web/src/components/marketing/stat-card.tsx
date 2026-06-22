import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/marketing/counter";

export function StatCard({
  stat,
  variant = "default",
}: {
  stat: Stat;
  variant?: "default" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        variant === "light" ? "text-white" : "text-foreground"
      )}
    >
      <span className="font-display text-4xl md:text-5xl">
        <Counter value={stat.value} />
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          variant === "light" ? "text-white/80" : "text-foreground"
        )}
      >
        {stat.label}
      </span>
      {stat.description && (
        <span
          className={cn(
            "text-sm",
            variant === "light" ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {stat.description}
        </span>
      )}
    </div>
  );
}
