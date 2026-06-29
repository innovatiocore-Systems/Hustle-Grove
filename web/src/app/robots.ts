import type { MetadataRoute } from "next";

import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private/app surfaces — keep out of the index.
      disallow: ["/admin", "/admin-login", "/dashboard", "/login", "/register"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
