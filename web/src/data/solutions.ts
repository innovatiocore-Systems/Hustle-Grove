import { Building2, Armchair, Coffee, Presentation } from "lucide-react";

import type { Solution } from "@/lib/types";
import { img } from "@/lib/images";

export const solutions: Solution[] = [
  {
    slug: "private-offices",
    name: "Private Offices",
    tagline: "A space that's entirely yours",
    description:
      "Fully furnished, lockable offices for teams of 1 to 100. Move in today with everything your team needs to do its best work.",
    icon: Building2,
    startingPrice: 850,
    priceUnit: "per desk / month",
    features: [
      "Lockable, fully furnished suites",
      "Scales from 1 to 100+ people",
      "Branded to your company",
      "24/7 secure access",
    ],
    image: img("1604328698692-f76ea9498e76"),
  },
  {
    slug: "dedicated-desks",
    name: "Dedicated Desks",
    tagline: "Your own desk in a shared studio",
    description:
      "A reserved desk that's always yours, in a calm shared studio. Includes storage, a business address and unlimited access.",
    icon: Armchair,
    startingPrice: 420,
    priceUnit: "per desk / month",
    features: [
      "Reserved desk, always yours",
      "Personal lockable storage",
      "Business mailing address",
      "Unlimited 24/7 access",
    ],
    image: img("1497366811353-6870744d04b2"),
  },
  {
    slug: "hot-desks",
    name: "Hot Desks",
    tagline: "Flexible, work-from-anywhere access",
    description:
      "Drop in and work from any available desk across our network. Perfect for hybrid teams and independent professionals.",
    icon: Coffee,
    startingPrice: 220,
    priceUnit: "per person / month",
    features: [
      "Any open desk, any location",
      "Access to all common areas",
      "Community events included",
      "Month-to-month flexibility",
    ],
    image: img("1556761175-5973dc0f32e7"),
  },
  {
    slug: "meeting-rooms",
    name: "Meeting Rooms",
    tagline: "Rooms that make an impression",
    description:
      "Bookable boardrooms and meeting spaces with premium AV, whiteboards and barista coffee — by the hour or the day.",
    icon: Presentation,
    startingPrice: 60,
    priceUnit: "per hour",
    features: [
      "Premium AV & video conferencing",
      "Seats 4 to 24 guests",
      "Catering on request",
      "Book by the hour or day",
    ],
    image: img("1542744173-8e7e53415bb0"),
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
