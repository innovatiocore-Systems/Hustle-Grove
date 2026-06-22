import type { LucideIcon } from "lucide-react";

export type SolutionSlug =
  | "private-offices"
  | "dedicated-desks"
  | "hot-desks"
  | "meeting-rooms";

export interface Solution {
  slug: SolutionSlug;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  startingPrice: number;
  priceUnit: string;
  features: string[];
  image: string;
}

export interface Amenity {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingPlan {
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  highlighted?: boolean;
  features: string[];
}

export interface Location {
  slug: string;
  name: string;
  city: string;
  region: string;
  address: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  rating: number;
  reviews: number;
  capacity: number;
  image: string;
  gallery: string[];
  amenities: string[];
  solutions: SolutionSlug[];
  pricing: PricingPlan[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
  description?: string;
}

export interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Faq {
  question: string;
  answer: string;
}

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Booking {
  id: string;
  workspace: string;
  location: string;
  type: string;
  date: string;
  time: string;
  status: BookingStatus;
}

export interface Visit {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
}

export type InvoiceStatus = "paid" | "due" | "overdue";

export interface Invoice {
  id: string;
  description: string;
  amount: number;
  issued: string;
  due: string;
  status: InvoiceStatus;
}

export interface DashboardStat {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}
