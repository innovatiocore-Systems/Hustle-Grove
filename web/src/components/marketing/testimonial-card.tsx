import Image from "next/image";
import { Quote } from "lucide-react";

import type { Testimonial } from "@/lib/types";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-7">
      <Quote className="size-8 text-gold" />
      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
        <Image
          src={testimonial.avatar}
          alt={testimonial.author}
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.author}
          </p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
