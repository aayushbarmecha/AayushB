"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import ContactMessage from "@/models/ContactMessage";
import AdminUser from "@/models/AdminUser";
import { slugify } from "@/lib/slug";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}

function listFromField(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

// --- Auth ---

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password." };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

// --- Blog posts ---

export async function savePost(id: string | null, formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const title = String(formData.get("title") ?? "");
  const status = formData.get("status") === "published" ? "published" : "draft";
  const slugInput = String(formData.get("slug") ?? "");
  const requestedPublishedAt = String(formData.get("publishedAt") ?? "");
  const existingPost = id ? await BlogPost.findById(id).lean() : null;
  const publishedAt =
    status === "published"
      ? requestedPublishedAt
        ? new Date(`${requestedPublishedAt}T00:00:00.000Z`)
        : existingPost?.publishedAt ?? new Date()
      : existingPost?.publishedAt;

  const data = {
    title,
    slug: slugify(slugInput || title),
    description: String(formData.get("description") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    tags: listFromField(formData.get("tags")),
    content: String(formData.get("content") ?? ""),
    status,
    pinned: formData.get("pinned") === "on",
    publishedAt,
  };

  if (id) {
    await BlogPost.findByIdAndUpdate(id, data);
  } else {
    await BlogPost.create(data);
  }

  revalidateTag("posts", { expire: 0 });
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await BlogPost.findByIdAndDelete(id);
  revalidateTag("posts", { expire: 0 });
  redirect("/admin/posts");
}

export async function movePost(id: string, direction: "up" | "down") {
  await requireAdmin();
  await connectToDatabase();

  const post = await BlogPost.findById(id).lean();
  if (!post) return;
  const isPinned = post.pinned === true;
  const posts = await BlogPost.find(
    isPinned ? { pinned: true } : { $or: [{ pinned: false }, { pinned: { $exists: false } }] }
  )
    .sort({ order: 1, createdAt: -1 })
    .lean();
  const index = posts.findIndex((item) => item._id.toString() === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || targetIndex < 0 || targetIndex >= posts.length) return;

  [posts[index], posts[targetIndex]] = [posts[targetIndex], posts[index]];
  await BlogPost.bulkWrite(
    posts.map((item, order) => ({ updateOne: { filter: { _id: item._id }, update: { order, pinned: isPinned } } }))
  );
  revalidateTag("posts", { expire: 0 });
  redirect("/admin/posts");
}

// --- Projects ---

export async function saveProject(id: string | null, formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const title = String(formData.get("title") ?? "");
  const slugInput = String(formData.get("slug") ?? "");

  const data = {
    title,
    slug: slugify(slugInput || title),
    summary: String(formData.get("summary") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    images: listFromField(formData.get("images")),
    tags: listFromField(formData.get("tags")),
    problem: String(formData.get("problem") ?? ""),
    approach: String(formData.get("approach") ?? ""),
    architecture: String(formData.get("architecture") ?? ""),
    technologies: listFromField(formData.get("technologies")),
    challenges: String(formData.get("challenges") ?? ""),
    impact: String(formData.get("impact") ?? ""),
    featured: formData.get("featured") === "on",
    pinned: formData.get("pinned") === "on",
    order: Number(formData.get("order") ?? 0),
  };

  if (id) {
    await Project.findByIdAndUpdate(id, data);
  } else {
    await Project.create(data);
  }

  revalidateTag("projects", { expire: 0 });
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Project.findByIdAndDelete(id);
  revalidateTag("projects", { expire: 0 });
  redirect("/admin/projects");
}

export async function moveProject(id: string, direction: "up" | "down") {
  await requireAdmin();
  await connectToDatabase();

  const project = await Project.findById(id).lean();
  if (!project) return;
  const isPinned = project.pinned === true;
  const projects = await Project.find(
    isPinned ? { pinned: true } : { $or: [{ pinned: false }, { pinned: { $exists: false } }] }
  )
    .sort({ order: 1, createdAt: -1 })
    .lean();
  const index = projects.findIndex((item) => item._id.toString() === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || targetIndex < 0 || targetIndex >= projects.length) return;

  [projects[index], projects[targetIndex]] = [projects[targetIndex], projects[index]];
  await Project.bulkWrite(
    projects.map((item, order) => ({ updateOne: { filter: { _id: item._id }, update: { order, pinned: isPinned } } }))
  );
  revalidateTag("projects", { expire: 0 });
  redirect("/admin/projects");
}

// --- Experience ---

export async function saveExperience(id: string | null, formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const data = {
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    location: String(formData.get("location") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    bullets: String(formData.get("bullets") ?? "")
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean),
    techStack: listFromField(formData.get("techStack")),
    order: Number(formData.get("order") ?? 0),
  };

  if (id) {
    await Experience.findByIdAndUpdate(id, data);
  } else {
    await Experience.create(data);
  }

  revalidateTag("experience", { expire: 0 });
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Experience.findByIdAndDelete(id);
  revalidateTag("experience", { expire: 0 });
  redirect("/admin/experience");
}

// --- Contact messages ---

export async function submitContactMessage(formData: FormData) {
  await connectToDatabase();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in every field." };
  }

  await ContactMessage.create({ name, email, message });
  return { ok: true };
}

export async function markMessageRead(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await ContactMessage.findByIdAndUpdate(id, { read: true });
  redirect("/admin");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await ContactMessage.findByIdAndDelete(id);
  redirect("/admin");
}

// --- Account settings ---

type ChangePasswordState = { ok: boolean; error?: string } | null;

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await requireAdmin();
  await connectToDatabase();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 4) {
    return { ok: false, error: "New password must be at least 4 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "New password and confirmation don't match." };
  }

  const username = session.user?.name;
  const user = await AdminUser.findOne({ username });
  if (!user) return { ok: false, error: "Admin user not found." };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return { ok: false, error: "Current password is incorrect." };

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { ok: true };
}
