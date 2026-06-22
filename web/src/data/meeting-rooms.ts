import { img } from "@/lib/images";

export type RoomAvailability = "available" | "limited" | "booked";

export interface MeetingRoom {
  slug: string;
  name: string;
  location: string;
  city: string;
  capacity: number;
  hourlyRate: number;
  availability: RoomAvailability;
  equipment: string[];
  image: string;
  gallery: string[];
  description: string;
  facilities: string[];
}

export const meetingRooms: MeetingRoom[] = [
  {
    slug: "boardroom-a-market-street",
    name: "Boardroom A",
    location: "Market Street Flagship",
    city: "San Francisco",
    capacity: 14,
    hourlyRate: 90,
    availability: "available",
    equipment: ["98\" 4K display", "Video conferencing", "Whiteboard", "Conference phone"],
    image: img("1542744173-8e7e53415bb0", 1200, 800),
    gallery: [
      img("1542744173-8e7e53415bb0", 1400, 900),
      img("1556761175-5973dc0f32e7", 1400, 900),
      img("1497215728101-856f4ea42174", 1400, 900),
    ],
    description:
      "A statement boardroom with skyline views, premium AV and seating for fourteen. Ideal for client presentations, board meetings and offsites.",
    facilities: [
      "Floor-to-ceiling windows",
      "Catering on request",
      "Barista coffee service",
      "Adjustable lighting",
      "High-speed Wi-Fi",
    ],
  },
  {
    slug: "huddle-room-2-soma",
    name: "Huddle Room 2",
    location: "SoMa Collective",
    city: "San Francisco",
    capacity: 6,
    hourlyRate: 45,
    availability: "limited",
    equipment: ["55\" display", "Video conferencing", "Whiteboard"],
    image: img("1517502884422-41eaead166d4", 1200, 800),
    gallery: [
      img("1517502884422-41eaead166d4", 1400, 900),
      img("1524758631624-e2822e304c36", 1400, 900),
    ],
    description:
      "A cozy huddle space for quick syncs and small-team workshops, with a writable wall and easy screen sharing.",
    facilities: ["Writable wall", "Screen sharing", "Filtered water", "High-speed Wi-Fi"],
  },
  {
    slug: "the-studio-tribeca",
    name: "The Studio",
    location: "Tribeca House",
    city: "New York",
    capacity: 20,
    hourlyRate: 140,
    availability: "available",
    equipment: ["Dual 4K displays", "Pro video conferencing", "Sound system", "Stage lighting"],
    image: img("1505373877841-8d25f7d46678", 1200, 800),
    gallery: [
      img("1505373877841-8d25f7d46678", 1400, 900),
      img("1568992687947-868a62a9f521", 1400, 900),
      img("1577412647305-991150c7d163", 1400, 900),
    ],
    description:
      "A flexible event-grade studio for workshops, recordings and town halls, with broadcast-quality AV and reconfigurable seating.",
    facilities: [
      "Reconfigurable layout",
      "Broadcast AV",
      "Green room access",
      "Catering on request",
      "Dedicated host",
    ],
  },
  {
    slug: "focus-room-fulton",
    name: "Focus Room",
    location: "Fulton Market",
    city: "Chicago",
    capacity: 4,
    hourlyRate: 35,
    availability: "booked",
    equipment: ["43\" display", "Video conferencing"],
    image: img("1497032628192-86f99bcd76bc", 1200, 800),
    gallery: [
      img("1497032628192-86f99bcd76bc", 1400, 900),
      img("1531973576160-7125cd663d86", 1400, 900),
    ],
    description:
      "A quiet, sound-proofed room for interviews, focused calls and one-to-ones.",
    facilities: ["Sound-proofed", "Privacy glass", "High-speed Wi-Fi"],
  },
  {
    slug: "skyline-boardroom-slu",
    name: "Skyline Boardroom",
    location: "South Lake Union",
    city: "Seattle",
    capacity: 12,
    hourlyRate: 85,
    availability: "available",
    equipment: ["85\" display", "Video conferencing", "Whiteboard", "Conference phone"],
    image: img("1600508774634-4e11d34730e2", 1200, 800),
    gallery: [
      img("1600508774634-4e11d34730e2", 1400, 900),
      img("1564069114553-7215e1ff1890", 1400, 900),
    ],
    description:
      "A light-filled boardroom overlooking the lake, kitted out for hybrid meetings and leadership sessions.",
    facilities: ["Lake views", "Hybrid-ready AV", "Barista coffee", "Adjustable lighting"],
  },
  {
    slug: "creative-loft-arts-district",
    name: "Creative Loft",
    location: "Arts District",
    city: "Los Angeles",
    capacity: 10,
    hourlyRate: 70,
    availability: "limited",
    equipment: ["75\" display", "Video conferencing", "Moodboard walls"],
    image: img("1568992687947-868a62a9f521", 1200, 800),
    gallery: [
      img("1568992687947-868a62a9f521", 1400, 900),
      img("1497366811353-6870744d04b2", 1400, 900),
    ],
    description:
      "A sun-soaked loft for creative sessions and brand workshops, with pin-up walls and flexible furniture.",
    facilities: ["Pin-up walls", "Natural light", "Flexible furniture", "High-speed Wi-Fi"],
  },
];

export function getMeetingRoom(slug: string) {
  return meetingRooms.find((r) => r.slug === slug);
}
