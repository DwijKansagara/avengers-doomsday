import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://doomsday.antideploy.com";
  return ["", "/privacy.html", "/terms.html", "/cookies.html", "/refunds.html"].map((path, index) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date("2026-10-08"),
    changeFrequency: index === 0 ? "monthly" as const : "yearly" as const,
    priority: index === 0 ? 1 : 0.3,
  }));
}
