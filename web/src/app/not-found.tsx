import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-bold leading-none text-primary sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
        This page took a different desk
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back to a working space.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
          <Home className="size-4" />
          Back to home
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
        >
          <ArrowLeft className="size-4" />
          Contact us
        </Link>
      </div>
    </div>
  );
}
