export type SpaceType =
  | "Private Office"
  | "Dedicated Desk"
  | "Hot Desk"
  | "Meeting Room"
  | "Event Space";

export type SpaceStatus = "Live" | "Maintenance" | "Draft";

export interface Space {
  id: string;
  name: string;
  type: SpaceType;
  capacity: number;
  status: SpaceStatus;
  featured: boolean;
}

export const spaceTypes: SpaceType[] = [
  "Private Office",
  "Dedicated Desk",
  "Hot Desk",
  "Meeting Room",
  "Event Space",
];

export const spaceStatuses: SpaceStatus[] = ["Live", "Maintenance", "Draft"];

/** Demo seed — the admin Space Management screen manages these in-memory. */
export const seedSpaces: Space[] = [
  { id: "sp-1", name: "Suite 4A", type: "Private Office", capacity: 12, status: "Live", featured: true },
  { id: "sp-2", name: "Studio Floor 2", type: "Dedicated Desk", capacity: 40, status: "Live", featured: false },
  { id: "sp-3", name: "Open Floor 3", type: "Hot Desk", capacity: 60, status: "Live", featured: true },
  { id: "sp-4", name: "Boardroom A", type: "Meeting Room", capacity: 14, status: "Live", featured: false },
  { id: "sp-5", name: "The Gallery", type: "Event Space", capacity: 120, status: "Live", featured: true },
  { id: "sp-6", name: "Suite 7B", type: "Private Office", capacity: 20, status: "Maintenance", featured: false },
];
