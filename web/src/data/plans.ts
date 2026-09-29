export interface Plan {
  slug: string;
  name: string;
  tagline: string;
  /** Only shown in the (disabled) member dashboard; the public site is price-on-enquiry. */
  priceMonthly: number | null;
  unit: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    slug: "dedicated-desk",
    name: "Dedicated Desk",
    tagline: "Your own permanent desk in the open-plan zone",
    priceMonthly: null,
    unit: "",
    features: ["Your own reserved workstation", "Ergonomic setup", "Open-plan zone of 14 desks", "Month-to-month terms"],
  },
  {
    slug: "private-office",
    name: "Private Office",
    tagline: "A lockable suite for your team",
    priceMonthly: null,
    unit: "",
    features: ["6 suites from 8–15 sqm", "Lockable and fully furnished", "Ready on day one", "Month-to-month terms"],
  },
  {
    slug: "meeting-room",
    name: "Meeting Room",
    tagline: "Book by the hour or the day",
    priceMonthly: null,
    unit: "",
    features: ["Seats up to 10", "AV display", "Oval boardroom table", "Members and non-members"],
  },
  {
    slug: "soundproof-booth",
    name: "Soundproof Booth",
    tagline: "A quiet pod for calls and focus",
    priceMonthly: null,
    unit: "",
    features: ["Acoustic, soundproofed pod", "Private calls and video meetings", "Recordings", "Deep-focus work"],
  },
];
