export function Timeline({
  items,
}: {
  items: { time: string; title: string; description?: string }[];
}) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.65rem] top-1 flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
          <p className="text-sm font-semibold text-primary">{item.time}</p>
          <p className="mt-0.5 font-medium text-foreground">{item.title}</p>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
