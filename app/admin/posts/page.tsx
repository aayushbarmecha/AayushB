import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { getAllPostsAdmin } from "@/lib/admin-data";
import { movePost } from "@/app/admin/actions";

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blog Posts</h1>
        <Link href="/admin/posts/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
          New post
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {posts.length === 0 && <p className="text-sm text-muted">No posts yet.</p>}
        {posts.map((post: { _id: string; title: string; status: string; slug: string; pinned: boolean }) => (
          <div key={post._id} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 hover:bg-surface-muted">
            <Link href={`/admin/posts/${post._id}/edit`} className="min-w-0 flex-1 text-sm font-medium">
              {post.title}
            </Link>
            {post.pinned && <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">Pinned</span>}
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${post.status === "published" ? "bg-accent-2/15 text-accent-2" : "bg-surface-muted text-muted"}`}>
              {post.status}
            </span>
            <div className="flex gap-1">
              <form action={movePost.bind(null, post._id, "up")}><button aria-label={`Move ${post.title} up`} className="rounded p-1 text-muted hover:bg-surface-muted hover:text-foreground">↑</button></form>
              <form action={movePost.bind(null, post._id, "down")}><button aria-label={`Move ${post.title} down`} className="rounded p-1 text-muted hover:bg-surface-muted hover:text-foreground">↓</button></form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
