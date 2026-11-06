import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return [
    { url: base, priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
