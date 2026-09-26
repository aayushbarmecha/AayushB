"use client";

import { savePost, deletePost } from "@/app/admin/actions";
import type { IBlogPost } from "@/models/BlogPost";

export default function PostForm({ post }: { post?: IBlogPost }) {
  const action = savePost.bind(null, post?._id ?? null);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Title</label>
        <input
          name="title"
          defaultValue={post?.title}
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Slug (leave blank to auto-generate)</label>
        <input
          name="slug"
          defaultValue={post?.slug}
          placeholder="my-post-title"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={post?.description}
          rows={2}
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Cover image path</label>
          <input
            name="coverImage"
            defaultValue={post?.coverImage}
            placeholder="/projects/example.png"
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tags (comma separated)</label>
          <input
            name="tags"
            defaultValue={post?.tags?.join(", ")}
            placeholder="Go, ANTLR, VS Code"
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Content (Markdown/MDX)</label>
        <textarea
          name="content"
          defaultValue={post?.content}
          rows={18}
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs outline-none ring-accent/30 focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Status</label>
        <select
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="pinned" defaultChecked={post?.pinned} className="h-4 w-4" />
        Pin this post to the top
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
          {post ? "Save changes" : "Create post"}
        </button>
        {post && (
          <button
            type="submit"
            formAction={deletePost.bind(null, post._id)}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
