import type { Location } from "@/lib/types";
import { img } from "@/lib/images";

const baseAmenities = [
  "High-Speed Internet",
  "Meeting Rooms",
  "Coffee & Refreshments",
  "24/7 Access",
  "Reception Services",
  "Private Phone Booths",
];

export const locations: Location[] = [
  {
    slug: "market-street-sf",
    name: "Market Street Flagship",
    city: "San Francisco",
    region: "California",
    address: "548 Market Street, Suite 400, San Francisco, CA 94104",
    shortDescription:
      "Our flagship in the heart of the Financial District, with skyline views and a private rooftop terrace.",
    description:
      "Set across three light-filled floors of a landmark Market Street building, our flagship pairs heritage architecture with a thoughtfully modern fit-out. Floor-to-ceiling windows frame the city skyline, while a private rooftop terrace, two cafés and a wellness studio give members room to think, meet and recharge.",
    startingPrice: 290,
    rating: 4.9,
    reviews: 214,
    capacity: 420,
    image: img("1497366754035-f200968a6e72"),
    gallery: [
      img("1497366754035-f200968a6e72", 1400, 900),
      img("1604328698692-f76ea9498e76", 1400, 900),
      img("1497366811353-6870744d04b2", 1400, 900),
      img("1564069114553-7215e1ff1890", 1400, 900),
    ],
    amenities: [...baseAmenities, "Wellness & Gym", "Event Spaces", "Green Spaces"],
    solutions: ["private-offices", "dedicated-desks", "hot-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Hot Desk",
        description: "Flexible access to any open desk.",
        price: 290,
        priceUnit: "/ month",
        features: ["Any available desk", "All common areas", "Community events"],
      },
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 520,
        priceUnit: "/ month",
        highlighted: true,
        features: [
          "Reserved desk",
          "Personal storage",
          "Business address",
          "24/7 access",
        ],
      },
      {
        name: "Private Office",
        description: "A lockable suite for your team.",
        price: 950,
        priceUnit: "/ desk / mo",
        features: ["Furnished & lockable", "Branded space", "Priority booking"],
      },
    ],
    isPopular: true,
  },
  {
    slug: "soma-collective-sf",
    name: "SoMa Collective",
    city: "San Francisco",
    region: "California",
    address: "1100 Folsom Street, San Francisco, CA 94103",
    shortDescription:
      "A design-led studio in SoMa built for startups and creative teams.",
    description:
      "SoMa Collective is a warm, design-led studio carved from a converted warehouse. Exposed brick, timber floors and abundant greenery create a calm backdrop for ambitious teams, while a buzzing ground-floor café keeps the community connected.",
    startingPrice: 250,
    rating: 4.8,
    reviews: 168,
    capacity: 260,
    image: img("1524758631624-e2822e304c36"),
    gallery: [
      img("1524758631624-e2822e304c36", 1400, 900),
      img("1556761175-5973dc0f32e7", 1400, 900),
      img("1517502884422-41eaead166d4", 1400, 900),
      img("1497032628192-86f99bcd76bc", 1400, 900),
    ],
    amenities: [...baseAmenities, "Event Spaces", "Green Spaces"],
    solutions: ["dedicated-desks", "hot-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Hot Desk",
        description: "Flexible access to any open desk.",
        price: 250,
        priceUnit: "/ month",
        features: ["Any available desk", "All common areas", "Community events"],
      },
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 460,
        priceUnit: "/ month",
        highlighted: true,
        features: ["Reserved desk", "Personal storage", "Business address"],
      },
      {
        name: "Private Office",
        description: "A lockable suite for your team.",
        price: 820,
        priceUnit: "/ desk / mo",
        features: ["Furnished & lockable", "Branded space", "Priority booking"],
      },
    ],
  },
  {
    slug: "tribeca-house-ny",
    name: "Tribeca House",
    city: "New York",
    region: "New York",
    address: "60 Hudson Street, 12th Floor, New York, NY 10013",
    shortDescription:
      "A refined Tribeca address with private terraces and concierge service.",
    description:
      "Tribeca House occupies the upper floors of a celebrated cast-iron building, blending pre-war detail with a serene, gallery-like interior. Private terraces, a members' lounge and full concierge service make it a natural home for established teams who value discretion.",
    startingPrice: 340,
    rating: 4.9,
    reviews: 192,
    capacity: 380,
    image: img("1505373877841-8d25f7d46678"),
    gallery: [
      img("1505373877841-8d25f7d46678", 1400, 900),
      img("1600508774634-4e11d34730e2", 1400, 900),
      img("1568992687947-868a62a9f521", 1400, 900),
      img("1577412647305-991150c7d163", 1400, 900),
    ],
    amenities: [...baseAmenities, "Wellness & Gym", "Event Spaces"],
    solutions: ["private-offices", "dedicated-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 590,
        priceUnit: "/ month",
        features: ["Reserved desk", "Personal storage", "Business address"],
      },
      {
        name: "Private Office",
        description: "A lockable suite for your team.",
        price: 1080,
        priceUnit: "/ desk / mo",
        highlighted: true,
        features: ["Furnished & lockable", "Branded space", "Concierge service"],
      },
      {
        name: "Team Suite",
        description: "A floor of your own for larger teams.",
        price: 1450,
        priceUnit: "/ desk / mo",
        features: ["Private floor", "Dedicated meeting rooms", "Custom build-out"],
      },
    ],
    isPopular: true,
  },
  {
    slug: "fulton-market-chi",
    name: "Fulton Market",
    city: "Chicago",
    region: "Illinois",
    address: "311 N Sangamon Street, Chicago, IL 60607",
    shortDescription:
      "An industrial-chic space in Chicago's fastest-growing district.",
    description:
      "In the heart of Fulton Market, this loft-style space celebrates the district's industrial roots with soaring ceilings, steel detailing and a sun-drenched atrium. A ground-floor roastery and rotating art program give the space a distinctly local character.",
    startingPrice: 210,
    rating: 4.7,
    reviews: 131,
    capacity: 300,
    image: img("1497215728101-856f4ea42174"),
    gallery: [
      img("1497215728101-856f4ea42174", 1400, 900),
      img("1531973576160-7125cd663d86", 1400, 900),
      img("1521737604893-d14cc237f11d", 1400, 900),
      img("1564069114553-7215e1ff1890", 1400, 900),
    ],
    amenities: [...baseAmenities, "Event Spaces", "Print & Scan"],
    solutions: ["private-offices", "dedicated-desks", "hot-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Hot Desk",
        description: "Flexible access to any open desk.",
        price: 210,
        priceUnit: "/ month",
        features: ["Any available desk", "All common areas", "Community events"],
      },
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 390,
        priceUnit: "/ month",
        highlighted: true,
        features: ["Reserved desk", "Personal storage", "Business address"],
      },
      {
        name: "Private Office",
        description: "A lockable suite for your team.",
        price: 720,
        priceUnit: "/ desk / mo",
        features: ["Furnished & lockable", "Branded space", "Priority booking"],
      },
    ],
  },
  {
    slug: "south-lake-union-sea",
    name: "South Lake Union",
    city: "Seattle",
    region: "Washington",
    address: "400 Fairview Avenue N, Seattle, WA 98109",
    shortDescription:
      "A bright, lakeside workspace surrounded by Seattle's tech campus.",
    description:
      "Steps from the water in South Lake Union, this airy space is wrapped in glass to make the most of the Pacific Northwest light. Biophilic design, a rooftop garden and a quiet wellness floor make it a calm base amid the city's busiest tech corridor.",
    startingPrice: 240,
    rating: 4.8,
    reviews: 144,
    capacity: 320,
    image: img("1600508774634-4e11d34730e2"),
    gallery: [
      img("1600508774634-4e11d34730e2", 1400, 900),
      img("1497032628192-86f99bcd76bc", 1400, 900),
      img("1517502884422-41eaead166d4", 1400, 900),
      img("1556761175-5973dc0f32e7", 1400, 900),
    ],
    amenities: [...baseAmenities, "Wellness & Gym", "Green Spaces"],
    solutions: ["private-offices", "dedicated-desks", "hot-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Hot Desk",
        description: "Flexible access to any open desk.",
        price: 240,
        priceUnit: "/ month",
        features: ["Any available desk", "All common areas", "Community events"],
      },
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 430,
        priceUnit: "/ month",
        highlighted: true,
        features: ["Reserved desk", "Personal storage", "Business address"],
      },
      {
        name: "Private Office",
        description: "A lockable suite for your team.",
        price: 780,
        priceUnit: "/ desk / mo",
        features: ["Furnished & lockable", "Branded space", "Priority booking"],
      },
    ],
    isNew: true,
  },
  {
    slug: "arts-district-la",
    name: "Arts District",
    city: "Los Angeles",
    region: "California",
    address: "1330 Factory Place, Los Angeles, CA 90013",
    shortDescription:
      "A creative loft in DTLA's Arts District with a sun-soaked courtyard.",
    description:
      "Housed in a restored 1920s factory, our Arts District space is built for makers and creative studios. A planted courtyard, gallery walls and a screening room sit alongside flexible studios, all bathed in Southern California sun.",
    startingPrice: 230,
    rating: 4.7,
    reviews: 118,
    capacity: 280,
    image: img("1568992687947-868a62a9f521"),
    gallery: [
      img("1568992687947-868a62a9f521", 1400, 900),
      img("1577412647305-991150c7d163", 1400, 900),
      img("1531973576160-7125cd663d86", 1400, 900),
      img("1497366811353-6870744d04b2", 1400, 900),
    ],
    amenities: [...baseAmenities, "Event Spaces", "Green Spaces"],
    solutions: ["dedicated-desks", "hot-desks", "meeting-rooms"],
    pricing: [
      {
        name: "Hot Desk",
        description: "Flexible access to any open desk.",
        price: 230,
        priceUnit: "/ month",
        features: ["Any available desk", "All common areas", "Community events"],
      },
      {
        name: "Dedicated Desk",
        description: "A reserved desk that's always yours.",
        price: 410,
        priceUnit: "/ month",
        highlighted: true,
        features: ["Reserved desk", "Personal storage", "Business address"],
      },
      {
        name: "Studio",
        description: "A private studio for creative teams.",
        price: 760,
        priceUnit: "/ desk / mo",
        features: ["Private studio", "Gallery walls", "Screening room access"],
      },
    ],
    isNew: true,
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export const cities = Array.from(new Set(locations.map((l) => l.city)));
