import type { LeadType } from "@/components/lead/lead-modal-provider";

export interface Plan {
  slug: string;
  name: string;
  tagline: string;
  priceMonthly: number | null; // null = custom pricing
  priceAnnual: number | null; // effective monthly price billed annually
  unit: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
  lead: LeadType;
}

export const plans: Plan[] = [
  {
    slug: "hot-desk",
    name: "Hot Desk",
    tagline: "Flexible, work-from-anywhere access",
    priceMonthly: 220,
    priceAnnual: 187,
    unit: "per person / month",
    features: [
      "Any available desk, network-wide",
      "Access to all common areas & lounges",
      "5 meeting-room hours / month",
      "2 guest passes / month",
      "Community events included",
    ],
    ctaLabel: "Get started",
    lead: "tour",
  },
  {
    slug: "dedicated-desk",
    name: "Dedicated Desk",
    tagline: "Your own desk in a shared studio",
    priceMonthly: 420,
    priceAnnual: 357,
    unit: "per desk / month",
    popular: true,
    features: [
      "Reserved desk that's always yours",
      "Personal lockable storage",
      "24/7 secure access",
      "Business address & mail handling",
      "10 meeting-room hours / month",
    ],
    ctaLabel: "Get started",
    lead: "tour",
  },
  {
    slug: "private-office",
    name: "Private Office",
    tagline: "A lockable space for your team",
    priceMonthly: 850,
    priceAnnual: 722,
    unit: "per desk / month",
    features: [
      "Fully furnished, lockable office",
      "Branded to your company",
      "Access to every Hustlegrove location",
      "20 meeting-room hours / month",
      "Priority booking & support",
    ],
    ctaLabel: "Get started",
    lead: "tour",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tagline: "Custom workspace for larger teams",
    priceMonthly: null,
    priceAnnual: null,
    unit: "tailored to your team",
    features: [
      "Private floors & custom build-outs",
      "Dedicated account manager",
      "Unlimited meeting-room access",
      "Multi-city & global agreements",
      "Consolidated billing & reporting",
    ],
    ctaLabel: "Contact Sales",
    lead: "sales",
  },
];

type CellValue = boolean | string;

export const comparison: {
  category: string;
  rows: { feature: string; values: [CellValue, CellValue, CellValue, CellValue] }[];
}[] = [
  {
    category: "Workspace",
    rows: [
      {
        feature: "Workspace type",
        values: ["Any hot desk", "Reserved desk", "Private office", "Custom floors"],
      },
      { feature: "Lockable storage", values: [false, true, true, true] },
      { feature: "Branded space", values: [false, false, true, true] },
    ],
  },
  {
    category: "Access",
    rows: [
      { feature: "24/7 secure access", values: [false, true, true, true] },
      { feature: "Network locations", values: ["1", "1", "All", "All"] },
      { feature: "Guest passes / month", values: ["2", "5", "10", "Custom"] },
    ],
  },
  {
    category: "Services",
    rows: [
      { feature: "Meeting-room hours / mo", values: ["5", "10", "20", "Unlimited"] },
      { feature: "Business address & mail", values: [false, true, true, true] },
      { feature: "Dedicated account manager", values: [false, false, false, true] },
      { feature: "Consolidated billing", values: [false, false, false, true] },
    ],
  },
];
