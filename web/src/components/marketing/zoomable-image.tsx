"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const STEP = 0.5;

/**
 * Renders an image that opens in a full-screen lightbox on click. Inside the
 * lightbox the image can be zoomed (scroll wheel, +/- buttons, double-click or
 * tap) and panned by dragging when zoomed in. Closes on Escape, backdrop click
 * or the close button.
 */
export function ZoomableImage({
  src,
  alt,
  className,
  wrapperClassName,
}: {
  src: string;
  alt: string;
  /** Classes for the <img> thumbnail. */
  className?: string;
  /** Classes for the clickable wrapper (e.g. the framed card). */
  wrapperClassName?: string;
}) {
  const mounted = useMounted();
  const [open, setOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef<{
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    moved: boolean;
  } | null>(null);

  const reset = React.useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  const zoomBy = React.useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(s + delta).toFixed(2)));
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "+" || e.key === "=") zoomBy(STEP);
      else if (e.key === "-" || e.key === "_") zoomBy(-STEP);
      else if (e.key === "0") reset();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, zoomBy, reset]);

  const onWheel = (e: React.WheelEvent) => {
    zoomBy(e.deltaY < 0 ? STEP : -STEP);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale === 1) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.current.moved = true;
    setPos({ x: drag.current.baseX + dx, y: drag.current.baseY + dy });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const wasDragging = drag.current?.moved;
    drag.current = null;
    setDragging(false);
    // A click (no drag) toggles zoom in/out.
    if (!wasDragging) {
      if (scale === 1) zoomBy(1.5);
      else reset();
    }
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — open to zoom`}
        className={cn("group relative block w-full cursor-zoom-in", wrapperClassName)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} loading="lazy" />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-3.5" />
          Click to zoom
        </span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 animate-in fade-in-0"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            {/* Backdrop — click to close */}
            <div className="absolute inset-0" onClick={close} />

            {/* Controls */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoomBy(-STEP)}
                disabled={scale <= MIN_SCALE}
                aria-label="Zoom out"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-40"
              >
                <ZoomOut className="size-5" />
              </button>
              <span className="min-w-14 text-center text-sm font-medium tabular-nums text-white/80">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(STEP)}
                disabled={scale >= MAX_SCALE}
                aria-label="Zoom in"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-40"
              >
                <ZoomIn className="size-5" />
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={scale === 1 && pos.x === 0 && pos.y === 0}
                aria-label="Reset zoom"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-40"
              >
                <RotateCcw className="size-5" />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="ml-1 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Image stage */}
            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 md:p-10"
              onWheel={onWheel}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                draggable={false}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  cursor: scale > 1 ? "grab" : "zoom-in",
                  transition: dragging ? "none" : "transform 0.2s ease-out",
                }}
                className="max-h-full max-w-full touch-none select-none rounded-lg shadow-2xl"
              />
            </div>

            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/50">
              Scroll or use +/− to zoom · drag to pan · Esc to close
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
