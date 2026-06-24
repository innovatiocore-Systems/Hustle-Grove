"use client";

import { useEffect, useRef, useState } from "react";

interface LazyIframeProps {
  src: string;
  title: string;
  height?: number;
  className?: string;
}

export function LazyIframe({ src, title, height = 460, className }: LazyIframeProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ height }}>
      {loaded ? (
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height}
          style={{ border: "none", display: "block" }}
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-muted"
          aria-hidden
        />
      )}
    </div>
  );
}
