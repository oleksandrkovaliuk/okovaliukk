import type { MetadataRoute } from "next";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL(process.env.NEXT_PUBLIC_SITE_URL || baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
