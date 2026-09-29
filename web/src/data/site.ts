export const site = {
  name: "The Hustle Grove Workspace",
  shortName: "Hustle Grove",
  tagline: "Where ambition takes root.",
  description:
    "Dedicated desks, private offices, a meeting room and a soundproof booth designed for modern teams.",
  email: "hello@hustlegrove.com.au",
  phone: "+61 2 6100 0142",
  headquarters: "Level 4, 1 University Avenue\nCanberra ACT 2601, Australia",
  /** Canonical public URL — override with NEXT_PUBLIC_SITE_URL in deployment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hustle-grove.vercel.app",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    heading: "Workspaces",
    links: [
      { label: "Dedicated Desks", href: "/pricing" },
      { label: "Private Offices", href: "/pricing" },
      { label: "Meeting Room", href: "/pricing" },
      { label: "Soundproof Booth", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Locations", href: "/locations" },
      { label: "Contact", href: "/contact" },
      { label: "Member Login", href: "/dashboard" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Insights", href: "/resources" },
    ],
  },
];
