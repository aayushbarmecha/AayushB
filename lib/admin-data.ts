import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import ContactMessage from "@/models/ContactMessage";

// Admin reads always hit Mongo directly (no cache) so the dashboard is never stale.

export async function getAllPostsAdmin() {
  await connectToDatabase();
  const posts = await BlogPost.find({}).sort({ pinned: -1, order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function getPostByIdAdmin(id: string) {
  await connectToDatabase();
  const post = await BlogPost.findById(id).lean();
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function getAllProjectsAdmin() {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ pinned: -1, order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getProjectByIdAdmin(id: string) {
  await connectToDatabase();
  const project = await Project.findById(id).lean();
  return project ? JSON.parse(JSON.stringify(project)) : null;
}

export async function getAllExperienceAdmin() {
  await connectToDatabase();
  const experience = await Experience.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(experience));
}

export async function getExperienceByIdAdmin(id: string) {
  await connectToDatabase();
  const experience = await Experience.findById(id).lean();
  return experience ? JSON.parse(JSON.stringify(experience)) : null;
}

export async function getContactMessagesAdmin() {
  await connectToDatabase();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export async function getDashboardCounts() {
  await connectToDatabase();
  const [posts, projects, experience, messages, unreadMessages] = await Promise.all([
    BlogPost.countDocuments(),
    Project.countDocuments(),
    Experience.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
  ]);
  return { posts, projects, experience, messages, unreadMessages };
}
