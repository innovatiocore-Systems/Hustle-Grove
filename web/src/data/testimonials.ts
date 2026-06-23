import type { Testimonial } from "@/lib/types";
import { avatar } from "@/lib/images";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Hustle Grove gave our team a home that actually reflects our brand. The space is beautiful, the community is real, and we scaled from 6 to 30 people without ever changing offices.",
    author: "Elena Marsh",
    role: "COO",
    company: "Northwind Labs",
    avatar: avatar("1573496359142-b8d87734a5a2"),
  },
  {
    quote:
      "The flexibility is unmatched. We flex desks up and down every quarter, and the meeting rooms make every client visit feel like a five-star experience.",
    author: "Marcus Reed",
    role: "Founder",
    company: "Lattice & Co.",
    avatar: avatar("1500648767791-00dcc994a43e"),
  },
  {
    quote:
      "From the front desk to the rooftop, every detail is considered. Our people genuinely look forward to coming in — that's worth more than any perk.",
    author: "Priya Nair",
    role: "Head of People",
    company: "Brightside",
    avatar: avatar("1494790108377-be9c29b29330"),
  },
  {
    quote:
      "We tried three other providers before Hustle Grove. Nothing else came close on design, service, or the calibre of the community in the building.",
    author: "Daniel Cho",
    role: "Managing Director",
    company: "Meridian Partners",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
  },
];
