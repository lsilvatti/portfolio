import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leonardo.silvatti.com.br";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/connect", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/resume", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${siteUrl}/en${route.path}`,
            "pt-BR": `${siteUrl}/br${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
