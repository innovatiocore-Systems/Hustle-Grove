import type { LeadType } from "@/components/lead/lead-modal-provider";

export interface Plan {
  slug: string;
  name: string;
  tagline: string;
  priceMonthly: number | null;
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
    tagline: "Flexible access — daily, weekly or monthly",
    priceMonthly: 299,
    unit: "per person / month",
    features: [],
    ctaLabel: "Get started",
    lead: "tour",
  },
  {
    slug: "dedicated-desk",
    name: "Dedicated Desk",
    tagline: "Your own permanent desk, always ready",
    priceMonthly: 499,
    unit: "per desk / month",
    popular: true,
    features: [],
    ctaLabel: "Get started",
    lead: "tour",
  },
  {
    slug: "private-office",
    name: "Private Office",
    tagline: "Lockable suite for your team",
    priceMonthly: 1250,
    unit: "from per suite / month",
    features: [],
    ctaLabel: "Enquire now",
    lead: "proposal",
  },
  {
    slug: "virtual-office",
    name: "Virtual Office",
    tagline: "A professional address without a desk",
    priceMonthly: 79,
    unit: "per month",
    features: [],
    ctaLabel: "Get started",
    lead: "tour",
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
        values: ["Flexible hot desk", "Reserved desk", "Private lockable suite", "Remote / virtual"],
      },
      { feature: "Lockable storage",      values: [false, true,  true,  false] },
      { feature: "Private suite",          values: [false, false, true,  false] },
      { feature: "24 / 7 secure access",  values: [false, true,  true,  false] },
    ],
  },
  {
    category: "Services",
    rows: [
      { feature: "Meeting-room hours / mo", values: ["5 hrs", "10 hrs", "Unlimited", "4 hrs (Premium)"] },
      { feature: "Business address & mail", values: [false,   true,     true,         true] },
      { feature: "Guest passes / month",    values: ["2",     "5",      "10",         "—"] },
      { feature: "Community events",        values: [true,    true,     true,         false] },
      { feature: "Call answering",          values: [false,   false,    false,        "Premium only"] },
    ],
  },
  {
    category: "Billing",
    rows: [
      { feature: "Day pass available",  values: ["$35 / day", false, false, false] },
      { feature: "Weekly pass",         values: ["$129 / wk", false, false, false] },
    ],
  },
];

// Meeting Room day-use rates (displayed separately on the pricing page)
export const meetingRoomRates = [
  { label: "Hourly",   price: 40,  unit: "/ hour",    desc: "Perfect for quick catch-ups and interviews." },
  { label: "Half Day", price: 120, unit: "/ half day", desc: "Up to 4 hours — ideal for workshops." },
  { label: "Full Day", price: 220, unit: "/ full day", desc: "Full 8-hour block for all-day sessions." },
];
