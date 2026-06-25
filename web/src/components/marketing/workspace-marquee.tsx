import {
  Wifi,
  Coffee,
  Monitor,
  Users,
  Clock,
  Phone,
  Printer,
  Leaf,
  Mail,
  CalendarDays,
} from "lucide-react";

const items = [
  { icon: Wifi, label: "Gigabit Wi-Fi" },
  { icon: Coffee, label: "Barista Coffee" },
  { icon: Monitor, label: "Standing Desks" },
  { icon: Users, label: "Meeting Rooms" },
  { icon: Clock, label: "24/7 Secure Access" },
  { icon: Phone, label: "Phone Booths" },
  { icon: Printer, label: "Printing & Scanning" },
  { icon: Leaf, label: "Biophilic Spaces" },
  { icon: Mail, label: "Mail Handling" },
  { icon: CalendarDays, label: "Community Events" },
];

/**
 * A continuously scrolling ticker of workspace amenities. Two identical halves
 * sit side by side and the track translates -50%, looping seamlessly. Pauses on
 * hover; falls back to static (no motion) under prefers-reduced-motion.
 */
export function WorkspaceMarquee() {
  return (
    <section className="py-4 md:py-6" aria-label="What's included in every workspace">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <ul
              key={half}
              aria-hidden={half === 1}
              className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4"
            >
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex shrink-0 items-center gap-2.5 rounded-full border border-border/70 bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm"
                  >
                    <Icon className="size-4 shrink-0 text-primary" />
                    {item.label}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
