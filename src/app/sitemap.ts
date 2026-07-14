import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const pages = ["", "projects", "services", "blogs"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.flatMap((page) => {
    const suffix = page ? `${page}/` : "";
    const es = `${siteConfig.url}/es/${suffix}`;
    const en = `${siteConfig.url}/en/${suffix}`;
    const priority = page === "" ? 1 : page === "blogs" ? 0.7 : 0.9;

    return [
      {
        url: es,
        lastModified,
        changeFrequency: "weekly" as const,
        priority,
        alternates: { languages: { es, en } },
      },
      {
        url: en,
        lastModified,
        changeFrequency: "weekly" as const,
        priority,
        alternates: { languages: { es, en } },
      },
    ];
  });
}
