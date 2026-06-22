import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-brand-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-[1.05]",
        solid:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        gold: "bg-gold text-gold-foreground shadow-sm hover:bg-gold/90 hover:shadow-md",
        outline:
          "border border-border bg-card text-foreground shadow-xs hover:border-primary/40 hover:bg-muted",
        "outline-light":
          "border border-white/30 bg-transparent text-white hover:bg-white/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "bg-transparent hover:bg-muted hover:text-foreground",
        link: "rounded-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
