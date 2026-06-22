import { img, avatar } from "@/lib/images";

export type EventType = "Networking" | "Workshop" | "Meetup" | "Panel";

export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
}

export interface CommunityEvent {
  slug: string;
  title: string;
  type: EventType;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  image: string;
  excerpt: string;
  description: string;
  capacity: number;
  spotsLeft: number;
  speakers: Speaker[];
  schedule: ScheduleItem[];
}

export const events: CommunityEvent[] = [
  {
    slug: "founder-networking-night",
    title: "Founder Networking Night",
    type: "Networking",
    date: "2026-07-02",
    dateLabel: "Thu, Jul 2",
    time: "6:00 – 8:30 PM",
    location: "Market Street Flagship",
    image: img("1556761175-5973dc0f32e7", 1200, 700),
    excerpt:
      "An evening of curated introductions, drinks and conversation with founders across our network.",
    description:
      "Join 80+ founders and operators for our flagship monthly networking night. Expect curated introductions, great wine, and the kind of conversations that turn into partnerships. Whether you're raising, hiring or just looking for your people, this is the room to be in.",
    capacity: 90,
    spotsLeft: 12,
    speakers: [
      { name: "Elena Marsh", role: "COO, Northwind Labs", avatar: avatar("1573496359142-b8d87734a5a2") },
      { name: "Marcus Reed", role: "Founder, Lattice & Co.", avatar: avatar("1500648767791-00dcc994a43e") },
    ],
    schedule: [
      { time: "6:00 PM", title: "Doors open & welcome drinks" },
      { time: "6:45 PM", title: "Curated founder introductions" },
      { time: "7:30 PM", title: "Open networking" },
      { time: "8:30 PM", title: "Close" },
    ],
  },
  {
    slug: "scaling-design-systems",
    title: "Workshop: Scaling Design Systems",
    type: "Workshop",
    date: "2026-07-09",
    dateLabel: "Thu, Jul 9",
    time: "10:00 AM – 12:00 PM",
    location: "SoMa Collective",
    image: img("1517502884422-41eaead166d4", 1200, 700),
    excerpt:
      "A hands-on workshop on building and scaling design systems that teams actually use.",
    description:
      "A practical, hands-on session for designers and front-end engineers. We'll cover tokenisation, governance, contribution models and the tooling that keeps a design system healthy as your team grows from 5 to 50.",
    capacity: 30,
    spotsLeft: 6,
    speakers: [
      { name: "Aisha Khan", role: "Head of Design, Hustlegrove", avatar: avatar("1438761681033-6461ffad8d80") },
    ],
    schedule: [
      { time: "10:00 AM", title: "Foundations & tokens" },
      { time: "10:45 AM", title: "Governance & contribution" },
      { time: "11:30 AM", title: "Hands-on lab" },
    ],
  },
  {
    slug: "women-in-tech-meetup",
    title: "Women in Tech Meetup",
    type: "Meetup",
    date: "2026-07-15",
    dateLabel: "Wed, Jul 15",
    time: "5:30 – 7:30 PM",
    location: "Tribeca House",
    image: img("1521737604893-d14cc237f11d", 1200, 700),
    excerpt:
      "A welcoming meetup for women building in technology — lightning talks and community.",
    description:
      "Our community-led Women in Tech meetup returns with three lightning talks, a panel and plenty of time to connect. All experience levels welcome.",
    capacity: 60,
    spotsLeft: 20,
    speakers: [
      { name: "Priya Nair", role: "Head of People, Brightside", avatar: avatar("1494790108377-be9c29b29330") },
      { name: "Sofia Alvarez", role: "CEO, Hustlegrove", avatar: avatar("1544005313-94ddf0286df2") },
    ],
    schedule: [
      { time: "5:30 PM", title: "Welcome & refreshments" },
      { time: "6:00 PM", title: "Lightning talks" },
      { time: "6:45 PM", title: "Panel & Q&A" },
    ],
  },
  {
    slug: "future-of-work-panel",
    title: "Panel: The Future of Work",
    type: "Panel",
    date: "2026-07-22",
    dateLabel: "Wed, Jul 22",
    time: "12:00 – 1:30 PM",
    location: "South Lake Union",
    image: img("1531973576160-7125cd663d86", 1200, 700),
    excerpt:
      "Leaders discuss hybrid models, culture and the workplace of the next decade.",
    description:
      "A lunchtime panel with people leaders from fast-growing companies on what hybrid work really looks like in practice — and what the next decade holds for the workplace.",
    capacity: 70,
    spotsLeft: 0,
    speakers: [
      { name: "James Whitfield", role: "COO, Hustlegrove", avatar: avatar("1472099645785-5658abf4ff4e") },
      { name: "Daniel Cho", role: "MD, Meridian Partners", avatar: avatar("1507003211169-0a1dd7228f2d") },
    ],
    schedule: [
      { time: "12:00 PM", title: "Lunch served" },
      { time: "12:30 PM", title: "Panel discussion" },
      { time: "1:15 PM", title: "Audience Q&A" },
    ],
  },
  {
    slug: "startup-pitch-practice",
    title: "Startup Pitch Practice",
    type: "Workshop",
    date: "2026-07-28",
    dateLabel: "Tue, Jul 28",
    time: "4:00 – 6:00 PM",
    location: "Fulton Market",
    image: img("1542744173-8e7e53415bb0", 1200, 700),
    excerpt:
      "Sharpen your pitch with live feedback from investors and fellow founders.",
    description:
      "Bring your deck and your nerve. Five founders pitch live and get candid, constructive feedback from a panel of operators and angels. Spectators welcome too.",
    capacity: 40,
    spotsLeft: 9,
    speakers: [
      { name: "Marcus Reed", role: "Founder, Lattice & Co.", avatar: avatar("1500648767791-00dcc994a43e") },
    ],
    schedule: [
      { time: "4:00 PM", title: "Welcome" },
      { time: "4:15 PM", title: "Live pitches" },
      { time: "5:30 PM", title: "Feedback & mingling" },
    ],
  },
  {
    slug: "community-coffee-morning",
    title: "Community Coffee Morning",
    type: "Networking",
    date: "2026-08-04",
    dateLabel: "Tue, Aug 4",
    time: "8:30 – 10:00 AM",
    location: "Arts District",
    image: img("1497032628192-86f99bcd76bc", 1200, 700),
    excerpt:
      "Start the day with barista coffee and friendly introductions across the building.",
    description:
      "A relaxed, members-only coffee morning to kick off the week. No agenda — just great coffee, pastries and the chance to meet your neighbours.",
    capacity: 50,
    spotsLeft: 31,
    speakers: [],
    schedule: [
      { time: "8:30 AM", title: "Coffee & pastries" },
      { time: "9:00 AM", title: "Open networking" },
    ],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export const eventTypes: EventType[] = [
  "Networking",
  "Workshop",
  "Meetup",
  "Panel",
];

export interface FeedItem {
  kind: "Announcement" | "Member Spotlight" | "Workspace News";
  title: string;
  body: string;
  time: string;
  image?: string;
}

export const communityFeed: FeedItem[] = [
  {
    kind: "Announcement",
    title: "South Lake Union is now open",
    body: "Our newest location in Seattle is welcoming members — enjoy 20% off your first month.",
    time: "2 days ago",
    image: img("1600508774634-4e11d34730e2", 400, 300),
  },
  {
    kind: "Member Spotlight",
    title: "Northwind Labs scales to 30 people",
    body: "From 6 hot desks to a private floor in 18 months — congratulations to the Northwind team.",
    time: "4 days ago",
    image: avatar("1573496359142-b8d87734a5a2", 200),
  },
  {
    kind: "Workspace News",
    title: "New wellness studio at Market Street",
    body: "Members can now book yoga, meditation and HIIT classes on the 4th floor.",
    time: "1 week ago",
    image: img("1568992687947-868a62a9f521", 400, 300),
  },
  {
    kind: "Announcement",
    title: "Summer rooftop series returns",
    body: "Thursday evening socials are back across all flagship locations through August.",
    time: "1 week ago",
  },
];
