import { cn } from "@/lib/utils";

export function BarChart({
  data,
  height = 200,
  className,
}: {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={className}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d) => (
          <div
            key={d.label}
            className="group flex flex-1 flex-col items-center justify-end gap-2"
            title={`${d.label}: ${d.value}`}
          >
            <span className="text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {d.value}
            </span>
            <div
              className="w-full rounded-t-md bg-brand-gradient transition-opacity hover:opacity-90"
              style={{ height: `${Math.max((d.value / max) * 100, 2)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((d) => (
          <span
            key={d.label}
            className={cn("flex-1 text-center text-xs text-muted-foreground")}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
