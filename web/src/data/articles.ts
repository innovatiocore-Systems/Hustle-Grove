import { img, avatar } from "@/lib/images";

export type ArticleCategory =
  | "Productivity"
  | "Workplace"
  | "Startups"
  | "Remote Work";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  content: string[];
  author: { name: string; role: string; avatar: string };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const sofia = {
  name: "Sofia Alvarez",
  role: "CEO, Hustle Grove",
  avatar: avatar("1544005313-94ddf0286df2"),
};
const aisha = {
  name: "Aisha Khan",
  role: "Head of Design",
  avatar: avatar("1438761681033-6461ffad8d80"),
};
const james = {
  name: "James Whitfield",
  role: "COO",
  avatar: avatar("1472099645785-5658abf4ff4e"),
};

const body = [
  "The way we work has changed more in the last five years than in the previous fifty. Teams are more distributed, expectations are higher, and the line between focus and collaboration has never been more important to get right.",
  "Great workspaces don't happen by accident. They're the result of deliberate choices about light, acoustics, flow and flexibility — choices that compound into how people feel when they walk through the door each morning.",
  "In this piece we share what we've learned designing spaces for thousands of members, and the small, repeatable habits that help teams do their best work wherever they are.",
  "The takeaway is simple: invest in the environment, and the environment invests back in your team. Start small, measure how people respond, and iterate from there.",
];

export const articles: Article[] = [
  {
    slug: "design-your-week-for-deep-work",
    title: "How to design your week for deep work",
    category: "Productivity",
    excerpt:
      "Practical ways to protect focus time and still stay collaborative in a hybrid world.",
    content: body,
    author: sofia,
    date: "Jun 12, 2026",
    readTime: "6 min read",
    image: img("1497215728101-856f4ea42174", 1200, 700),
    featured: true,
  },
  {
    slug: "anatomy-of-a-great-office",
    title: "The anatomy of a great office",
    category: "Workplace",
    excerpt:
      "Light, acoustics, materials and flow — the four ingredients behind spaces people love.",
    content: body,
    author: aisha,
    date: "Jun 5, 2026",
    readTime: "8 min read",
    image: img("1604328698692-f76ea9498e76", 1200, 700),
    featured: true,
  },
  {
    slug: "first-office-for-your-startup",
    title: "When should your startup get its first office?",
    category: "Startups",
    excerpt:
      "Signals that it's time to move off the kitchen table — and how to choose flexibly.",
    content: body,
    author: james,
    date: "May 28, 2026",
    readTime: "5 min read",
    image: img("1524758631624-e2822e304c36", 1200, 700),
  },
  {
    slug: "running-effective-hybrid-meetings",
    title: "Running effective hybrid meetings",
    category: "Remote Work",
    excerpt:
      "Simple rituals that make remote and in-person attendees feel equally heard.",
    content: body,
    author: james,
    date: "May 20, 2026",
    readTime: "7 min read",
    image: img("1542744173-8e7e53415bb0", 1200, 700),
  },
  {
    slug: "build-a-culture-people-commute-for",
    title: "Build a culture people will commute for",
    category: "Workplace",
    excerpt:
      "If you want people in the office, make it worth the trip. Here's how the best teams do it.",
    content: body,
    author: sofia,
    date: "May 14, 2026",
    readTime: "6 min read",
    image: img("1564069114553-7215e1ff1890", 1200, 700),
  },
  {
    slug: "focus-rituals-of-high-performers",
    title: "The focus rituals of high performers",
    category: "Productivity",
    excerpt:
      "Small, repeatable habits that protect attention in a world full of pings.",
    content: body,
    author: aisha,
    date: "May 6, 2026",
    readTime: "4 min read",
    image: img("1517502884422-41eaead166d4", 1200, 700),
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const articleCategories: ArticleCategory[] = [
  "Productivity",
  "Workplace",
  "Startups",
  "Remote Work",
];
