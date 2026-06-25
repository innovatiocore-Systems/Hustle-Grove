import { Heart, Sparkles, ShieldCheck, Leaf } from "lucide-react";

import type { Stat, Value } from "@/lib/types";

export const companyStats: Stat[] = [
  { label: "Location", value: "Canberra", description: "Level 4, University Ave CBD" },
  { label: "Floor Space", value: "~145 sqm", description: "One premium level" },
  { label: "Member Retention", value: "94%", description: "Love where they work" },
  { label: "Member Rating", value: "4.9/5", description: "From our members" },
];

export const values: Value[] = [
  {
    title: "People first",
    description:
      "Every decision starts with the people in our spaces. Comfort, community and care are designed in, never bolted on.",
    icon: Heart,
  },
  {
    title: "Considered design",
    description:
      "We sweat the details — light, acoustics, materials — because great work happens in spaces that feel great to be in.",
    icon: Sparkles,
  },
  {
    title: "Trust & flexibility",
    description:
      "Transparent terms and month-to-month flexibility. We earn your business every single month.",
    icon: ShieldCheck,
  },
  {
    title: "Built to last",
    description:
      "Sustainable materials, an energy-smart building and a commitment to the city we call home.",
    icon: Leaf,
  },
];

