import type { MetadataRoute } from "next";
import { getAllProjects, getPublishedPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getAllProjects(), getPublishedPosts()]);

  const staticRoutes = ["", "/about", "/experience", "/projects", "/blog", "/contact"].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.siteUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${siteConfig.siteUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
