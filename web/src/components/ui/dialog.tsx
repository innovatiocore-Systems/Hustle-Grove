"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";

export function Dialog({
  open,
  onClose,
  children,
  className,
  align = "center",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "top";
}) {
  const mounted = useMounted();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[100] flex justify-center p-4",
        align === "center" ? "items-center" : "items-start pt-[12vh]"
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in-0 zoom-in-95",
          // Never exceed the viewport — scroll inside the panel so footers
          // (e.g. a Delete button) stay reachable on tall content / short screens.
          align === "top"
            ? "max-h-[calc(100dvh-12vh-1.5rem)]"
            : "max-h-[calc(100dvh-2rem)]",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({
  title,
  description,
  onClose,
}: {
  title: string;
  description?: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/70 p-6">
      <div>
        <h2 className="font-display text-xl text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      )}
    </div>
  );
}
