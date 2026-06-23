export function DonutChart({
  segments,
  size = 168,
  centerLabel,
  centerSub,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel: string;
  centerSub?: string;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = 42;
  const circ = 2 * Math.PI * r;

  // Precompute each segment's dash length and cumulative offset (sum of the
  // preceding lengths) without mutating anything during render.
  const lens = segments.map((seg) => (seg.value / total) * circ);
  const arcs = segments.map((seg, i) => ({
    ...seg,
    len: lens[i],
    offset: lens.slice(0, i).reduce((sum, l) => sum + l, 0),
  }));

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--muted)" strokeWidth="12" />
          {arcs.map((seg) => (
            <circle
              key={seg.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${seg.len} ${circ - seg.len}`}
              strokeDashoffset={-seg.offset}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl text-foreground">{centerLabel}</span>
          {centerSub && (
            <span className="text-xs text-muted-foreground">{centerSub}</span>
          )}
        </div>
      </div>
      <ul className="w-full space-y-2.5">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="flex-1 text-muted-foreground">{seg.label}</span>
            <span className="font-medium text-foreground">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
