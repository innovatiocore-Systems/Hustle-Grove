"use client";

import * as React from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Surface for logging/monitoring.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-muted-foreground/70">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset} className="gap-2">
          <RotateCcw className="size-4" />
          Try again
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
        >
          <Home className="size-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
