import { CalendarCheck, Building2, MapPin, CreditCard } from "lucide-react";

import type {
  Booking,
  Visit,
  Invoice,
  DashboardStat,
} from "@/lib/types";

export const member = {
  name: "Alex Carter",
  email: "alex@northwindlabs.com",
  company: "Northwind Labs",
  plan: "Dedicated Desk",
  homeLocation: "Market Street Flagship",
  memberSince: "March 2024",
};

export const dashboardStats: DashboardStat[] = [
  {
    label: "Active Bookings",
    value: "3",
    delta: "+1 this week",
    trend: "up",
    icon: CalendarCheck,
  },
  {
    label: "Available Spaces",
    value: "18",
    delta: "Across 4 locations",
    icon: Building2,
  },
  {
    label: "Upcoming Visits",
    value: "5",
    delta: "Next: tomorrow",
    trend: "up",
    icon: MapPin,
  },
  {
    label: "Invoices Due",
    value: "$1,240",
    delta: "1 due in 6 days",
    trend: "down",
    icon: CreditCard,
  },
];

export const recentBookings: Booking[] = [
  {
    id: "BK-2041",
    workspace: "Boardroom A",
    location: "Market Street Flagship",
    type: "Meeting Room",
    date: "Jun 18, 2026",
    time: "10:00 – 11:30",
    status: "confirmed",
  },
  {
    id: "BK-2038",
    workspace: "Dedicated Desk 14",
    location: "Market Street Flagship",
    type: "Dedicated Desk",
    date: "Jun 17, 2026",
    time: "All day",
    status: "completed",
  },
  {
    id: "BK-2035",
    workspace: "Focus Booth 3",
    location: "SoMa Collective",
    type: "Phone Booth",
    date: "Jun 16, 2026",
    time: "14:00 – 15:00",
    status: "completed",
  },
  {
    id: "BK-2032",
    workspace: "Huddle Room 2",
    location: "Market Street Flagship",
    type: "Meeting Room",
    date: "Jun 20, 2026",
    time: "09:00 – 10:00",
    status: "pending",
  },
  {
    id: "BK-2028",
    workspace: "Event Space",
    location: "Tribeca House",
    type: "Event Space",
    date: "Jun 12, 2026",
    time: "17:00 – 20:00",
    status: "cancelled",
  },
];

export const upcomingVisits: Visit[] = [
  {
    id: "V-1",
    title: "Team standup + desk day",
    location: "Market Street Flagship",
    date: "Tomorrow",
    time: "9:00 AM",
  },
  {
    id: "V-2",
    title: "Client pitch — Boardroom A",
    location: "Market Street Flagship",
    date: "Jun 20",
    time: "10:00 AM",
  },
  {
    id: "V-3",
    title: "Design review",
    location: "SoMa Collective",
    date: "Jun 22",
    time: "2:00 PM",
  },
  {
    id: "V-4",
    title: "Quarterly offsite",
    location: "Tribeca House",
    date: "Jun 28",
    time: "All day",
  },
];

export function getBooking(id: string) {
  return recentBookings.find((b) => b.id === id);
}

export const upcomingBookings = recentBookings.filter(
  (b) => b.status === "confirmed" || b.status === "pending"
);

export const pastBookings = recentBookings.filter(
  (b) => b.status === "completed" || b.status === "cancelled"
);

export const invoices: Invoice[] = [
  {
    id: "INV-10428",
    description: "Dedicated Desk — June 2026",
    amount: 520,
    issued: "Jun 01, 2026",
    due: "Jun 25, 2026",
    status: "due",
  },
  {
    id: "INV-10395",
    description: "Meeting Room credits — May 2026",
    amount: 180,
    issued: "May 01, 2026",
    due: "May 25, 2026",
    status: "paid",
  },
  {
    id: "INV-10362",
    description: "Dedicated Desk — May 2026",
    amount: 520,
    issued: "May 01, 2026",
    due: "May 25, 2026",
    status: "paid",
  },
  {
    id: "INV-10330",
    description: "Event Space booking — April 2026",
    amount: 540,
    issued: "Apr 14, 2026",
    due: "Apr 28, 2026",
    status: "overdue",
  },
  {
    id: "INV-10318",
    description: "Dedicated Desk — April 2026",
    amount: 520,
    issued: "Apr 01, 2026",
    due: "Apr 25, 2026",
    status: "paid",
  },
];

export function getInvoice(id: string) {
  return invoices.find((i) => i.id === id);
}
