import Image from "next/image";
import { Megaphone, Star, Newspaper } from "lucide-react";

import type { FeedItem } from "@/data/events";
import { Badge } from "@/components/ui/badge";

const icons = {
  Announcement: Megaphone,
  "Member Spotlight": Star,
  "Workspace News": Newspaper,
} as const;

export function CommunityFeed({ items }: { items: FeedItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = icons[item.kind];
        return (
          <article
            key={item.title}
            className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant="muted" className="gap-1">
                  <Icon className="size-3" />
                  {item.kind}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
