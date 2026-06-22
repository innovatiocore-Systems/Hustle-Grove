"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_7rem]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={images[active]}
          alt={`${alt} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-4 lg:flex-col">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1}`}
            className={cn(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition lg:w-full",
              active === index
                ? "ring-primary"
                : "ring-transparent hover:ring-border"
            )}
          >
            <Image
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
