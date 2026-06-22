"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Lightweight click-to-open dropdown. `trigger` is the clickable element;
 * `children` render inside the floating panel and receive a `close` helper
 * via the DropdownClose context.
 */
const CloseContext = React.createContext<() => void>(() => {});

export function DropdownMenu({
  trigger,
  children,
  align = "end",
  className,
  panelClassName,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
  panelClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {trigger}
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-2 min-w-56 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95",
            align === "end" ? "right-0" : "left-0",
            panelClassName
          )}
        >
          <CloseContext.Provider value={() => setOpen(false)}>
            {children}
          </CloseContext.Provider>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  className,
  onSelect,
  ...props
}: React.ComponentProps<"button"> & { onSelect?: () => void }) {
  const close = React.useContext(CloseContext);
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.();
        close();
      }}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted [&_svg]:size-4 [&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function DropdownLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DropdownSeparator() {
  return <div className="my-1.5 h-px bg-border" />;
}
