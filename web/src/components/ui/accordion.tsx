"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionItemData {
  question: string;
  answer: string;
}

function Accordion({
  items,
  className,
}: {
  items: AccordionItemData[];
  className?: string;
}) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={index} className="py-1">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-foreground">
                {item.question}
              </span>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {isOpen ? (
                  <Minus className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-11 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
