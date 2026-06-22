import {
  DollarSign,
  PieChart,
  Users,
  Inbox,
} from "lucide-react";

import type { Kpi } from "@/components/charts/kpi-card";

export const adminKpis: Kpi[] = [
  { label: "Monthly revenue", value: "$486K", delta: "+12.4% MoM", trend: "up", icon: DollarSign },
  { label: "Occupancy", value: "87%", delta: "+3 pts", trend: "up", icon: PieChart },
  { label: "Active members", value: "6,418", delta: "+214 this month", trend: "up", icon: Users },
  { label: "Open inquiries", value: "38", delta: "9 new today", trend: "up", icon: Inbox },
];

export const occupancySegments = [
  { label: "Occupied", value: 72, color: "var(--primary)" },
  { label: "Reserved", value: 15, color: "var(--violet)" },
  { label: "Available", value: 13, color: "#d4d4d8" },
];

export const utilization = [
  { label: "Private Offices", value: 94 },
  { label: "Dedicated Desks", value: 88 },
  { label: "Hot Desks", value: 76 },
  { label: "Meeting Rooms", value: 68 },
];

export const bookingTrends = [
  { label: "Jan", value: 1240 },
  { label: "Feb", value: 1380 },
  { label: "Mar", value: 1320 },
  { label: "Apr", value: 1560 },
  { label: "May", value: 1720 },
  { label: "Jun", value: 1680 },
  { label: "Jul", value: 1910 },
  { label: "Aug", value: 2040 },
];

export const revenueByMonth = [
  { label: "Mar", value: 392 },
  { label: "Apr", value: 418 },
  { label: "May", value: 441 },
  { label: "Jun", value: 433 },
  { label: "Jul", value: 462 },
  { label: "Aug", value: 486 },
];

export const upcomingTours = [
  { name: "Olivia Bennett", company: "Vega Robotics", date: "Today", time: "2:00 PM", location: "Market Street Flagship" },
  { name: "Noah Williams", company: "Drift Studio", date: "Tomorrow", time: "10:30 AM", location: "SoMa Collective" },
  { name: "Mia Thompson", company: "Cobalt Health", date: "Jun 21", time: "1:00 PM", location: "Tribeca House" },
  { name: "Ethan Garcia", company: "Northstar AI", date: "Jun 22", time: "11:00 AM", location: "South Lake Union" },
];

export type InquiryStage = "New" | "Contacted" | "Tour booked" | "Proposal" | "Won";

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  interest: string;
  value: number;
  stage: InquiryStage;
  time: string;
}

export const inquiries: Inquiry[] = [
  { id: "Q-3021", name: "Olivia Bennett", company: "Vega Robotics", interest: "Private Office · 12 desks", value: 11400, stage: "New", time: "10m ago" },
  { id: "Q-3020", name: "Noah Williams", company: "Drift Studio", interest: "Dedicated Desks · 5", value: 2100, stage: "New", time: "1h ago" },
  { id: "Q-3018", name: "Mia Thompson", company: "Cobalt Health", interest: "Enterprise floor", value: 48000, stage: "Contacted", time: "3h ago" },
  { id: "Q-3015", name: "Ethan Garcia", company: "Northstar AI", interest: "Private Office · 20 desks", value: 19000, stage: "Tour booked", time: "Yesterday" },
  { id: "Q-3012", name: "Ava Martinez", company: "Loop Finance", interest: "Private Office · 8 desks", value: 7600, stage: "Proposal", time: "2 days ago" },
  { id: "Q-3009", name: "Liam Johnson", company: "Bright Labs", interest: "Hot Desks · 10", value: 2200, stage: "Won", time: "3 days ago" },
];

export const inquiryStages: InquiryStage[] = [
  "New",
  "Contacted",
  "Tour booked",
  "Proposal",
  "Won",
];

export interface AdminMember {
  name: string;
  email: string;
  company: string;
  plan: string;
  location: string;
  status: "Active" | "Trial" | "Past due";
  joined: string;
}

export const adminMembers: AdminMember[] = [
  { name: "Alex Carter", email: "alex@northwindlabs.com", company: "Northwind Labs", plan: "Dedicated Desk", location: "Market Street", status: "Active", joined: "Mar 2024" },
  { name: "Priya Nair", email: "priya@brightside.io", company: "Brightside", plan: "Private Office", location: "Tribeca House", status: "Active", joined: "Jan 2024" },
  { name: "Marcus Reed", email: "marcus@lattice.co", company: "Lattice & Co.", plan: "Private Office", location: "SoMa Collective", status: "Active", joined: "Nov 2023" },
  { name: "Sara Lopez", email: "sara@cobalt.health", company: "Cobalt Health", plan: "Enterprise", location: "Tribeca House", status: "Trial", joined: "Jun 2026" },
  { name: "Tom Becker", email: "tom@driftstudio.com", company: "Drift Studio", plan: "Hot Desk", location: "Fulton Market", status: "Past due", joined: "Feb 2025" },
  { name: "Hana Suzuki", email: "hana@loop.finance", company: "Loop Finance", plan: "Dedicated Desk", location: "South Lake Union", status: "Active", joined: "Apr 2025" },
];

export interface AdminWorkspace {
  name: string;
  location: string;
  type: string;
  capacity: number;
  occupied: number;
  status: "Live" | "Maintenance";
}

export const adminWorkspaces: AdminWorkspace[] = [
  { name: "Suite 4A", location: "Market Street", type: "Private Office", capacity: 12, occupied: 12, status: "Live" },
  { name: "Studio Floor 2", location: "SoMa Collective", type: "Dedicated Desks", capacity: 40, occupied: 35, status: "Live" },
  { name: "Open Floor 3", location: "Fulton Market", type: "Hot Desks", capacity: 60, occupied: 46, status: "Live" },
  { name: "Boardroom A", location: "Market Street", type: "Meeting Room", capacity: 14, occupied: 0, status: "Live" },
  { name: "Suite 7B", location: "Tribeca House", type: "Private Office", capacity: 20, occupied: 18, status: "Maintenance" },
];

export interface AdminLocation {
  name: string;
  city: string;
  members: number;
  occupancy: number;
  status: "Open" | "Opening soon";
}

export const adminLocations: AdminLocation[] = [
  { name: "Market Street Flagship", city: "San Francisco", members: 412, occupancy: 92, status: "Open" },
  { name: "SoMa Collective", city: "San Francisco", members: 248, occupancy: 86, status: "Open" },
  { name: "Tribeca House", city: "New York", members: 366, occupancy: 90, status: "Open" },
  { name: "Fulton Market", city: "Chicago", members: 284, occupancy: 78, status: "Open" },
  { name: "South Lake Union", city: "Seattle", members: 198, occupancy: 71, status: "Open" },
  { name: "Arts District", city: "Los Angeles", members: 176, occupancy: 68, status: "Opening soon" },
];
