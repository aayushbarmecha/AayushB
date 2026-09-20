import { unstable_cache as cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import BlogPost, { type IBlogPost } from "@/models/BlogPost";
import Project, { type IProject } from "@/models/Project";
import Experience, { type IExperience } from "@/models/Experience";

// Public-facing reads are cached and tagged so admin mutations can invalidate
// them with revalidateTag instead of the site hitting Mongo on every request.

export const getPublishedPosts = cache(
  async (): Promise<IBlogPost[]> => {
    await connectToDatabase();
    const posts = await BlogPost.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(posts));
  },
  ["published-posts"],
  { tags: ["posts"] }
);

export const getPostBySlug = cache(
  async (slug: string): Promise<IBlogPost | null> => {
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    return post ? JSON.parse(JSON.stringify(post)) : null;
  },
  ["post-by-slug"],
  { tags: ["posts"] }
);

export const getAllProjects = cache(
  async (): Promise<IProject[]> => {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  },
  ["all-projects"],
  { tags: ["projects"] }
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<IProject | null> => {
    await connectToDatabase();
    const project = await Project.findOne({ slug }).lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  },
  ["project-by-slug"],
  { tags: ["projects"] }
);

export const getAllExperience = cache(
  async (): Promise<IExperience[]> => {
    await connectToDatabase();
    const experience = await Experience.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(experience));
  },
  ["all-experience"],
  { tags: ["experience"] }
);
