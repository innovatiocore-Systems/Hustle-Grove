import { Heart, Sparkles, ShieldCheck, Leaf } from "lucide-react";

import type { Stat, Value, TeamMember } from "@/lib/types";
import { avatar } from "@/lib/images";

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

export const team: TeamMember[] = [
  {
    name: "Sofia Alvarez",
    role: "Founder & CEO",
    bio: "Former architect on a mission to make premium workspace accessible to every team.",
    avatar: avatar("1544005313-94ddf0286df2"),
  },
  {
    name: "James Whitfield",
    role: "Chief Operating Officer",
    bio: "Twenty years scaling hospitality brands, now obsessed with member experience.",
    avatar: avatar("1472099645785-5658abf4ff4e"),
  },
  {
    name: "Aisha Khan",
    role: "Head of Design",
    bio: "Leads our studio, turning raw buildings into spaces people love to work in.",
    avatar: avatar("1438761681033-6461ffad8d80"),
  },
  {
    name: "Liam O'Connor",
    role: "VP of Real Estate",
    bio: "Finds and secures landmark buildings in the neighbourhoods our members want.",
    avatar: avatar("1506794778202-cad84cf45f1d"),
  },
];
