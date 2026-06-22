import {
  Wifi,
  Users,
  PartyPopper,
  Coffee,
  Clock,
  ConciergeBell,
  Printer,
  Lock,
  Dumbbell,
  Leaf,
} from "lucide-react";

import type { Amenity } from "@/lib/types";

export const amenities: Amenity[] = [
  {
    name: "High-Speed Internet",
    description:
      "Enterprise-grade fibre with secure VLANs and 99.9% uptime across every floor.",
    icon: Wifi,
  },
  {
    name: "Meeting Rooms",
    description:
      "Bookable boardrooms and huddle spaces with premium AV and video conferencing.",
    icon: Users,
  },
  {
    name: "Event Spaces",
    description:
      "Flexible venues for launches, workshops and team offsites — fully catered.",
    icon: PartyPopper,
  },
  {
    name: "Coffee & Refreshments",
    description:
      "Barista-grade coffee, curated teas and filtered water on tap, all day.",
    icon: Coffee,
  },
  {
    name: "24/7 Access",
    description:
      "Secure keycard entry around the clock so your team works on its own schedule.",
    icon: Clock,
  },
  {
    name: "Reception Services",
    description:
      "A friendly front desk to greet guests, handle mail and manage deliveries.",
    icon: ConciergeBell,
  },
  {
    name: "Print & Scan",
    description:
      "Managed print stations with secure release and document scanning.",
    icon: Printer,
  },
  {
    name: "Private Phone Booths",
    description:
      "Sound-proofed booths for focused calls and confidential conversations.",
    icon: Lock,
  },
  {
    name: "Wellness & Gym",
    description:
      "On-site fitness studios, showers and quiet rooms to help you recharge.",
    icon: Dumbbell,
  },
  {
    name: "Green Spaces",
    description:
      "Plant-filled lounges and rooftop terraces designed for calm and focus.",
    icon: Leaf,
  },
];

/** The six headline amenities featured on the home page. */
export const featuredAmenities = amenities.slice(0, 6);
