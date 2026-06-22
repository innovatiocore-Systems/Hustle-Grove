export function LineChart({
  data,
  height = 200,
  id = "area",
}: {
  data: { label: string; value: number }[];
  height?: number;
  id?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const w = 100;
  const h = 100;

  const points = data.map((d, i) => {
    const x = data.length === 1 ? 0 : (i / (data.length - 1)) * w;
    const y = h - ((d.value - min) / range) * (h - 8) - 4;
    return [x, y] as const;
  });

  const line = points.map((p) => `${p[0]},${p[1]}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ height, width: "100%" }}
        role="img"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#${id})`} />
        <polyline
          points={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-muted-foreground">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
